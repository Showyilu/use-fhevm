export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  tags: string[];
  filename: string;
}

export const tutorials: Tutorial[] = [
  {
    id: 'lesson-1',
    title: 'Understanding Confidential Fungible Tokens',
    description: 'Learn the fundamentals of ConfidentialFungibleToken (CFT), encrypted balances, and FHE arithmetic on blockchain.',
    difficulty: 'beginner',
    duration: '30 min',
    tags: ['fhevm', 'tokens', 'encryption', 'basics'],
    filename: 'lesson-1.md',
  },
  {
    id: 'lesson-2',
    title: 'Building & Deploying Your First CFT',
    description: 'Deploy your own confidential token on FHEVM, execute encrypted mint and transfer operations.',
    difficulty: 'beginner',
    duration: '45 min',
    tags: ['deployment', 'hardhat', 'smart-contracts', 'hands-on'],
    filename: 'lesson-2.md',
  },
  {
    id: 'lesson-3',
    title: 'Wrapping ERC-20 into Confidential Tokens',
    description: 'Learn how to wrap existing ERC-20 tokens into confidential assets using wrapper contracts.',
    difficulty: 'intermediate',
    duration: '40 min',
    tags: ['erc20', 'wrapper', 'interoperability', 'defi'],
    filename: 'lesson-3.md',
  },
  {
    id: 'lesson-4',
    title: 'Confidential DeFi Primitives',
    description: 'Build confidential swap contracts and understand how encrypted math enables private AMMs.',
    difficulty: 'intermediate',
    duration: '50 min',
    tags: ['defi', 'amm', 'swap', 'liquidity'],
    filename: 'lesson-4.md',
  },
  {
    id: 'lesson-5',
    title: 'Advanced Access Control & Operators',
    description: 'Master operator delegation, access control lists, and permission management in confidential contracts.',
    difficulty: 'intermediate',
    duration: '35 min',
    tags: ['access-control', 'operators', 'permissions', 'security'],
    filename: 'lesson-5.md',
  },
  {
    id: 'lesson-6',
    title: 'Confidential Governance & Voting',
    description: 'Implement privacy-preserving voting mechanisms and confidential governance systems.',
    difficulty: 'advanced',
    duration: '55 min',
    tags: ['governance', 'voting', 'dao', 'advanced'],
    filename: 'lesson-6.md',
  },
  {
    id: 'lesson-7',
    title: 'Production Best Practices & Security',
    description: 'Learn security considerations, gas optimization, and best practices for production deployments.',
    difficulty: 'advanced',
    duration: '60 min',
    tags: ['security', 'best-practices', 'optimization', 'production'],
    filename: 'lesson-7.md',
  },
];
