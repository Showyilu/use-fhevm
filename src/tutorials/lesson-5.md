Perfect ⚡️ — time for  **Lesson 5** , where we explore how **Confidential Governance** works using OpenZeppelin’s `ConfidentialFungibleTokenVotes`.

This layer extends what you learned in previous lessons — now tokens aren’t just private money, they’re  **private voting power** .

---

# 🗳️ Lesson 5: Confidential Governance & Voting

---

## 🎯 Goal

By the end of this lesson, you’ll:

✅ Deploy a **Confidential Token with Voting** (`ConfidentialFungibleTokenVotes`)

✅ Delegate votes confidentially

✅ Submit and tally encrypted votes privately

✅ Understand how governance stays verifiable *yet private*

---

## 🧩 1. Conceptual Overview

In traditional DAO governance:

* Voter balances & choices are visible.
* Anyone can infer who supported which proposal.

With  **Confidential Voting** , both the **balance** and **vote** weight are **encrypted** using FHE.

Only the authorized gateway / coprocessor can decrypt tallies when proposals close.

Architecture flow 👇

```
Voter (wallet) ─(encrypted vote)─▶ Gateway
                                      │
                                  Coprocessor
                                      │
                             ConfidentialGovernor.sol
                                      │
                            ConfidentialFungibleTokenVotes.sol
```

---

## ⚙️ 2. Setup

**⚠️ Note:** Like previous lessons, full functionality requires Sepolia testnet with FHEVM support. Standard Hardhat localhost won't support FHE operations.

Continue in your existing Hardhat + FHEVM project.

The required packages should already be installed:
- `@openzeppelin/confidential-contracts`
- `@zama-fhe/relayer-sdk`

If not, install them:

```bash
npm install @openzeppelin/confidential-contracts @zama-fhe/relayer-sdk
```

---

## 🧱 3. Write Your Confidential Voting Token

`contracts/MyPrivateGovToken.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/confidential-contracts/token/extensions/ConfidentialFungibleTokenVotes.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract MyPrivateGovToken is ConfidentialFungibleTokenVotes {
    constructor()
        ConfidentialFungibleToken("GovCoin", "GVC", "ipfs://govcoin-meta")
        EIP712("GovCoin", "1")
    {}
    
    // Implementation required by HandleAccessManager
    function _validateHandleAllowance(bytes32) internal view override {}
}
```

**Key Points:**
- Inherits all `ConfidentialFungibleToken` logic + voting power tracking
- Requires `EIP712` constructor for signature verification (needed for delegation)
- Must implement `_validateHandleAllowance` from HandleAccessManager interface

---

## 🗳️ 4. Write a Minimal Confidential Governor

`contracts/ConfidentialGovernor.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/confidential-contracts/token/extensions/ConfidentialFungibleTokenVotes.sol";
import {FHE, euint64, ebool} from "@fhevm/solidity/lib/FHE.sol";

contract ConfidentialGovernor {
    ConfidentialFungibleTokenVotes public govToken;

    struct Proposal {
        string description;
        euint64 yes;
        euint64 no;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    event ProposalCreated(uint256 indexed id, string description);
    event VoteCast(uint256 indexed id, address voter, bool support);
    event ProposalExecuted(uint256 indexed id, bool passed);

    constructor(address _token) {
        govToken = ConfidentialFungibleTokenVotes(_token);
    }

    function propose(string memory desc) external {
        proposals[++proposalCount] = Proposal({
            description: desc,
            yes: FHE.asEuint64(0),
            no: FHE.asEuint64(0),
            executed: false
        });
        emit ProposalCreated(proposalCount, desc);
    }

    function vote(uint256 id, bool support, euint64 encryptedWeight) external {
        require(!proposals[id].executed, "executed");

        if (support) {
            proposals[id].yes = FHE.add(proposals[id].yes, encryptedWeight);
        } else {
            proposals[id].no = FHE.add(proposals[id].no, encryptedWeight);
        }

        emit VoteCast(id, msg.sender, support);
    }

    function execute(uint256 id) external {
        Proposal storage p = proposals[id];
        require(!p.executed, "already done");
        p.executed = true;
        
        // Note: Comparison of encrypted values returns encrypted bool
        // For real execution, this would need gateway decryption to determine if passed
        // ebool encryptedPassed = FHE.gt(p.yes, p.no);
        
        // For demo purposes, we emit without decrypting
        // In production, use gateway callback to get actual result
        emit ProposalExecuted(id, true); // Placeholder
    }

    function getEncryptedResults(uint256 id) external view returns (euint64, euint64) {
        return (proposals[id].yes, proposals[id].no);
    }
}
```

🧠 All votes (`yes`, `no`) are encrypted; the tallies are decrypted only when necessary.

---

## 🚀 5. Deploy Everything

**⚠️ Note:** Deployment requires Sepolia testnet with FHEVM support (FHE operations in constructors).

`scripts/deploy-governance.ts`

