# useFhevm

An interactive web platform and comprehensive tutorial series for learning Zama's Fully Homomorphic Encryption Virtual Machine (FHEVM) and building confidential smart contracts.

## 🌟 Overview

**useFhevm** is a full-featured educational platform that teaches developers how to build privacy-preserving smart contracts using Fully Homomorphic Encryption (FHE). The platform combines:

- 💻 **Interactive Web Interface**: Beautiful, responsive tutorial browser with syntax highlighting
- 📚 **7 Progressive Lessons**: From beginner to advanced, covering tokens, DeFi, and governance
- 🔧 **Working Code Examples**: Production-ready contracts and deployment scripts
- ⚡ **Modern Tech Stack**: React + Vite for frontend, Hardhat 3 + TypeScript for contracts

## 📚 What's Included

### Web Interface (`/src`)
- **Tutorial Viewer**: Markdown-based lessons with syntax highlighting
- **Navigation**: Lesson sidebar, prev/next navigation, difficulty badges
- **Responsive Design**: shadcn/ui components with Tailwind CSS
- **Pages**: Home, Explore, Learn, Build, Jobs, Tutorials

### Smart Contracts (`/confidential-token`)
- **7 Verified Lessons**: All tested and working
- **Multiple Contracts**: Tokens, wrappers, AMM, governance
- **TypeScript Scripts**: Deployment and interaction examples
- **Hardhat 3 Setup**: Modern development environment with viem

## 🌐 Live Demo

Visit the live tutorial platform: **[usefhevm.xyz](https://usefhevm.xyz)**

Or run it locally by following the instructions below.

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 22.10.0 (LTS version required by Hardhat)
- npm or yarn
- Git

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd use-fhevm

# Install dependencies for the web interface
npm install

# Start the development server
npm run dev
```

### Working with Smart Contracts

```sh
# Navigate to the contracts directory
cd confidential-token

# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Start local Hardhat node (in separate terminal)
npx hardhat node

# Deploy to localhost
npx hardhat run scripts/deploy.ts --network localhost
```

## ✨ Features

### Web Platform
- 🎨 **Beautiful UI**: Modern, dark-themed interface with smooth animations
- 📝 **Markdown Rendering**: Rich tutorial content with GitHub-style code highlighting
- 🏷️ **Difficulty Badges**: Clear indicators for beginner/intermediate/advanced lessons
- ⏱️ **Time Estimates**: Know how long each lesson takes
- 🔍 **Tag System**: Filter and find lessons by topic
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile

### Development Environment
- ✅ **Verified Contracts**: All contracts compile and are tested
- 🔒 **FHE Operations**: Proper use of encrypted arithmetic (add, sub, mul)
- 📦 **Relayer SDK**: Integrated `@zama-fhe/relayer-sdk` for encryption
- 🌐 **Sepolia Ready**: Instructions for testnet deployment
- 📚 **Well Documented**: Comments and explanations throughout

## 📖 Tutorial Lessons

| Lesson | Title | Difficulty | Duration | Topics |
|--------|-------|------------|----------|--------|
| **1** | Understanding Confidential Fungible Tokens | Beginner | 30 min | fhevm, tokens, encryption, basics |
| **2** | Building & Deploying Your First CFT | Beginner | 45 min | deployment, hardhat, smart-contracts |
| **3** | Wrapping ERC-20 into Confidential Tokens | Intermediate | 40 min | erc20, wrapper, interoperability |
| **4** | Confidential DeFi Primitives | Intermediate | 50 min | defi, amm, swap, liquidity |
| **5** | Confidential Governance & Voting | Intermediate | 35 min | governance, voting, dao |
| **6** | Confidential Finance & Vesting | Advanced | TBD | 🚧 **TODO** |
| **7** | FHEVM Architecture Deep Dive | Advanced | 60 min | gateway, coprocessor, architecture |

## 🛠 Technologies Used

### Web Interface
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Smart Contracts
- Hardhat 3
- Solidity 0.8.28
- TypeScript
- Viem
- @openzeppelin/confidential-contracts
- @fhevm/solidity
- @zama-fhe/relayer-sdk

## 🌐 Deployment

### Deploy to Sepolia Testnet

1. Get Sepolia ETH from a faucet
2. Set environment variables:
   ```sh
   export SEPOLIA_RPC_URL="your_rpc_url"
   export SEPOLIA_PRIVATE_KEY="your_private_key"
   ```
3. Deploy contracts:
   ```sh
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

## 📁 Project Structure

```
use-fhevm/
├── src/                      # Web application source
│   ├── components/         # React components
│   ├── pages/              # Route pages (Home, Tutorials, etc.)
│   ├── data/               # Tutorial metadata
│   ├── tutorials/          # Markdown tutorial files
│   └── App.tsx             # Main app component
├── confidential-token/     # Smart contracts workspace
│   ├── contracts/          # Solidity contracts
│   ├── scripts/            # Deployment scripts
│   ├── hardhat.config.ts   # Hardhat configuration
│   └── package.json        # Contract dependencies
├── public/                 # Static assets
├── package.json            # Web app dependencies
└── vite.config.ts          # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs**: Open an issue describing the problem
2. **Suggest Features**: Share ideas for new lessons or features
3. **Submit PRs**: Fix bugs, improve docs, or add new tutorials
4. **Share Feedback**: Let us know how we can improve

### Adding a New Lesson

1. Create markdown file in `src/tutorials/lesson-X.md`
2. Add entry to `src/data/tutorials.ts`
3. Create contracts in `confidential-token/contracts/`
4. Write deployment scripts
5. Test everything compiles and works
6. Submit PR with description

## 👥 Community

- [Zama Discord](https://discord.gg/zama)
- [FHEVM Docs](https://docs.zama.ai/fhevm)
- [GitHub Discussions](https://github.com/zama-ai/fhevm/discussions)

## 📝 License

MIT

## 🚀 Built With

- [Zama FHEVM](https://www.zama.ai/fhevm) - Fully Homomorphic Encryption VM
- [Hardhat](https://hardhat.org/) - Ethereum development environment
- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

**Made with ❤️ for the privacy-preserving blockchain community**
