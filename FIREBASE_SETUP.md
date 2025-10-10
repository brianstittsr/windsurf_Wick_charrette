# Firebase Database Setup Guide

This guide will help you set up Firebase Firestore database for the Charette System.

## Prerequisites

1. **Firebase Project**: Create a project at https://console.firebase.google.com/
2. **Node.js**: Make sure you have Node.js installed
3. **Firebase CLI** (optional): For deploying security rules

## Step 1: Firebase Console Setup

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select existing project
3. Follow the setup wizard

### 1.2 Enable Firestore
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (you can change this later)
4. Select a location for your database

### 1.3 Enable Authentication
1. Go to "Authentication" in the Firebase Console
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Google" as a sign-in provider
5. Add your domain to authorized domains:
   - For development: `localhost`
   - For production: your actual domain

### 1.4 Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" → Web app (</>)
4. Register your app with a nickname
5. Copy the config object - you'll need this for `.env.local`

## Step 2: Service Account Key (for Database Initialization)

### 2.1 Generate Service Account Key
1. In Firebase Console, go to Project Settings
2. Go to "Service accounts" tab
3. Click "Generate new private key"
4. Save the JSON file as `firebase-service-account.json` in your project root

⚠️ **Security Warning**: Never commit this file to version control!

## Step 3: Environment Configuration

### 3.1 Create Environment File
```bash
# Copy the template
cp client/.env.local.template client/.env.local

# Edit with your Firebase config
notepad client/.env.local  # or your preferred editor
```

### 3.2 Add Your Firebase Config
Edit `client/.env.local` with the values from Firebase Console:

```env
REACT_APP_FIREBASE_API_KEY=AIzaSyC...your_key...
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456789
```

## Step 4: Initialize Database

### 4.1 Install Dependencies
```bash
npm install
```

### 4.2 Run Database Initialization
```bash
npm run init-db
```

This will:
- ✅ Create all required collections
- ✅ Set up initial data structure
- ✅ Generate Firestore security rules
- ✅ Create sample data for testing

## Step 5: Deploy Security Rules (Optional)

If you have Firebase CLI installed:
```bash
npm install -g firebase-tools
firebase login
firebase init  # Select your project
firebase deploy --only firestore:rules
```

## Step 6: Create Composite Indexes

Firestore requires composite indexes for complex queries. Create these manually:

### Required Indexes:

1. **Messages Collection**:
   - `charetteId` + `timestamp` (ascending)
   - `charetteId` + `roomId` + `timestamp` (ascending)

2. **Participants Collection**:
   - `charetteId` + `userId` (for uniqueness)

3. **Reports Collection**:
   - `charetteId` + `generatedAt` (descending)

4. **Analysis Collection**:
   - `charetteId` + `createdAt` (descending)

### How to Create Indexes:

1. Go to Firebase Console → Firestore Database
2. Click on "Indexes" tab
3. Click "Create Index"
4. Fill in the collection and fields as specified above

## Step 7: Test the System

```bash
# Start the application
npm run dev-full
```

Visit http://localhost:3000 and test:
- ✅ Google Sign-in
- ✅ Create charettes
- ✅ Join sessions
- ✅ Breakout rooms with multiple questions
- ✅ Real-time messaging
- ✅ Report generation

## Troubleshooting

### Common Issues:

**"Firebase service account key not found"**
- Make sure `firebase-service-account.json` is in the project root
- Verify the file wasn't accidentally committed to git

**"Invalid credentials"**
- Check your `.env.local` file has the correct Firebase config
- Verify your Firebase project is active

**"Missing indexes"**
- Some queries may fail until you create the composite indexes
- Check Firebase Console for index creation errors

**Authentication not working**
- Verify Google provider is enabled in Firebase Console
- Check authorized domains include localhost

### Development vs Production

**Development**:
- Use Firestore test mode
- Local environment variables
- Firebase emulator (optional)

**Production**:
- Set proper security rules
- Use environment-specific config
- Enable Firebase Analytics if desired

## Database Schema Reference

See `FIRESTORE_SCHEMA.md` for detailed collection structures and relationships.

## Next Steps

Once your database is set up:
1. Test all features thoroughly
2. Adjust security rules for production
3. Set up monitoring and backups
4. Consider Firestore usage costs for scaling

🎉 Your Charette System is now running on Firebase Firestore!
