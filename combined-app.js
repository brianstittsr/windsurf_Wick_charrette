// Combined architecture for Charette System (demo version)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client/build')));

// In-memory data storage
let charettes = {};
let messages = {};
let reports = {};

// Load demo data if available
try {
  const demoData = require('./demo-loader.js');
  if (demoData) {
    console.log('Demo data loaded successfully');
    charettes = { [demoData.charette.id]: demoData.charette };
    messages = demoData.messages;
    reports = { [demoData.charette.id]: demoData.report };
  }
} catch (error) {
  console.log('No demo data found - starting with empty database');
}

// Default phases for new charettes
const PHASES = [
  { id: 'introduction', name: 'Introduction', description: 'Welcome and overview' },
  { id: 'data_collection', name: 'Data Collection', description: 'Gather initial information' },
  { id: 'analysis', name: 'Analysis', description: 'Explore constraints and assumptions' },
  { id: 'ideation', name: 'Ideation', description: 'Generate ideas' },
  { id: 'synthesis', name: 'Synthesis', description: 'Combine findings' },
  { id: 'reporting', name: 'Reporting', description: 'Generate final report' }
];

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join charette room
  socket.on('join-charette', (charetteId) => {
    socket.join(charetteId);
    console.log(`User ${socket.id} joined charette ${charetteId}`);
  });

  // Handle chat messages
  socket.on('chat-message', (data) => {
    const { charetteId, message, userName, role, roomId } = data;
    const messageId = uuidv4();
    const timestamp = new Date().toISOString();

    const messageData = {
      id: messageId,
      text: message,
      userName,
      role: role || 'participant',
      roomId: roomId || 'main',
      timestamp,
      type: 'chat'
    };

    if (!messages[charetteId]) {
      messages[charetteId] = {};
    }
    if (!messages[charetteId][roomId || 'main']) {
      messages[charetteId][roomId || 'main'] = [];
    }
    messages[charetteId][roomId || 'main'].push(messageData);

    // Emit to all users in the specific room
    if (roomId && roomId !== 'main') {
      socket.to(`${charetteId}-${roomId}`).emit('chat-message', messageData);
    } else {
      io.to(charetteId).emit('chat-message', messageData);
    }
  });

  // Handle phase progression
  socket.on('next-phase', (charetteId) => {
    if (charettes[charetteId]) {
      charettes[charetteId].currentPhase++;
      io.to(charetteId).emit('phase-changed', charettes[charetteId].currentPhase);
    }
  });

  // Breakout room management
  socket.on('join-breakout-room', (data) => {
    const { charetteId, roomId, userName } = data;
    socket.join(`${charetteId}-${roomId}`);
    
    // Update room participants
    const charette = charettes[charetteId];
    if (charette) {
      const room = charette.breakoutRooms.find(r => r.id === roomId);
      if (room && !room.participants.includes(userName)) {
        room.participants.push(userName);
        io.to(charetteId).emit('room-updated', room);
      }
    }
  });

  socket.on('leave-breakout-room', (data) => {
    const { charetteId, roomId, userName } = data;
    socket.leave(`${charetteId}-${roomId}`);
    
    // Update room participants
    const charette = charettes[charetteId];
    if (charette) {
      const room = charette.breakoutRooms.find(r => r.id === roomId);
      if (room) {
        room.participants = room.participants.filter(p => p !== userName);
        io.to(charetteId).emit('room-updated', room);
      }
    }
  });

  socket.on('create-breakout-rooms', (data) => {
    const { charetteId, roomCount, questions } = data;
    const charette = charettes[charetteId];
    if (!charette) return;

    // Clear existing rooms
    charette.breakoutRooms = [];

    // Create new rooms
    for (let i = 1; i <= roomCount; i++) {
      const room = {
        id: `room-${i}`,
        name: `Breakout Room ${i}`,
        questions: questions || ['Discuss the topic'],
        participants: [],
        createdAt: new Date().toISOString()
      };
      charette.breakoutRooms.push(room);
    }

    io.to(charetteId).emit('breakout-rooms-created', charette.breakoutRooms);
  });
});

