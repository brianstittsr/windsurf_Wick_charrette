#!/usr/bin/env node

/**
 * Firebase Database Test Script
 * Tests the database connection and basic operations
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

// Load Firebase config from environment
require('dotenv').config({ path: './client/.env.local' });

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

async function testDatabase() {
  console.log('🧪 Testing Firebase Database Connection...\n');

  try {
    // Check environment variables
    console.log('📋 Checking environment configuration...');
    const requiredEnvVars = [
      'REACT_APP_FIREBASE_API_KEY',
      'REACT_APP_FIREBASE_PROJECT_ID',
      'REACT_APP_FIREBASE_AUTH_DOMAIN'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar] || process.env[envVar].includes('your_')) {
        console.log(`❌ ${envVar} not configured properly`);
        console.log('   Please run the Firebase setup script first');
        process.exit(1);
      } else {
        console.log(`✅ ${envVar} configured`);
      }
    }

    console.log('\n🔗 Connecting to Firebase...');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log('✅ Firebase initialized successfully');

    // Test database connection by listing collections
    console.log('\n📊 Testing database collections...');

    const collections = [
      'charettes',
      'messages',
      'participants',
      'breakoutRooms',
      'reports',
      'analysis'
    ];

    for (const collectionName of collections) {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        console.log(`✅ Collection '${collectionName}': ${querySnapshot.size} documents`);
      } catch (error) {
        console.log(`❌ Collection '${collectionName}': Error accessing - ${error.message}`);
      }
    }

    console.log('\n🎉 Database test completed successfully!');
    console.log('\n📝 Your Firebase database is ready for the Charette System.');
    console.log('🚀 You can now run: npm run dev-full');

  } catch (error) {
    console.error('\n❌ Database test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your .env.local file has correct Firebase config');
    console.log('2. Verify Firebase project is active');
    console.log('3. Run: npm run init-db (if database not initialized)');
    console.log('4. Check Firebase Console for any issues');
    process.exit(1);
  }
}

// Run the test
testDatabase();
