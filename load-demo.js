#!/usr/bin/env node

/**
 * Demo Data Loader for Charette System
 * Loads the "Best of Enemies" demonstration data into the application
 */

const fs = require('fs');
const path = require('path');

function loadDemoData() {
  console.log('🎬 Loading "Best of Enemies" Demo Data into Charette System...\n');

  try {
    // Read demo data files
    const demoDir = path.join(__dirname, 'demo-data');

    if (!fs.existsSync(demoDir)) {
      console.log('❌ Demo data not found. Run "node create-demo.js" first.');
      process.exit(1);
    }

    const charetteData = JSON.parse(fs.readFileSync(path.join(demoDir, 'charette.json'), 'utf8'));
    const messagesData = JSON.parse(fs.readFileSync(path.join(demoDir, 'messages.json'), 'utf8'));
    const reportData = JSON.parse(fs.readFileSync(path.join(demoDir, 'report.json'), 'utf8'));

    // Generate unique IDs for demo data
    const charetteId = `demo-${Date.now()}`;
    charetteData.id = charetteId;

    // Update message references
    const messagesByRoom = {};
    messagesData.forEach((message, index) => {
      message.id = `msg-${index}`;
      message.charetteId = charetteId;

      const roomId = message.roomId || 'main';
      if (!messagesByRoom[roomId]) {
        messagesByRoom[roomId] = [];
      }
      messagesByRoom[roomId].push(message);
    });

    // Update breakout room references
    charetteData.breakoutRooms = charetteData.breakoutRooms.map((room, index) => ({
      id: `room-${index + 1}`,
      ...room,
      charetteId
    }));

    // Update participant references
    charetteData.participants = charetteData.participants.map(participant => ({
      ...participant,
      charetteId
    }));

    // Update analysis references
    charetteData.analysis = charetteData.analysis.map(analysis => ({
      ...analysis,
      charetteId
    }));

    // Create demo-data.js file for the application
    const demoLoaderCode = `
// Demo Data Loader - Auto-generated from create-demo.js
// This file contains the "Best of Enemies" demonstration data

const DEMO_DATA = {
  charette: ${JSON.stringify(charetteData, null, 2)},

  messages: ${JSON.stringify(messagesByRoom, null, 2)},

  report: ${JSON.stringify(reportData, null, 2)}
};

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DEMO_DATA;
}

console.log('🎬 "Best of Enemies" demo data loaded!');
console.log('Demo charette ID:', '${charetteId}');
`;

    fs.writeFileSync(path.join(__dirname, 'demo-loader.js'), demoLoaderCode);

    console.log('✅ Demo data loader created successfully!');
    console.log(`📁 Loader saved as: demo-loader.js`);
    console.log(`🎭 Demo Charette ID: ${charetteId}`);
    console.log('');

    // Display summary
    console.log('📊 Demo Data Summary:');
    console.log(`• Charette: "${charetteData.title}"`);
    console.log(`• Participants: ${charetteData.participants.length}`);
    console.log(`• Breakout Rooms: ${charetteData.breakoutRooms.length}`);
    console.log(`• Messages: ${Object.values(messagesByRoom).flat().length}`);
    console.log(`• Analysis Results: ${charetteData.analysis.length}`);
    console.log('');

    console.log('🎯 To use this demo:');
    console.log('1. Start the server: npm run dev');
    console.log('2. The demo charette will be available in the interface');
    console.log('3. For Firebase setup, import this data into Firestore');

  } catch (error) {
    console.error('❌ Failed to load demo data:', error);
    process.exit(1);
  }
}

// Run the demo data loader
loadDemoData();
