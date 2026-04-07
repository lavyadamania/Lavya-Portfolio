/** Featured & portfolio projects — sourced from github.com/lavyadamania */
export const projects = [
  {
    id: 'verdex',
    title: 'VerDex',
    category: 'Full Stack',
    description:
      'Court transparency and justice accountability: real-time case tracking, delay detection, and auditability powered by MongoDB, Redis, and AI.',
    longDescription:
      'VerDex is a full-stack platform for court transparency and justice accountability. It delivers real-time court case tracking, delay detection, and accountability workflows backed by MongoDB and Redis, with optional Google Gemini for AI-assisted features. The stack includes a React + Vite SPA (Victims Portal, public dashboard, admin), a Node.js + Express API with BullMQ workers, role-based access control, and Docker Compose for local MongoDB and Redis.',
    tags: [
      'React',
      'Vite',
      'Node.js',
      'Express',
      'MongoDB',
      'Redis',
      'Docker',
      'AI',
    ],
    github: 'https://github.com/lavyadamania/VerDex',
    live: 'https://github.com/lavyadamania/VerDex',
    featured: true,
    image: null,
  },
  {
    id: 'voteunity',
    title: 'VoteUnity',
    category: 'Full Stack',
    description:
      'Blockchain-style democratic voting prototype with identity checks, basic face authentication, and hash audit for tamper resistance.',
    longDescription:
      'VoteUnity (DemoChain) is a college mini-project prototype of a blockchain-enabled democratic online voting system. It uses simulated identity verification, basic face authentication, and a blockchain-style hash audit trail to limit duplicate voting and surface tampering—aimed at improving transparency and trust in digital voting.',
    tags: ['PHP', 'Blockchain', 'Security', 'Voting', 'Vercel'],
    github: 'https://github.com/lavyadamania/VoteUnity',
    live: 'https://vote-unity.vercel.app',
    featured: true,
    image: null,
  },
  {
    id: 'hierarchical-marl-corruption-control',
    title: 'Hierarchical MARL Corruption Control',
    category: 'Backend',
    description:
      'Seven-agent DQN multi-agent RL for institutional corruption control with hybrid state space and stable equilibrium convergence.',
    longDescription:
      'Hierarchical Multi-Agent Reinforcement Learning system for institutional corruption control. Implements a 7-agent DQN architecture with target-seeking behavior, a novel hybrid state space design, and physics-adaptive configuration—demonstrating stable equilibrium convergence in the 20–80% range.',
    tags: ['Python', 'DQN', 'Multi-Agent RL', 'Simulation', 'Research'],
    github:
      'https://github.com/lavyadamania/Hierarchical-MARL-Corruption-Control',
    live: 'https://lavyadamania.github.io/Hierarchical-MARL-Corruption-Control/',
    featured: true,
    image: null,
  },
]
