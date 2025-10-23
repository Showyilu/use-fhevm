export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'tutorial' | 'video' | 'book' | 'podcast' | 'tool' | 'guide' | 'course';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  url: string;
  featured?: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  tags: string[];
  url: string;
  salary?: string;
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Learn Confidential Contracts',
    description: 'Step-by-step tutorial series covering everything from basics to advanced confidential smart contract development with FHEVM.',
    category: 'course',
    difficulty: 'beginner',
    tags: ['tutorial', 'confidential-contracts', 'fhevm', 'series'],
    url: '/tutorials',
    featured: true,
  },
  {
    id: '2',
    title: 'Getting Started with FHEVM',
    description: 'A comprehensive guide to building your first privacy-preserving smart contract using FHEVM technology.',
    category: 'guide',
    difficulty: 'beginner',
    tags: ['fhevm', 'smart-contracts', 'privacy'],
    url: 'https://docs.zama.ai/protocol/solidity-guides/getting-started/quick-start-tutorial',
    featured: true,
  },
  {
    id: '3',
    title: 'Advanced Homomorphic Encryption',
    description: 'Deep dive into the mathematics and implementation of fully homomorphic encryption schemes.',
    category: 'course',
    difficulty: 'advanced',
    tags: ['cryptography', 'mathematics', 'encryption'],
    url: 'https://www.zama.ai/introduction-to-homomorphic-encryption',
    featured: true,
  },
  {
    id: '4',
    title: 'FHEVM Development Tools',
    description: 'Essential tooling and libraries for efficient FHEVM development and testing.',
    category: 'tool',
    difficulty: 'intermediate',
    tags: ['tools', 'development', 'testing'],
    url: 'https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat',
  },
  {
    id: '5',
    title: 'Privacy-First Smart Contracts',
    description: 'Learn best practices for building privacy-preserving decentralized applications.',
    category: 'tutorial',
    difficulty: 'intermediate',
    tags: ['smart-contracts', 'privacy', 'best-practices'],
    url: 'https://github.com/OpenZeppelin/openzeppelin-confidential-contracts',
  },
  {
    id: '6',
    title: 'FHEVM Video Course Series',
    description: '10-hour comprehensive video series covering FHEVM from basics to advanced topics.',
    category: 'video',
    difficulty: 'beginner',
    tags: ['video', 'course', 'comprehensive'],
    url: 'https://www.youtube.com/@zama_fhe',
    featured: true,
  },
  {
    id: '7',
    title: 'The FHEVM Book',
    description: 'Complete reference guide for FHEVM development with real-world examples.',
    category: 'book',
    difficulty: 'intermediate',
    tags: ['book', 'reference', 'examples'],
    url: 'https://docs.zama.ai/protocol/examples',
  },
];

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Engineer, Developer Platform',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Build the Developer Platform Console web experience where developers sign up, manage API keys, view usage, and get to production quickly. Own the UX and frontend architecture of a React/TypeScript app.',
    tags: ['react', 'typescript', 'frontend', 'developer-platform'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/frontend-engineer-developer-platform_paris',
  },
  {
    id: '2',
    title: 'Web3/Oracle Engineer',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Work on blockchain oracle solutions and Web3 integrations for the Zama Protocol, enabling confidential smart contracts using Fully Homomorphic Encryption.',
    tags: ['web3', 'oracle', 'blockchain', 'smart-contracts'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/web3-oracle-engineer_paris',
  },
  {
    id: '3',
    title: 'Senior QA Automation Engineer',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Lead quality assurance and test automation efforts for Zama\'s FHE products. Build robust test frameworks and ensure product reliability.',
    tags: ['qa', 'automation', 'testing', 'quality-assurance'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/senior-qa-automation-engineer_paris',
  },
  {
    id: '4',
    title: 'Principal Platform Engineer',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Lead the technical architecture and development of Zama\'s Developer Platform infrastructure. Design and build scalable systems for FHE computation.',
    tags: ['platform', 'infrastructure', 'architecture', 'systems'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/principal-platform-engineer_paris',
  },
  {
    id: '5',
    title: 'DevRel / Partner Engineer',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Help developers and partners adopt FHEVM technology through technical content, demos, and direct support. Bridge the gap between product and community.',
    tags: ['devrel', 'developer-relations', 'community', 'partnerships'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/devops-site-reliability-engineer_paris_ZAMA_QY0VVjj',
  },
  {
    id: '6',
    title: 'DevOps / Site Reliability Engineer',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Build and maintain reliable infrastructure for Zama\'s production systems. Ensure high availability and performance of FHE services.',
    tags: ['devops', 'sre', 'infrastructure', 'reliability'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/devops-site-reliability-engineer_paris',
  },
  {
    id: '7',
    title: 'Senior Hardware Frontend Engineer',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Design and develop hardware frontend solutions for FHE acceleration. Work on cutting-edge hardware/software co-design for cryptographic operations.',
    tags: ['hardware', 'fpga', 'rtl', 'hardware-acceleration'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/senior-hardware-frontend-engineer_paris',
  },
  {
    id: '8',
    title: 'Hardware Verification Lead',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Lead hardware verification efforts for FHE accelerator designs. Develop verification strategies and ensure hardware quality.',
    tags: ['verification', 'hardware', 'testing', 'validation'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/hardware-verification-lead_paris',
  },
  {
    id: '9',
    title: 'Developer Experience Engineer',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Improve developer experience for blockchain developers using Zama Protocol. Provide technical support and gather feedback to enhance the product.',
    tags: ['developer-experience', 'support', 'blockchain', 'dx'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/support-engineer_paris',
  },
  {
    id: '10',
    title: 'Solana Engineer, Zama Protocol',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Build and integrate Zama Protocol with Solana blockchain. Develop confidential smart contract capabilities for the Solana ecosystem.',
    tags: ['solana', 'rust', 'blockchain', 'protocol'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/solana-engineer-zama-protocol_paris',
  },
  {
    id: '11',
    title: 'Software Engineer, MPC',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Work on Multi-Party Computation (MPC) protocols for the Zama Protocol. Implement secure cryptographic protocols for privacy-preserving computation.',
    tags: ['mpc', 'cryptography', 'protocols', 'privacy'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/software-engineer-zama-protocol_paris_ZAMA_omW3YkL',
  },
  {
    id: '12',
    title: 'Senior Legal Counsel',
    company: 'Zama',
    location: 'Paris',
    type: 'full-time',
    description: 'Provide legal counsel for Zama\'s operations, including commercial agreements, regulatory compliance, and intellectual property matters in the blockchain and cryptography space.',
    tags: ['legal', 'compliance', 'contracts', 'operations'],
    url: 'https://jobs.zama.ai/companies/zama/jobs/senior-legal-counsel_paris',
  },
];
