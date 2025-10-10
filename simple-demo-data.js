// Simplified demo data for Vercel deployment
module.exports = {
  charette: {
    id: "demo-charette",
    title: "Demo Charette Session",
    description: "Sample collaborative facilitation session",
    currentPhase: 0,
    createdAt: new Date().toISOString(),
    phases: [
      { id: 'introduction', name: 'Introduction', description: 'Welcome and overview' },
      { id: 'data_collection', name: 'Data Collection', description: 'Gather initial information' },
      { id: 'analysis', name: 'Analysis', description: 'Explore constraints and assumptions' },
      { id: 'ideation', name: 'Ideation', description: 'Generate ideas' },
      { id: 'synthesis', name: 'Synthesis', description: 'Combine findings' },
      { id: 'reporting', name: 'Reporting', description: 'Generate final report' }
    ],
    participants: [],
    breakoutRooms: []
  },
  messages: {
    "main": [
      {
        id: "msg-1",
        text: "Welcome to the demo charette session!",
        userName: "System",
        role: "analyst",
        roomId: "main",
        timestamp: new Date().toISOString()
      }
    ]
  },
  report: {
    title: "Demo Report",
    generatedAt: new Date().toISOString(),
    summary: {
      totalMessages: 1,
      totalParticipants: 1
    }
  }
};
