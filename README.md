# Charette System

A web application designed to guide groups through the phases of a Charette process, featuring real-time collaboration, reasoning algorithms, and automated report generation.

## Features

- **Firebase Authentication**: Secure Google sign-in with user management
- **Real-time Chat**: Participants can communicate with role-based messaging
- **Phase-based Facilitation**: Structured guidance through 6 Charette phases
- **B-MAD Method Integration**: Analyst and Project Manager roles for orchestration
- **Reasoning Algorithms**: Automatic analysis of constraints, assumptions, and opportunities
- **Report Generation**: Comprehensive final reports with findings and recommendations
- **ChatGPT-style UI**: Clean, minimal interface for easy use

## Architecture

- Real-time communication via WebSocket and Firebase
- **Database**: Firebase Firestore (production) / In-memory (development)
- RESTful API for charette management
- Automatic reasoning analysis during analysis phase

### Frontend (React + Firebase)
- Single-page application with real-time updates
- Firebase authentication with Google sign-in
- Role-based user interface with breakout room management
- Live analysis display with question management
- Modal-based report display

### Database Schema (Firebase Firestore)

**Collections:**
- `charettes` - Main session data
- `messages` - All chat messages (room-scoped)
- `participants` - User participation records
- `breakoutRooms` - Room configurations and questions
- `reports` - Generated session reports
- `analysis` - Real-time analysis results

See `FIRESTORE_SCHEMA.md` for complete schema documentation.

## Setup & Installation

### Firebase Configuration

**📖 Complete Setup Guide**: See `FIREBASE_SETUP.md` for detailed instructions.

**Quick Setup**:
```bash
# 1. Install dependencies
npm install

# 2. Set up Firebase (follow FIREBASE_SETUP.md)
cd client && ./setup-firebase.ps1

# 3. Initialize database
npm run init-db

# 4. Test database connection (optional)
npm run test-db

# 5. Start the application
npm run dev-full
```

2. **Start the Application**

   **Option 1: All-in-one startup (Recommended)**
   ```bash
npm run dev-full
   ```

   **Option 2: Manual startup**
   ```bash
   # Terminal 1: Backend
   start-backend.bat

   # Terminal 2: Frontend
   start-frontend.bat
   ```

   **Option 3: Direct npm commands**
   ```bash
   # Terminal 1: Backend
   npm run dev

   # Terminal 2: Frontend
   cd client && npm start
   ```

3. **Access the Application**
   - Open http://localhost:3000 in your browser
   - Backend API runs on http://localhost:5000
   - Sign in with Google to access the application

## Usage

1. **Create a Charette**: Click "New Charette" and enter a title
2. **Join Session**: Click on a charette card to enter
4. **Participate**: Follow the phase guidance and contribute to discussions
5. **Analysis**: During the Analysis phase, messages are automatically analyzed for constraints and assumptions
6. **Breakout Rooms**: Analysts can create breakout rooms with discussion questions. Participants are auto-assigned and can contribute ideas in real-time without waiting for others to speak
7. **Generate Report**: After completing all phases, generate a comprehensive report including contributions from all breakout rooms

### Breakout Rooms

Traditional Charette processes often have participants waiting to speak in large group settings. This system addresses this by allowing:

- **Analysts** to create multiple breakout rooms with specific discussion questions
- **Multiple Questions**: Add as many questions as needed to each breakout room
- **Dynamic Question Management**: Add or remove questions during the session
- **Auto-assignment** of participants to rooms for balanced distribution
- **Real-time chat** in each room where participants can contribute ideas immediately
- **Parallel discussions** allowing more voices to be heard simultaneously
- **Consolidated analysis** of all room contributions in the final report

### Room Management

- **Creating Rooms**: Analysts click "Create Breakout Rooms" and specify number of rooms and discussion questions
- **Question Management**: Add multiple questions to each room, or add questions dynamically during sessions
- **Joining Rooms**: Participants click room buttons in the sidebar to switch between Main Room and breakout rooms
- **Room Persistence**: Messages are stored per room and included in final analysis
- **Participant Tracking**: Real-time count of participants in each room

## Charette Phases

1. **Introduction**: Welcome and overview
2. **Data Collection**: Gather initial information
3. **Analysis**: Explore constraints and assumptions (with live reasoning)
4. **Ideation**: Generate creative solutions
5. **Synthesis**: Combine findings and develop recommendations
6. **Reporting**: Generate final report

## B-MAD Method Integration

- **Analyst**: Leads analysis sessions, applies reasoning algorithms
- **Project Manager**: Manages overall process, facilitates discussions
- **Participants**: Contribute ideas and feedback throughout

## Reasoning Algorithms

The system employs keyword-based analysis to identify:
- **Constraints**: Limitations, blockers, requirements
- **Assumptions**: Unstated beliefs, presumptions
- **Opportunities**: Potential solutions, possibilities

## API Endpoints

- `GET /api/charettes` - List all charettes
- `POST /api/charettes` - Create new charette
- `GET /api/charettes/:id` - Get charette details
- `POST /api/charettes/:id/participants` - Register participant
- `GET /api/charettes/:id/messages` - Get charette messages (use ?roomId=room-1 for specific rooms)
- `POST /api/reasoning/analyze` - Run reasoning analysis
- `GET /api/charettes/:id/report` - Generate final report

## Database Operations

The system supports both **Firebase Firestore** (production) and **in-memory storage** (development).

### Firestore Collections

All data is organized into the following collections:
- **charettes**: Session metadata and state
- **messages**: Chat messages with room scoping
- **participants**: User participation records
- **breakoutRooms**: Room configurations with multiple questions
- **reports**: Generated analysis reports
- **analysis**: Real-time reasoning results

### Real-time Synchronization

- **WebSocket**: Immediate message delivery
- **Firestore Listeners**: Real-time database updates
- **Cross-tab Sync**: Changes sync across browser tabs

### Socket.io Events

**Client to Server:**
- `join-charette` - Join charette room
- `chat-message` - Send message (includes roomId)
- `next-phase` - Advance to next phase
- `join-breakout-room` - Join specific breakout room
- `leave-breakout-room` - Leave breakout room
- `create-breakout-rooms` - Create rooms (analyst only, includes questions array)
- `add-room-question` - Add question to existing room (analyst only)
- `remove-room-question` - Remove question from room (analyst only)

**Server to Client:**
- `chat-message` - Receive message
- `phase-changed` - Phase advancement
- `analysis-update` - Live analysis results
- `breakout-rooms-created` - New rooms available
- `room-updated` - Room participant or question changes

## Development

### Project Structure
```
charette-system/
├── server.js              # Backend server
├── phases.js              # Phase definitions and algorithms
├── client/                # React frontend
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── App.css       # Styling
│   │   └── ...
└── package.json          # Dependencies
```

### Technologies Used
- **Backend**: Node.js, Express, Socket.io
- **Frontend**: React, Socket.io-client
- **Styling**: CSS with ChatGPT-inspired design
- **Real-time**: WebSocket communication

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Advanced NLP for better reasoning algorithms
- User authentication and session management
- Export reports to PDF/Word
- Integration with project management tools
- Mobile-responsive improvements
- Voice-to-text for accessibility
