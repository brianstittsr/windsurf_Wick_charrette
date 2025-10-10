#!/usr/bin/env node

/**
 * Mock Charette Demo Creator
 * Creates a demonstration charette based on "Best of Enemies"
 * This simulates the historic 1971 Durham school desegregation summit
 */

const fs = require('fs');
const path = require('path');

// Mock data for "Best of Enemies" demonstration charette
const mockCharetteData = {
  title: "1971 Durham School Desegregation Summit",
  description: "Historic community dialogue between civil rights activist Ann Atwater and KKK leader C.P. Ellis, co-chaired by Howard Fuller. This landmark summit addressed the desegregation of Durham schools during the racially charged summer of 1971.",
  createdAt: "1971-07-15T09:00:00.000Z",
  currentPhase: 5, // Completed all phases
  phases: [
    { name: 'Introduction', description: 'Welcome and overview' },
    { name: 'Data Collection', description: 'Gather initial information' },
    { name: 'Analysis', description: 'Explore constraints and assumptions' },
    { name: 'Ideation', description: 'Generate creative solutions' },
    { name: 'Synthesis', description: 'Combine findings and develop recommendations' },
    { name: 'Reporting', description: 'Generate final report' }
  ],
  isActive: false, // Historical event - completed
  participants: [
    {
      userId: "ann-atwater",
      userName: "Ann Atwater",
      role: "participant",
      joinedAt: "1971-07-15T09:00:00.000Z"
    },
    {
      userId: "cp-ellis",
      userName: "C.P. Ellis",
      role: "participant",
      joinedAt: "1971-07-15T09:00:00.000Z"
    },
    {
      userId: "howard-fuller",
      userName: "Howard Fuller",
      role: "analyst",
      joinedAt: "1971-07-15T09:00:00.000Z"
    },
    {
      userId: "community-member-1",
      userName: "Sarah Johnson",
      role: "participant",
      joinedAt: "1971-07-15T10:30:00.000Z"
    },
    {
      userId: "community-member-2",
      userName: "Robert Williams",
      role: "participant",
      joinedAt: "1971-07-15T10:45:00.000Z"
    }
  ],
  breakoutRooms: [
    {
      name: "Parent Concerns Room",
      questions: [
        "What are your main concerns about school desegregation?",
        "How will this affect your children's education?",
        "What support do parents need during this transition?"
      ],
      participants: ["ann-atwater", "community-member-1"],
      createdAt: "1971-07-15T11:00:00.000Z"
    },
    {
      name: "Community Impact Room",
      questions: [
        "How will desegregation change our neighborhoods?",
        "What economic impacts should we consider?",
        "How can we maintain community cohesion?"
      ],
      participants: ["cp-ellis", "community-member-2"],
      createdAt: "1971-07-15T11:00:00.000Z"
    },
    {
      name: "Implementation Planning Room",
      questions: [
        "What timeline works for implementation?",
        "What resources are needed for success?",
        "How do we measure progress and success?"
      ],
      participants: ["howard-fuller"],
      createdAt: "1971-07-15T11:00:00.000Z"
    }
  ],
  analysis: [
    {
      type: "constraint",
      content: "Limited funding for school transportation and resources",
      keywords: ["funding", "transportation", "resources"],
      confidence: 0.85,
      createdAt: "1971-07-15T14:30:00.000Z"
    },
    {
      type: "assumption",
      content: "All community members want immediate full integration",
      keywords: ["integration", "immediate", "community"],
      confidence: 0.72,
      createdAt: "1971-07-15T15:00:00.000Z"
    },
    {
      type: "opportunity",
      content: "Cross-cultural dialogue can build understanding",
      keywords: ["dialogue", "understanding", "cultural"],
      confidence: 0.91,
      createdAt: "1971-07-15T16:00:00.000Z"
    }
  ]
};

const mockMessages = [
  {
    roomId: "main",
    text: "Welcome everyone to this historic community summit. I'm Howard Fuller, and I'll be facilitating today's discussion.",
    userName: "Howard Fuller",
    userId: "howard-fuller",
    role: "analyst",
    timestamp: "1971-07-15T09:00:00.000Z"
  },
  {
    roomId: "main",
    text: "I want to thank Ann Atwater and C.P. Ellis for agreeing to co-chair this summit. This represents a significant step forward for our community.",
    userName: "Howard Fuller",
    userId: "howard-fuller",
    role: "analyst",
    timestamp: "1971-07-15T09:05:00.000Z"
  },
  {
    roomId: "main",
    text: "This desegregation issue has divided our community for too long. We need to find a way forward that works for everyone.",
    userName: "Ann Atwater",
    userId: "ann-atwater",
    role: "participant",
    timestamp: "1971-07-15T09:15:00.000Z"
  },
  {
    roomId: "main",
    text: "I may not agree with everything that's being proposed, but I'm here to listen and find solutions that protect our children's future.",
    userName: "C.P. Ellis",
    userId: "cp-ellis",
    role: "participant",
    timestamp: "1971-07-15T09:20:00.000Z"
  },
  {
    roomId: "room-1",
    text: "As a parent, I'm worried about my child's safety on long bus rides to schools outside our neighborhood.",
    userName: "Sarah Johnson",
    userId: "community-member-1",
    role: "participant",
    timestamp: "1971-07-15T11:30:00.000Z"
  },
  {
    roomId: "room-1",
    text: "Transportation safety is a valid concern. We need to ensure all children feel secure regardless of where they attend school.",
    userName: "Ann Atwater",
    userId: "ann-atwater",
    role: "participant",
    timestamp: "1971-07-15T11:35:00.000Z"
  },
  {
    roomId: "room-2",
    text: "Desegregation could change the character of our neighborhoods. We need to think about property values and community stability.",
    userName: "Robert Williams",
    userId: "community-member-2",
    role: "participant",
    timestamp: "1971-07-15T11:45:00.000Z"
  },
  {
    roomId: "room-2",
    text: "I've come to realize that protecting our children's education is more important than maintaining segregated neighborhoods.",
    userName: "C.P. Ellis",
    userId: "cp-ellis",
    role: "participant",
    timestamp: "1971-07-15T12:00:00.000Z"
  }
];

