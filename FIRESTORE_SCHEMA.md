# Firebase Firestore Database Schema

This document describes the database schema for the Charette System using Firebase Firestore.

## Collections Overview

### 1. `charettes` Collection
Main collection for charette sessions.

**Document Structure:**
```javascript
{
  id: "string", // Auto-generated document ID
  title: "string", // Charette title
  description: "string", // Optional description
  currentPhase: "number", // Current phase index (0-5)
  phases: "array", // Phase definitions (same as in phases.js)
  createdAt: "timestamp", // Creation timestamp
  updatedAt: "timestamp", // Last update timestamp
  isActive: "boolean", // Whether charette is active
  participants: "array", // Array of participant user IDs
  breakoutRooms: "array", // Array of breakout room IDs
  analysis: "array" // Analysis results
}
```

**Indexes Required:**
- None (basic queries)

### 2. `messages` Collection
All chat messages across all charettes and rooms.

**Document Structure:**
```javascript
{
  id: "string", // Auto-generated document ID
  charetteId: "string", // Reference to charette document
  roomId: "string", // Room identifier ('main' or 'room-1', 'room-2', etc.)
  text: "string", // Message content
  userName: "string", // Display name of sender
  userId: "string", // Firebase Auth user ID
  role: "string", // User role ('participant', 'analyst', 'project_manager')
  timestamp: "timestamp", // Message timestamp
  type: "string" // Message type ('chat', 'system', etc.)
}
```

**Indexes Required:**
- Composite index on `charetteId` + `timestamp` (ascending)
- Composite index on `charetteId` + `roomId` + `timestamp` (ascending)

### 3. `participants` Collection
Participant information for each charette.

**Document Structure:**
```javascript
{
  id: "string", // Auto-generated document ID
  charetteId: "string", // Reference to charette document
  userId: "string", // Firebase Auth user ID
  userName: "string", // Display name
  role: "string", // User role
  joinedAt: "timestamp", // When user joined
  updatedAt: "timestamp", // Last update timestamp
  currentRoom: "string", // Current room ('main' or room ID)
  isActive: "boolean" // Whether participant is currently active
}
```

**Indexes Required:**
- Composite index on `charetteId` + `userId` (for uniqueness checks)

### 4. `breakoutRooms` Collection
Breakout room configurations and state.

**Document Structure:**
```javascript
{
  id: "string", // Auto-generated document ID
  charetteId: "string", // Reference to charette document
  name: "string", // Room display name ('Breakout Room 1', etc.)
  questions: "array", // Array of discussion questions
  participants: "array", // Array of participant user IDs currently in room
  createdAt: "timestamp", // Room creation timestamp
  updatedAt: "timestamp", // Last update timestamp
  isActive: "boolean" // Whether room is currently active
}
```

**Indexes Required:**
- Index on `charetteId`

### 5. `reports` Collection
Generated charette reports.

**Document Structure:**
```javascript
{
  id: "string", // Auto-generated document ID
  charetteId: "string", // Reference to charette document
  title: "string", // Report title
  generatedAt: "timestamp", // Report generation timestamp
  summary: {
    totalMessages: "number",
    totalParticipants: "number",
    totalBreakoutRooms: "number",
    analysisResults: "array",
    reasoningResults: "array"
  },
  breakoutRooms: "array", // Room details at time of report
  keyFindings: "array", // Analysis findings
  recommendations: "array", // Action recommendations
  nextSteps: "array" // Implementation steps
}
```

**Indexes Required:**
- Composite index on `charetteId` + `generatedAt` (descending)

### 6. `analysis` Collection
Real-time analysis results.

**Document Structure:**
```javascript
{
  id: "string", // Auto-generated document ID
  charetteId: "string", // Reference to charette document
  roomId: "string", // Room identifier
  type: "string", // Analysis type ('constraint', 'assumption', 'opportunity')
  content: "string", // Analysis content
  keywords: "array", // Identified keywords
  confidence: "number", // Analysis confidence score
  createdAt: "timestamp" // Analysis timestamp
}
```

**Indexes Required:**
- Composite index on `charetteId` + `createdAt` (descending)

## Data Relationships

```
charettes (1) ──── (many) participants
    │
    ├── (many) messages
    │       └── filtered by roomId
    │
    ├── (many) breakoutRooms
    │       └── contains participant assignments
    │
    ├── (many) reports
    │       └── historical snapshots
    │
    └── (many) analysis
        └── real-time insights
```

## Security Rules

### Firestore Security Rules (firestore.rules)

```javascript
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
```

## Initialization Script

Use the provided Firebase setup script to initialize your database:

```bash
cd client
./setup-firebase.ps1  # Windows PowerShell
```

Or manually configure your `.env.local` file with Firebase credentials.

## Migration Notes

When migrating from the in-memory system to Firestore:

1. **Charette Data**: Convert existing charette objects to Firestore documents
2. **Message History**: Migrate messages with proper roomId assignments
3. **Participant Tracking**: Create participant documents for active users
4. **Room State**: Initialize breakout rooms with current participants
5. **Reports**: Migrate existing reports to the reports collection

The system is designed to work with both in-memory (development) and Firestore (production) backends seamlessly.