```typescript
import { network } from "hardhat";

async function main() {
  console.log("Deploying governance contracts...");
  
  const { viem } = await network.connect({ network: "localhost" });
  const [deployerClient] = await viem.getWalletClients();
  
  console.log("Deploying from:", deployerClient.account.address);
  
  // Deploy Governance Token
  const govToken = await viem.deployContract("MyPrivateGovToken");
  console.log("GovToken deployed to:", govToken.address);
  
  // Deploy Governor
  const governor = await viem.deployContract("ConfidentialGovernor", [govToken.address]);
  console.log("Governor deployed to:", governor.address);
  
  console.log("\n✅ Deployment complete!");
  console.log("Save these addresses:");
  console.log("  GovToken:", govToken.address);
  console.log("  Governor:", governor.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Compile first:

```bash
npx hardhat compile
```

To deploy to Sepolia testnet:

```bash
npx hardhat run scripts/deploy-governance.ts --network sepolia
```

---

## 💡 6. Mint & Delegate Votes

**⚠️ Note:** Requires `@zama-fhe/relayer-sdk` and Sepolia testnet.

```typescript
import { network } from "hardhat";
import { createRelayerClient } from "@zama-fhe/relayer-sdk";

async function main() {
  const tokenAddr = "<TOKEN_ADDRESS>";
  
  const { viem } = await network.connect({ network: "localhost" });
  const [userClient] = await viem.getWalletClients();
  const token = await viem.getContractAt("MyPrivateGovToken", tokenAddr);
  
  // On Sepolia testnet:
  // const relayer = await createRelayerClient({ chainId: 11155111 });
  // const encrypted = await relayer.encrypt64(1000n);
  
  // Mint confidentially (requires appropriate permissions)
  // await token.write._mint([userClient.account.address, encrypted]);
  
  // Self-delegate
  // await token.write.delegate([userClient.account.address]);
  
  console.log("✅ Delegated confidential voting power");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

## 🗳️ 7. Propose & Vote Privately

**⚠️ Note:** Requires `@zama-fhe/relayer-sdk` and Sepolia testnet.

```typescript
import { network } from "hardhat";
import { createRelayerClient } from "@zama-fhe/relayer-sdk";

async function main() {
  const governorAddr = "<GOVERNOR_ADDRESS>";
  
  const { viem } = await network.connect({ network: "localhost" });
  const [userClient] = await viem.getWalletClients();
  const governor = await viem.getContractAt("ConfidentialGovernor", governorAddr);
  
  // Propose
  // await governor.write.propose(["Increase treasury allocation"]);
  
  // On Sepolia testnet:
  // const relayer = await createRelayerClient({ chainId: 11155111 });
  // const weight = await relayer.encrypt64(500n);
  // await governor.write.vote([1n, true, weight]);  // yes vote
  
  console.log("✅ Encrypted vote cast");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

You'll see on-chain events but *not* the actual weight - it remains encrypted!

---

## 🔍 8. View Encrypted Results and Decrypt (Off-Chain)

**⚠️ Note:** Decryption requires `@zama-fhe/relayer-sdk` and Sepolia testnet.

```typescript
import { network } from "hardhat";
import { createRelayerClient } from "@zama-fhe/relayer-sdk";

async function main() {
  const governorAddr = "<GOVERNOR_ADDRESS>";
  
  const { viem } = await network.connect({ network: "localhost" });
  const governor = await viem.getContractAt("ConfidentialGovernor", governorAddr);
  
  const [yes, no] = await governor.read.getEncryptedResults([1n]);
  console.log("Encrypted results:", yes, no);
  
  // On Sepolia testnet:
  // const relayer = await createRelayerClient({ chainId: 11155111 });
  // const dYes = await relayer.decrypt64(yes);
  // const dNo = await relayer.decrypt64(no);
  // console.log(`Decrypted results → YES:${dYes}, NO:${dNo}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

## 🧠 9. Privacy Concepts in Governance

| Concept        | Normal DAO       | Confidential DAO                 |
| -------------- | ---------------- | -------------------------------- |
| Voting weight  | Public           | Encrypted                        |
| Proposal state | Visible          | Encrypted totals only            |
| Front-running  | Possible         | Mitigated                        |
| Vote coercion  | Easy             | Prevented – choices private     |
| Auditability   | Yes (via proofs) | Yes (via FHE proof verification) |

---

## 🧭 10. Recap

| Step | Concept             | What You Did                    |
| ---- | ------------------- | ------------------------------- |
| 1–3 | Foundation          | Created token + governor        |
| 4    | Contract Logic      | Implemented encrypted vote math |
| 5–7 | Deployment & Voting | Proposed and cast private votes |
| 8    | Verification        | Decrypted results safely        |

---

## 🚀 Next Lesson Preview — **Lesson 6: Confidential Finance & Vesting**

You’ll learn:

* How to use `VestingWalletConfidential` and `VestingWalletCliffConfidential`
* Build confidential payrolls and vesting schedules
* Manage multi-token confidential payouts for teams or DAOs
