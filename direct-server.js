// Direct server for Vercel deployment
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Check if we're in production (Vercel)
const isProduction = process.env.NODE_ENV === 'production';

// In-memory data storage
let charettes = {};
let messages = {};
let reports = {};

// Try to load demo data
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

// Default phases
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
});

// API routes
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

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

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve a simple HTML page for the root path
app.get('/', (req, res) => {
  try {
    // Try to serve the direct-index.html file
    const htmlPath = path.join(__dirname, 'public', 'direct-index.html');
    if (fs.existsSync(htmlPath)) {
      res.sendFile(htmlPath);
    } else {
      // Fallback to inline HTML
      const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Charette System</title>
        <style>
          body {
            font-family: sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
          h1 { color: #1976d2; }
          .container {
            border: 1px solid #ddd;
            padding: 20px;
            margin-top: 20px;
            border-radius: 8px;
          }
        </style>
      </head>
      <body>
        <h1>Charette System</h1>
        <div class="container">
          <h2>Welcome!</h2>
          <p>Server is running successfully.</p>
        </div>
      </body>
      </html>
      `;
      res.send(html);
    }
  } catch (error) {
    console.error('Error serving index page:', error);
    res.send('<h1>Charette System</h1><p>Server is running</p>');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
