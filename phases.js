const PHASES = [
  {
    id: 'introduction',
    name: 'Introduction',
    description: 'Welcome participants and establish context',
    conversationTypes: [
      'Icebreaker discussions',
      'Project overview presentations',
      'Goal setting conversations'
    ],
    orchestrators: ['project_manager'],
    activities: [
      'Welcome participants',
      'Review agenda and objectives',
      'Establish ground rules',
      'Share participant backgrounds'
    ]
  },
  {
    id: 'data_collection',
    name: 'Data Collection',
    description: 'Gather initial information and perspectives',
    conversationTypes: [
      'Stakeholder interviews',
      'Information sharing sessions',
      'Context mapping discussions'
    ],
    orchestrators: ['analyst', 'project_manager'],
    activities: [
      'Collect existing data and documents',
      'Interview key stakeholders',
      'Map current state and processes',
      'Identify initial constraints'
    ]
  },
  {
    id: 'analysis',
    name: 'Analysis',
    description: 'Explore constraints and assumptions using reasoning algorithms',
    conversationTypes: [
      'Constraint identification',
      'Assumption testing',
      'Root cause analysis',
      'Impact assessment discussions'
    ],
    orchestrators: ['analyst'],
    activities: [
      'Analyze constraints and assumptions',
      'Apply reasoning algorithms',
      'Identify patterns and themes',
      'Prioritize key issues'
    ]
  },
  {
    id: 'ideation',
    name: 'Ideation',
    description: 'Generate creative solutions and ideas',
    conversationTypes: [
      'Brainstorming sessions',
      'Solution generation workshops',
      'Creative thinking exercises'
    ],
    orchestrators: ['project_manager', 'analyst'],
    activities: [
      'Brainstorm potential solutions',
      'Encourage diverse perspectives',
      'Build on participant ideas',
      'Document creative concepts'
    ]
  },
  {
    id: 'synthesis',
    name: 'Synthesis',
    description: 'Combine findings and develop recommendations',
    conversationTypes: [
      'Consensus building',
      'Priority setting discussions',
      'Recommendation development'
    ],
    orchestrators: ['analyst', 'project_manager'],
    activities: [
      'Synthesize ideas and findings',
      'Develop actionable recommendations',
      'Create implementation roadmap',
      'Address remaining concerns'
    ]
  },
  {
    id: 'reporting',
    name: 'Reporting',
    description: 'Generate final report and next steps',
    conversationTypes: [
      'Findings presentation',
      'Action planning sessions',
      'Feedback and refinement'
    ],
    orchestrators: ['project_manager'],
    activities: [
      'Compile final report',
      'Present key findings',
      'Outline implementation plan',
      'Plan follow-up actions'
    ]
  }
];

const REASONING_ALGORITHMS = {
  constraintAnalysis: {
    name: 'Constraint Analysis',
    description: 'Identify and categorize constraints affecting the project',
    inputs: ['participant_feedback', 'data_sources', 'stakeholder_input'],
    outputs: ['constraint_categories', 'impact_assessments', 'priority_ranking'],
    process: [
      'Extract constraint mentions from chat',
      'Categorize by type (technical, resource, organizational, etc.)',
      'Assess impact and feasibility',
      'Rank by importance and urgency'
    ]
  },
  assumptionTesting: {
    name: 'Assumption Testing',
    description: 'Challenge and validate underlying assumptions',
    inputs: ['stated_assumptions', 'evidence_sources', 'expert_opinions'],
    outputs: ['validated_assumptions', 'risk_assessments', 'alternative_scenarios'],
    process: [
      'Identify explicit and implicit assumptions',
      'Gather evidence for validation',
      'Test assumptions against data',
      'Develop contingency plans'
    ]
  },
  patternRecognition: {
    name: 'Pattern Recognition',
    description: 'Identify recurring themes and patterns in discussions',
    inputs: ['chat_messages', 'participant_responses', 'session_notes'],
    outputs: ['theme_clusters', 'trend_analysis', 'insight_summaries'],
    process: [
      'Analyze message content for keywords',
      'Group similar ideas and concerns',
      'Identify emerging patterns',
      'Generate thematic summaries'
    ]
  }
};

const ROLES = {
  analyst: {
    name: 'Analyst',
    responsibilities: [
      'Lead analysis and reasoning sessions',
      'Facilitate constraint and assumption exploration',
      'Apply analytical frameworks and algorithms',
      'Synthesize complex information',
      'Guide evidence-based decision making'
    ],
    skills: ['data_analysis', 'critical_thinking', 'facilitation', 'synthesis']
  },
  project_manager: {
    name: 'Project Manager',
    responsibilities: [
      'Manage overall charette process',
      'Coordinate between phases',
      'Facilitate group discussions',
      'Ensure participant engagement',
      'Drive action and implementation'
    ],
    skills: ['project_management', 'facilitation', 'communication', 'leadership']
  }
};

module.exports = {
  PHASES,
  REASONING_ALGORITHMS,
  ROLES
};
