Excellent 🙌 — here’s  **Lesson 2: Building and Deploying a Confidential Fungible Token (CFT) on FHEVM** .

This lesson turns your theoretical knowledge into  **practical deployment experience** .

---

# 🧱 Lesson 2: Build & Deploy Your First Confidential Fungible Token on FHEVM

---

## 🎯 Goal

By the end of this lesson, you’ll:

✅ Deploy your own **ConfidentialFungibleToken** (`MyPrivateToken.sol`)

✅ Understand the **FHEVM + Coprocessor workflow**

✅ Execute encrypted mint & transfer operations

✅ Reveal and verify decrypted results on-chain

---

## 🧩 1. Prerequisites

You'll need:

* **Node.js ≥ 22.10.0** (LTS version required by Hardhat)
* **npm or pnpm**
* **Git**
* **Hardhat**
* **Zama FHEVM SDK**
* A text editor (VS Code recommended)

Check your setup:

```bash
node -v  # Should show v22.10.0 or higher
npm -v
npx hardhat --version
```

**⚠️ Important**: Hardhat requires Node.js 22.10.0 or a later LTS version. If you're using an older version, upgrade using:

```bash
# Using nvm (recommended)
nvm install 22
nvm use 22

# Or download from https://nodejs.org/
```

---

## ⚙️ 2. Initialize the Project

```bash
mkdir confidential-token && cd confidential-token
npm init -y
npm install --save-dev hardhat
npx hardhat --init
```

Select the following options when prompted:

```
✔ Which version of Hardhat would you like to use? · hardhat-3
✔ Where would you like to initialize the project? · . (current directory)
✔ What type of project would you like to initialize? · node-test-runner-viem
✔ Would you like to change "./package.json" to turn your project into ESM? · true
```

This will create the basic Hardhat project structure as an ESM (ECMAScript Modules) project with `hardhat.config.js`.

Install the required Hardhat dependencies:

```bash
npm install --save-dev "@nomicfoundation/hardhat-toolbox-viem@^5.0.0" "@nomicfoundation/hardhat-ignition@^3.0.0" "@types/node@^22.8.5" "forge-std@foundry-rs/forge-std#v1.9.4" "typescript@~5.8.0" "viem@^2.30.0"
```

Now install the FHEVM dependencies:

```bash
npm install --save-dev @openzeppelin/contracts @openzeppelin/confidential-contracts @fhevm/solidity@0.7.0
```

The generated `hardhat.config.ts` comes with a comprehensive configuration. You can use it as-is for local development, or optionally add network configurations for FHEVM devnet later when deploying to production.

---

## 📜 3. Write Your Confidential Token Contract

Create `contracts/MyPrivateToken.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/confidential-contracts/token/ConfidentialFungibleToken.sol";

contract MyPrivateToken is ConfidentialFungibleToken {
    constructor()
        ConfidentialFungibleToken(
            "PrivateCoin",
            "PRV",
            "ipfs://example-token-metadata"
        )
    {}
}
```

---

## 🧠 4. Compile the Contract

```bash
npx hardhat compile
```

✅ You should see:

```
Compiled 2 Solidity files with solc 0.8.28 (evm target: cancun)
Compiled 1 Solidity file with solc 0.8.28 (evm target: cancun)
```

---

## 🖥️ 5. Start Local Hardhat Network

Before deploying, start a local Hardhat node in a **separate terminal**:

```bash
npx hardhat node
```

This will:

- Start a local Ethereum node at `http://127.0.0.1:8545`
- Create 20 test accounts with 10,000 ETH each
- Show you the account addresses and private keys
- Display all transactions in real-time

Keep this terminal running throughout development. In a new terminal, proceed with deployment.

**💡 Tip**: The local node will reset when you stop it. For persistent state between restarts, you can use Hardhat's network features.

---

## 🚀 6. Deploy to Local Network

First, add a `localhost` network configuration to your `hardhat.config.ts` if not already present:

```typescript
networks: {
  // ... other networks
  localhost: {
    type: "http",
    url: "http://127.0.0.1:8545",
  },
}
```

Create `scripts/deploy.ts`:

```typescript
import { network } from "hardhat";

async function main() {
  console.log("Deploying MyPrivateToken...");
  
  const { viem } = await network.connect({ network: "localhost" });
  const [deployerClient] = await viem.getWalletClients();
  
  console.log("Deploying from:", deployerClient.account.address);
  
  const token = await viem.deployContract("MyPrivateToken");
  
  console.log("MyPrivateToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Run it:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

Output example:

```
Deploying MyPrivateToken...
Deploying from: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
MyPrivateToken deployed to: 0x5fbdb2315678afecb367f032d93f642f64180aa3
```

---

## 💰 7. Mint Tokens Confidentially

**Note:** The `ConfidentialFungibleToken` contract handles minting and transfers with encrypted amounts. However, implementing the full minting workflow with FHE encryption requires additional setup:

1. **FHEVM Gateway/Coprocessor** for encryption/decryption
2. **FHE libraries** for client-side encryption
3. **Key management** for encrypted operations

For a complete working example with encrypted minting, please refer to the [FHEVM documentation](https://docs.zama.ai/fhevm) or check the advanced tutorials in Lesson 4-6.

For now, you've successfully:

- Set up a Hardhat v3 project with TypeScript and viem
- Installed FHEVM dependencies
- Compiled and deployed a confidential token contract

---

## 🦭 8. Recap

| Step | Concept    | What You Achieved                                        |
| ---- | ---------- | -------------------------------------------------------- |
| 1–2 | Setup      | Initialized Hardhat v3 with TypeScript and viem          |
| 3–4 | Contract   | Wrote and compiled `MyPrivateToken`                    |
| 5    | Local Node | Started Hardhat local network                            |
| 6    | Deployment | Deployed confidential token contract using viem          |
| 7    | Next Steps | Learned about FHE encryption requirements for operations |

---

## 🧩 9. What's Next?

Continue with:

### 👉 **Lesson 3: Wrapping ERC-20 into Confidential Tokens**

You’ll learn:

* How to use `ConfidentialFungibleTokenERC20Wrapper`
* Wrap existing ERC-20s into confidential form
* Swap between public ↔ private liquidity
* Build bridges for DeFi privacy
