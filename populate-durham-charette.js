const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, addDoc, serverTimestamp } = require('firebase/firestore');

// Load environment variables
require('dotenv').config({ path: './client/.env.local' });

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Historical context and content
const HISTORICAL_CONTEXT = {
  title: "1971 Durham School Desegregation Summit",
  description: "A charette focused on the 1971 Durham school desegregation efforts, examining the challenges, outcomes, and lessons learned from this pivotal moment in civil rights history.",
  metadata: {
    year: 1971,
    location: "Durham, North Carolina",
    facilitator: "Dr. John Hope Franklin",
    breakoutRoomTime: 30 // minutes
  },
  rooms: [
    {
      id: "historical-context",
      name: "Historical Context",
      description: "Understanding the background and events leading to the 1971 desegregation efforts",
      messages: [
        {
          role: "analyst",
          content: "Welcome to the Historical Context room. Here we'll explore the events and conditions that led to the 1971 desegregation efforts in Durham. Key points to discuss:\n\n1. The 1954 Brown v. Board of Education decision and its implementation in North Carolina\n2. The 'Pearsall Plan' and North Carolina's response to school integration\n3. The role of local civil rights leaders in Durham\n4. The specific challenges faced in Durham's school system"
        },
        {
          role: "participant",
          userName: "Historian",
          content: "In the years following Brown v. Board, North Carolina implemented the 'Pearsall Plan' which allowed for 'freedom of choice' plans that effectively delayed meaningful integration. By 1971, pressure was mounting for real change in Durham."
        }
      ]
    },
    {
      id: "community-perspectives",
      name: "Community Perspectives",
      description: "Voices from different community members during the desegregation process",
      messages: [
        {
          role: "analyst",
          content: "This room focuses on the diverse perspectives within the Durham community during desegregation. Consider:\n\n1. The experiences of Black students and families\n2. The concerns of white families and community members\n3. The role of educators and school administrators\n4. The perspective of local business and religious leaders"
        },
        {
          role: "participant",
          userName: "Community Member",
          content: "Many Black families saw desegregation as an opportunity for better resources and facilities, but there were also concerns about the loss of community schools and Black educators losing their positions."
        }
      ]
    },
    {
      id: "implementation-challenges",
      name: "Implementation Challenges",
      description: "Examining the practical challenges of implementing desegregation in 1971",
      messages: [
        {
          role: "analyst",
          content: "The transition to desegregated schools faced numerous challenges. Let's discuss:\n\n1. Transportation and logistics of busing students\n2. Teacher assignments and staff integration\n3. Curriculum adjustments and cultural sensitivity\n4. Community resistance and protests"
        },
        {
          role: "participant",
          userName: "Educator",
          content: "One major challenge was the reassignment of Black teachers and administrators, many of whom lost leadership positions or were transferred to schools where they had no community ties."
        }
      ]
    },
    {
      id: "long-term-impacts",
      name: "Long-term Impacts",
      description: "Analyzing the lasting effects of the 1971 desegregation efforts",
      messages: [
        {
          role: "analyst",
          content: "Let's examine the long-term effects of the 1971 desegregation:\n\n1. Academic outcomes for students\n2. Changes in community demographics\n3. The evolution of school policies\n4. The legacy for civil rights in Durham"
        },
        {
          role: "participant",
          userName: "Researcher",
          content: "While initial test scores showed mixed results, the long-term impact included greater educational opportunities for Black students and the beginning of more diverse school environments, though many challenges persisted."
        }
      ]
    }
  ]
};

async function createDurhamCharette() {
  try {
    console.log("🚀 Creating Durham School Desegregation Charette...");
    
    // Create charette document
    const charetteRef = doc(collection(db, 'charettes'));
    const charetteId = charetteRef.id;
    
    const charetteData = {
      id: charetteId,
      title: HISTORICAL_CONTEXT.title,
      description: HISTORICAL_CONTEXT.description,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      metadata: HISTORICAL_CONTEXT.metadata,
      status: 'active',
      currentPhase: 'discussion',
      breakoutRooms: []
    };

    // Add charette to database
    await setDoc(charetteRef, charetteData);
    console.log(`✅ Created charette: ${charetteId}`);

    // Create rooms and add messages
    for (const room of HISTORICAL_CONTEXT.rooms) {
      // Add room to charette
      const roomData = {
        id: room.id,
        name: room.name,
        description: room.description,
        createdAt: serverTimestamp(),
        isBreakout: true
      };
      
      // Add room to charette
      await setDoc(doc(db, `charettes/${charetteId}/rooms`, room.id), roomData);
      console.log(`   - Created room: ${room.name}`);
      
      // Add messages to room
      for (const message of room.messages) {
        await addDoc(collection(db, `charettes/${charetteId}/rooms/${room.id}/messages`), {
          ...message,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      console.log(`     Added ${room.messages.length} messages to ${room.name}`);
    }

    console.log("\n🎉 Successfully created Durham School Desegregation Charette!");
    console.log(`🔗 You can access it at: http://localhost:3000/charette/${charetteId}`);
    
    return charetteId;
    
  } catch (error) {
    console.error("Error creating charette:", error);
    throw error;
  }
}

// Run the script
createDurhamCharette()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
