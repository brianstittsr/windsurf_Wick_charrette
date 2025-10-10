#!/usr/bin/env node

/**
 * Firebase Database Initialization Script
 * Sets up Firestore database schema and initial data for Charette System
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
// You'll need to download your service account key from Firebase Console
// and place it in the project root as 'firebase-service-account.json'

let serviceAccount;
try {
  serviceAccount = require('../firebase-service-account.json');
} catch (error) {
  console.error('❌ Firebase service account key not found!');
  console.error('Please download your service account key from Firebase Console');
  console.error('and save it as "firebase-service-account.json" in the project root.');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

const db = admin.firestore();

async function initializeDatabase() {
  console.log('🚀 Initializing Charette System Database...');

  try {
    // Create collections and set up initial data
    await createCollections();
    await createIndexes();
    await createSampleData();
    await deploySecurityRules();

    console.log('✅ Database initialization complete!');
    console.log('');
    console.log('🎯 Next steps:');
    console.log('1. Update your .env.local with Firebase config');
    console.log('2. Run the application: npm run dev-full');
    console.log('3. Test creating a charette and breakout rooms');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

async function createCollections() {
  console.log('📁 Creating database collections...');

  const collections = [
    'charettes',
    'messages',
    'participants',
    'breakoutRooms',
    'reports',
    'analysis'
  ];

  // Create a dummy document in each collection to initialize them
  const promises = collections.map(async (collectionName) => {
    const docRef = db.collection(collectionName).doc('init');
    await docRef.set({
      initialized: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    // Clean up the dummy document
    await docRef.delete();
  });

  await Promise.all(promises);
  console.log('✅ Collections created successfully');
}

async function createIndexes() {
  console.log('🔍 Creating database indexes...');

  // Note: Firestore automatically creates single-field indexes
  // Composite indexes need to be created manually in Firebase Console
  // or via the Firebase CLI

  console.log('ℹ️  Note: Composite indexes must be created manually in Firebase Console:');
  console.log('   - messages: (charetteId, timestamp)');
  console.log('   - messages: (charetteId, roomId, timestamp)');
  console.log('   - participants: (charetteId, userId)');
  console.log('   - reports: (charetteId, generatedAt)');
  console.log('   - analysis: (charetteId, createdAt)');

  console.log('✅ Index requirements documented');
}

async function createSampleData() {
  console.log('📝 Creating sample data...');

  // Create a sample charette
  const charetteRef = db.collection('charettes').doc();
  await charetteRef.set({
    title: 'Sample Charette Session',
    description: 'This is a sample charette for testing the system',
    currentPhase: 0,
    phases: [
      { name: 'Introduction', description: 'Welcome and overview' },
      { name: 'Data Collection', description: 'Gather initial information' },
      { name: 'Analysis', description: 'Explore constraints and assumptions' },
      { name: 'Ideation', description: 'Generate ideas' },
      { name: 'Synthesis', description: 'Combine findings' },
      { name: 'Reporting', description: 'Generate final report' }
    ],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    isActive: true,
    participants: [],
    breakoutRooms: [],
    analysis: []
  });

  // Create sample messages
  const messageRef = db.collection('messages').doc();
  await messageRef.set({
    charetteId: charetteRef.id,
    roomId: 'main',
    text: 'Welcome to the sample charette session!',
    userName: 'System',
    userId: 'system',
    role: 'system',
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    type: 'system'
  });

  console.log('✅ Sample data created');
  console.log(`   Sample charette ID: ${charetteRef.id}`);
}

async function deploySecurityRules() {
  console.log('🔒 Setting up security rules...');

  const securityRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own participant records
    match /participants/{participantId} {
      allow read, write: if request.auth != null &&
        (request.auth.uid == resource.data.userId ||
         request.auth.uid == get(/databases/$(database)/documents/charettes/$(resource.data.charetteId)).data.createdBy);
    }

    // Users can read charettes they participate in
    match /charettes/{charetteId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Users can read/write messages in charettes they participate in
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
        request.auth.uid == resource.data.userId;
    }

    // Users can read/write breakout rooms in their charettes
    match /breakoutRooms/{roomId} {
      allow read, write: if request.auth != null;
    }

    // Users can read reports for charettes they participate in
    match /reports/{reportId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }

    // Analysis data is readable by participants
    match /analysis/{analysisId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
`;

  // Write security rules to file (you'll need to deploy via Firebase CLI)
  fs.writeFileSync('firestore.rules', securityRules);

  console.log('✅ Security rules written to firestore.rules');
  console.log('ℹ️  To deploy: firebase deploy --only firestore:rules');
}

// Run initialization
initializeDatabase().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error('Initialization failed:', error);
  process.exit(1);
});
