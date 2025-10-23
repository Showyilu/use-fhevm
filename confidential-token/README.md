# Confidential Token - FHEVM Smart Contracts

This project contains working smart contract examples for Zama's FHEVM (Fully Homomorphic Encryption Virtual Machine), demonstrating confidential tokens, DeFi primitives, and governance.

## 📚 What's Included

This Hardhat 3 project includes:

- **Confidential Tokens**: ERC20-like tokens with encrypted balances
- **Token Wrapping**: Convert public ERC20s to confidential assets
- **Confidential DeFi**: AMM swaps with encrypted reserves
- **Confidential Governance**: Private voting with encrypted tallies
- **TypeScript Scripts**: Modern deployment and interaction scripts using `viem`
- **Relayer SDK Integration**: Client-side encryption/decryption support

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 22.10.0 (required by Hardhat 3)
- npm or yarn

### Installation

```shell
npm install
```

### Compile Contracts

```shell
npx hardhat compile
```

### Start Local Node

In a separate terminal:

```shell
npx hardhat node
```

### Deploy Contracts

Deploy to localhost:

```shell
npx hardhat run scripts/deploy.ts --network localhost
```

## 📝 Available Contracts

- **MyPrivateToken**: Basic confidential ERC20 token
- **TokenB**: Second token for swap examples
- **MockUSDC**: Mock ERC20 for wrapping examples
- **MyConfidentialUSDC**: Wrapper contract for ERC20 → Confidential
- **ConfidentialSwap**: Simple AMM with encrypted reserves
- **MyPrivateGovToken**: Governance token with voting power
- **ConfidentialGovernor**: DAO contract with encrypted votes

## 💻 Available Scripts

- `scripts/deploy.ts` - Deploy MyPrivateToken
- `scripts/deploy-mock.ts` - Deploy MockUSDC and wrapper
- `scripts/wrap.ts` - Wrap ERC20 to confidential
- `scripts/deploy-swap.ts` - Deploy swap and tokens
- `scripts/add-liquidity.ts` - Add liquidity to swap
- `scripts/swap.ts` - Execute a swap
- `scripts/deploy-governance.ts` - Deploy governance contracts

## ⚠️ Important Notes

**FHE Operations Require FHEVM Environment:**
- Standard Hardhat localhost does NOT support FHE operations
- Contracts will compile, but FHE operations (encrypt, decrypt, arithmetic) will fail
- For full functionality, deploy to **Sepolia testnet with FHEVM support**

**What Works on Localhost:**
- ✅ Compiling contracts
- ✅ Deploying non-FHE contracts (MockUSDC, etc.)
- ✅ Reading contract state

**What Requires Sepolia:**
- ❌ Deploying contracts with FHE constructors
- ❌ Encrypted transfers
- ❌ Encrypted arithmetic operations
- ❌ Client-side encryption/decryption

### Deploy to Sepolia Testnet

1. Get Sepolia ETH from a faucet
2. Set environment variables:
   ```shell
   export SEPOLIA_RPC_URL="your_rpc_url"
   export SEPOLIA_PRIVATE_KEY="your_private_key"
   ```
3. Deploy:
   ```shell
   npx hardhat run scripts/deploy-swap.ts --network sepolia
   ```

## 🔗 Resources

- [Zama FHEVM Docs](https://docs.zama.ai/fhevm)
- [OpenZeppelin Confidential Contracts](https://github.com/OpenZeppelin/openzeppelin-confidential-contracts)
- [Relayer SDK](https://github.com/zama-ai/relayer-sdk)
- [Hardhat 3 Docs](https://hardhat.org/hardhat-runner/docs/getting-started)

## 📝 License

MIT