const mockReport = {
  title: "1971 Durham School Desegregation Summit - Final Report",
  generatedAt: "1971-07-15T17:00:00.000Z",
  summary: {
    totalMessages: 8,
    totalParticipants: 5,
    totalBreakoutRooms: 3,
    analysisResults: 3,
    reasoningResults: []
  },
  breakoutRooms: mockCharetteData.breakoutRooms,
  keyFindings: [
    {
      category: "Community Division",
      items: [
        "Deep racial divisions existed but were bridgeable through dialogue",
        "Economic concerns about property values were significant barriers",
        "Transportation and safety emerged as critical practical issues"
      ],
      impact: "High - These findings shaped the eventual desegregation plan"
    },
    {
      category: "Unexpected Alliances",
      items: [
        "Civil rights activist and KKK leader found common ground",
        "Both co-chairs demonstrated willingness to listen and compromise",
        "Personal relationships formed that transcended ideological differences"
      ],
      impact: "Transformative - Led to lasting community partnerships"
    },
    {
      category: "Practical Solutions",
      items: [
        "Phased implementation approach was preferred over immediate change",
        "Additional funding needed for transportation and teacher training",
        "Community oversight committees recommended for monitoring progress"
      ],
      impact: "Actionable - Directly informed the final desegregation plan"
    }
  ],
  recommendations: [
    {
      priority: "High",
      action: "Implement phased desegregation over 3-year period",
      rationale: "Allows community adjustment and proper resource allocation"
    },
    {
      priority: "High",
      action: "Establish community oversight committee with diverse representation",
      rationale: "Ensures ongoing dialogue and accountability"
    },
    {
      priority: "Medium",
      action: "Increase funding for school transportation and safety measures",
      rationale: "Addresses primary parent concerns about child safety"
    },
    {
      priority: "Medium",
      action: "Develop cross-cultural education programs for all community members",
      rationale: "Builds understanding and reduces prejudice"
    }
  ],
  nextSteps: [
    "Present findings to Durham City Council",
    "Develop detailed implementation timeline",
    "Secure additional funding from state and federal sources",
    "Establish community monitoring committee",
    "Begin teacher training and curriculum development",
    "Plan ongoing community dialogue sessions"
  ]
};

async function createMockDemo() {
  console.log('🎬 Creating "Best of Enemies" Demonstration Charette...\n');

  try {
    // Create demo directory
    const demoDir = path.join(__dirname, 'demo-data');
    if (!fs.existsSync(demoDir)) {
      fs.mkdirSync(demoDir);
    }

    // Save mock data files
    fs.writeFileSync(
      path.join(demoDir, 'charette.json'),
      JSON.stringify(mockCharetteData, null, 2)
    );

    fs.writeFileSync(
      path.join(demoDir, 'messages.json'),
      JSON.stringify(mockMessages, null, 2)
    );

    fs.writeFileSync(
      path.join(demoDir, 'report.json'),
      JSON.stringify(mockReport, null, 2)
    );

    console.log('✅ Mock charette data created successfully!');
    console.log(`📁 Demo data saved to: ${demoDir}`);
    console.log('');

    // Display charette summary
    console.log('🎭 Charette Summary:');
    console.log(`Title: ${mockCharetteData.title}`);
    console.log(`Participants: ${mockCharetteData.participants.length}`);
    console.log(`Breakout Rooms: ${mockCharetteData.breakoutRooms.length}`);
    console.log(`Total Messages: ${mockMessages.length}`);
    console.log(`Analysis Results: ${mockCharetteData.analysis.length}`);
    console.log('');

    // Display key historical insights
    console.log('📚 Historical Insights from "Best of Enemies":');
    console.log('• Ann Atwater: Outspoken civil rights activist who challenged the status quo');
    console.log('• C.P. Ellis: Local KKK leader who underwent profound personal transformation');
    console.log('• Howard Fuller: Young community organizer who facilitated the dialogue');
    console.log('• Outcome: Successful desegregation plan that became a national model');
    console.log('• Impact: Changed lives and demonstrated the power of difficult conversations');
    console.log('');

    console.log('🚀 To use this demo data:');
    console.log('1. Set up Firebase database (follow FIREBASE_SETUP.md)');
    console.log('2. Import this data into your Firestore collections');
    console.log('3. Start the application: npm run dev-full');
    console.log('4. The demo charette will be available in the interface');

  } catch (error) {
    console.error('❌ Failed to create mock demo:', error);
    process.exit(1);
  }
}

// Run the demo creation
createMockDemo();