// API routes
app.get('/api/charettes', (req, res) => {
  res.json(Object.values(charettes));
});

app.post('/api/charettes', (req, res) => {
  const { title, description } = req.body;
  const charetteId = uuidv4();
  charettes[charetteId] = {
    id: charetteId,
    title,
    description,
    currentPhase: 0,
    createdAt: new Date().toISOString(),
    phases: PHASES,
    analysis: [],
    participants: [],
    breakoutRooms: []
  };
  res.json(charettes[charetteId]);
});

app.post('/api/charettes/:id/participants', (req, res) => {
  const { userName, role } = req.body;
  const charette = charettes[req.params.id];
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  const participant = {
    userName,
    role: role || 'participant',
    joinedAt: new Date().toISOString()
  };

  // Check if participant already exists
  const existingIndex = charette.participants.findIndex(p => p.userName === userName);
  if (existingIndex === -1) {
    charette.participants.push(participant);
  } else {
    charette.participants[existingIndex] = participant;
  }

  res.json(participant);
});

app.get('/api/charettes/:id', (req, res) => {
  const charette = charettes[req.params.id];
  if (charette) {
    res.json(charette);
  } else {
    res.status(404).json({ error: 'Charette not found' });
  }
});

app.get('/api/charettes/:id/messages', (req, res) => {
  const charetteMessages = messages[req.params.id] || {};
  const roomId = req.query.roomId;

  if (roomId) {
    res.json(charetteMessages[roomId] || []);
  } else {
    // Return all messages from all rooms
    const allMessages = Object.values(charetteMessages).flat();
    res.json(allMessages);
  }
});

app.get('/api/charettes/:id/report', (req, res) => {
  const charette = charettes[req.params.id];
  if (!charette) {
    return res.status(404).json({ error: 'Charette not found' });
  }

  const charetteMessages = messages[req.params.id] || {};
  const allMessages = Object.values(charetteMessages).flat();

  const report = {
    charetteId: charette.id,
    title: charette.title,
    generatedAt: new Date().toISOString(),
    phases: charette.phases,
    finalPhase: charette.currentPhase,
    summary: {
      totalMessages: allMessages.length,
      totalParticipants: [...new Set(allMessages.map(m => m.userName))].length,
      totalBreakoutRooms: charette.breakoutRooms.length,
      analysisResults: charette.analysis || [],
      reasoningResults: charette.reasoningResults || []
    },
    breakoutRooms: charette.breakoutRooms,
    keyFindings: generateKeyFindings(charette, allMessages),
    recommendations: generateRecommendations(charette),
    nextSteps: [
      'Review and validate findings',
      'Develop implementation plan',
      'Assign responsibilities',
      'Schedule follow-up sessions'
    ]
  };

  res.json(report);
});

// Helper functions for report generation
function generateKeyFindings(charette, messages) {
  const findings = [];
  
  // Analyze patterns in messages
  const messageTexts = messages.map(m => m.text.toLowerCase());
  const themes = identifyThemes(messageTexts);

  if (themes.length > 0) {
    findings.push({
      category: 'Emerging Themes',
      items: themes,
      impact: 'Medium'
    });
  }

  return findings;
}

function generateRecommendations(charette) {
  const recommendations = [];

  if (charette.currentPhase >= 2) {
    recommendations.push({
      priority: 'High',
      action: 'Address identified constraints',
      rationale: 'Constraints analysis revealed critical blockers'
    });
  }

  if (charette.currentPhase >= 3) {
    recommendations.push({
      priority: 'High',
      action: 'Implement top-ranked solutions',
      rationale: 'Ideation phase generated actionable solutions'
    });
  }

  return recommendations;
}

function identifyThemes(messageTexts) {
  const themes = [];
  const commonWords = ['project', 'team', 'time', 'resources', 'process', 'system'];

  commonWords.forEach(word => {
    const count = messageTexts.filter(text => text.includes(word)).length;
    if (count > messageTexts.length * 0.1) { // If word appears in >10% of messages
      themes.push(`${word} (${count} mentions)`);
    }
  });

  return themes;
}

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Combined Charette System running on port ${PORT}`);
});
