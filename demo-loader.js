
// Demo Data Loader - Auto-generated from create-demo.js
// This file contains the "Best of Enemies" demonstration data

const DEMO_DATA = {
  charette: {
  "title": "1971 Durham School Desegregation Summit",
  "description": "Historic community dialogue between civil rights activist Ann Atwater and KKK leader C.P. Ellis, co-chaired by Howard Fuller. This landmark summit addressed the desegregation of Durham schools during the racially charged summer of 1971.",
  "createdAt": "1971-07-15T09:00:00.000Z",
  "currentPhase": 5,
  "phases": [
    {
      "name": "Introduction",
      "description": "Welcome and overview"
    },
    {
      "name": "Data Collection",
      "description": "Gather initial information"
    },
    {
      "name": "Analysis",
      "description": "Explore constraints and assumptions"
    },
    {
      "name": "Ideation",
      "description": "Generate creative solutions"
    },
    {
      "name": "Synthesis",
      "description": "Combine findings and develop recommendations"
    },
    {
      "name": "Reporting",
      "description": "Generate final report"
    }
  ],
  "isActive": false,
  "participants": [
    {
      "userId": "ann-atwater",
      "userName": "Ann Atwater",
      "role": "participant",
      "joinedAt": "1971-07-15T09:00:00.000Z",
      "charetteId": "demo-1759594042934"
    },
    {
      "userId": "cp-ellis",
      "userName": "C.P. Ellis",
      "role": "participant",
      "joinedAt": "1971-07-15T09:00:00.000Z",
      "charetteId": "demo-1759594042934"
    },
    {
      "userId": "howard-fuller",
      "userName": "Howard Fuller",
      "role": "analyst",
      "joinedAt": "1971-07-15T09:00:00.000Z",
      "charetteId": "demo-1759594042934"
    },
    {
      "userId": "community-member-1",
      "userName": "Sarah Johnson",
      "role": "participant",
      "joinedAt": "1971-07-15T10:30:00.000Z",
      "charetteId": "demo-1759594042934"
    },
    {
      "userId": "community-member-2",
      "userName": "Robert Williams",
      "role": "participant",
      "joinedAt": "1971-07-15T10:45:00.000Z",
      "charetteId": "demo-1759594042934"
    }
  ],
  "breakoutRooms": [
    {
      "id": "room-1",
      "name": "Parent Concerns Room",
      "questions": [
        "What are your main concerns about school desegregation?",
        "How will this affect your children's education?",
        "What support do parents need during this transition?"
      ],
      "participants": [
        "ann-atwater",
        "community-member-1"
      ],
      "createdAt": "1971-07-15T11:00:00.000Z",
      "charetteId": "demo-1759594042934"
    },
    {
      "id": "room-2",
      "name": "Community Impact Room",
      "questions": [
        "How will desegregation change our neighborhoods?",
        "What economic impacts should we consider?",
        "How can we maintain community cohesion?"
      ],
      "participants": [
        "cp-ellis",
        "community-member-2"
      ],
      "createdAt": "1971-07-15T11:00:00.000Z",
      "charetteId": "demo-1759594042934"
    },
    {
      "id": "room-3",
      "name": "Implementation Planning Room",
      "questions": [
        "What timeline works for implementation?",
        "What resources are needed for success?",
        "How do we measure progress and success?"
      ],
      "participants": [
        "howard-fuller"
      ],
      "createdAt": "1971-07-15T11:00:00.000Z",
      "charetteId": "demo-1759594042934"
    }
  ],
  "analysis": [
    {
      "type": "constraint",
      "content": "Limited funding for school transportation and resources",
      "keywords": [
        "funding",
        "transportation",
        "resources"
      ],
      "confidence": 0.85,
      "createdAt": "1971-07-15T14:30:00.000Z",
      "charetteId": "demo-1759594042934"
    },
    {
      "type": "assumption",
      "content": "All community members want immediate full integration",
      "keywords": [
        "integration",
        "immediate",
        "community"
      ],
      "confidence": 0.72,
      "createdAt": "1971-07-15T15:00:00.000Z",
      "charetteId": "demo-1759594042934"
    },
    {
      "type": "opportunity",
      "content": "Cross-cultural dialogue can build understanding",
      "keywords": [
        "dialogue",
        "understanding",
        "cultural"
      ],
      "confidence": 0.91,
      "createdAt": "1971-07-15T16:00:00.000Z",
      "charetteId": "demo-1759594042934"
    }
  ],
  "id": "demo-1759594042934"
},

  messages: {
  "main": [
    {
      "roomId": "main",
      "text": "Welcome everyone to this historic community summit. I'm Howard Fuller, and I'll be facilitating today's discussion.",
      "userName": "Howard Fuller",
      "userId": "howard-fuller",
      "role": "analyst",
      "timestamp": "1971-07-15T09:00:00.000Z",
      "id": "msg-0",
      "charetteId": "demo-1759594042934"
    },
    {
      "roomId": "main",
      "text": "I want to thank Ann Atwater and C.P. Ellis for agreeing to co-chair this summit. This represents a significant step forward for our community.",
      "userName": "Howard Fuller",
      "userId": "howard-fuller",
      "role": "analyst",
      "timestamp": "1971-07-15T09:05:00.000Z",
      "id": "msg-1",
      "charetteId": "demo-1759594042934"
    },
    {
      "roomId": "main",
      "text": "This desegregation issue has divided our community for too long. We need to find a way forward that works for everyone.",
      "userName": "Ann Atwater",
      "userId": "ann-atwater",
      "role": "participant",
      "timestamp": "1971-07-15T09:15:00.000Z",
      "id": "msg-2",
      "charetteId": "demo-1759594042934"
    },
    {
      "roomId": "main",
      "text": "I may not agree with everything that's being proposed, but I'm here to listen and find solutions that protect our children's future.",
      "userName": "C.P. Ellis",
      "userId": "cp-ellis",
      "role": "participant",
      "timestamp": "1971-07-15T09:20:00.000Z",
      "id": "msg-3",
      "charetteId": "demo-1759594042934"
    }
  ],
  "room-1": [
    {
      "roomId": "room-1",
      "text": "As a parent, I'm worried about my child's safety on long bus rides to schools outside our neighborhood.",
      "userName": "Sarah Johnson",
      "userId": "community-member-1",
      "role": "participant",
      "timestamp": "1971-07-15T11:30:00.000Z",
      "id": "msg-4",
      "charetteId": "demo-1759594042934"
    },
    {
      "roomId": "room-1",
      "text": "Transportation safety is a valid concern. We need to ensure all children feel secure regardless of where they attend school.",
      "userName": "Ann Atwater",
      "userId": "ann-atwater",
      "role": "participant",
      "timestamp": "1971-07-15T11:35:00.000Z",
      "id": "msg-5",
      "charetteId": "demo-1759594042934"
    }
  ],
  "room-2": [
    {
      "roomId": "room-2",
      "text": "Desegregation could change the character of our neighborhoods. We need to think about property values and community stability.",
      "userName": "Robert Williams",
      "userId": "community-member-2",
      "role": "participant",
      "timestamp": "1971-07-15T11:45:00.000Z",
      "id": "msg-6",
      "charetteId": "demo-1759594042934"
    },
    {
      "roomId": "room-2",
      "text": "I've come to realize that protecting our children's education is more important than maintaining segregated neighborhoods.",
      "userName": "C.P. Ellis",
      "userId": "cp-ellis",
      "role": "participant",
      "timestamp": "1971-07-15T12:00:00.000Z",
      "id": "msg-7",
      "charetteId": "demo-1759594042934"
    }
  ]
},

  report: {
  "title": "1971 Durham School Desegregation Summit - Final Report",
  "generatedAt": "1971-07-15T17:00:00.000Z",
  "summary": {
    "totalMessages": 8,
    "totalParticipants": 5,
    "totalBreakoutRooms": 3,
    "analysisResults": 3,
    "reasoningResults": []
  },
  "breakoutRooms": [
    {
      "name": "Parent Concerns Room",
      "questions": [
        "What are your main concerns about school desegregation?",
        "How will this affect your children's education?",
        "What support do parents need during this transition?"
      ],
      "participants": [
        "ann-atwater",
        "community-member-1"
      ],
      "createdAt": "1971-07-15T11:00:00.000Z"
    },
    {
      "name": "Community Impact Room",
      "questions": [
        "How will desegregation change our neighborhoods?",
        "What economic impacts should we consider?",
        "How can we maintain community cohesion?"
      ],
      "participants": [
        "cp-ellis",
        "community-member-2"
      ],
      "createdAt": "1971-07-15T11:00:00.000Z"
    },
    {
      "name": "Implementation Planning Room",
      "questions": [
        "What timeline works for implementation?",
        "What resources are needed for success?",
        "How do we measure progress and success?"
      ],
      "participants": [
        "howard-fuller"
      ],
      "createdAt": "1971-07-15T11:00:00.000Z"
    }
  ],
  "keyFindings": [
    {
      "category": "Community Division",
      "items": [
        "Deep racial divisions existed but were bridgeable through dialogue",
        "Economic concerns about property values were significant barriers",
        "Transportation and safety emerged as critical practical issues"
      ],
      "impact": "High - These findings shaped the eventual desegregation plan"
    },
    {
      "category": "Unexpected Alliances",
      "items": [
        "Civil rights activist and KKK leader found common ground",
        "Both co-chairs demonstrated willingness to listen and compromise",
        "Personal relationships formed that transcended ideological differences"
      ],
      "impact": "Transformative - Led to lasting community partnerships"
    },
    {
      "category": "Practical Solutions",
      "items": [
        "Phased implementation approach was preferred over immediate change",
        "Additional funding needed for transportation and teacher training",
        "Community oversight committees recommended for monitoring progress"
      ],
      "impact": "Actionable - Directly informed the final desegregation plan"
    }
  ],
  "recommendations": [
    {
      "priority": "High",
      "action": "Implement phased desegregation over 3-year period",
      "rationale": "Allows community adjustment and proper resource allocation"
    },
    {
      "priority": "High",
      "action": "Establish community oversight committee with diverse representation",
      "rationale": "Ensures ongoing dialogue and accountability"
    },
    {
      "priority": "Medium",
      "action": "Increase funding for school transportation and safety measures",
      "rationale": "Addresses primary parent concerns about child safety"
    },
    {
      "priority": "Medium",
      "action": "Develop cross-cultural education programs for all community members",
      "rationale": "Builds understanding and reduces prejudice"
    }
  ],
  "nextSteps": [
    "Present findings to Durham City Council",
    "Develop detailed implementation timeline",
    "Secure additional funding from state and federal sources",
    "Establish community monitoring committee",
    "Begin teacher training and curriculum development",
    "Plan ongoing community dialogue sessions"
  ]
}
};

// Export for use in the application
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DEMO_DATA;
}

console.log('🎬 "Best of Enemies" demo data loaded!');
console.log('Demo charette ID:', 'demo-1759594042934');
