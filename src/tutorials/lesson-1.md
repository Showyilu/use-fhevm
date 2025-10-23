**`ConfidentialFungibleToken` (CFT)** is one of the most exciting pieces of the **Zama FHEVM + OpenZeppelin Confidential Contracts** ecosystem.

Let’s build your understanding  **step-by-step** , from  **beginner → intermediate → developer level** .

# 🧱 Lesson 1: Understand **`ConfidentialFungibleToken` (CFT)**

---

## 🧩 1. What is `ConfidentialFungibleToken`?

It’s a **fungible token (like ERC-20)** but with **Fully Homomorphic Encryption (FHE)** built in.

This means **all balances and transfer amounts are encrypted** — even though everything still happens  **on-chain** .

So, unlike normal ERC-20s:

* The blockchain  **knows transactions happened** , but  **not the transferred amounts** .
* Only authorized parties (e.g. the sender, receiver, or auditor) can  **decrypt balances** .
* Computation (addition/subtraction) happens **on encrypted data** using the  **Zama fhEVM** .

---

## 🧠 2. Core Idea: Encrypted Balances + Encrypted Arithmetic

| Concept         | Normal ERC-20     | ConfidentialFungibleToken                   |
| --------------- | ----------------- | ------------------------------------------- |
| Balance storage | `uint256`       | `euint64`(encrypted 64-bit integer)       |
| Transfer amount | visible in tx     | encrypted ciphertext                        |
| Computation     | clear arithmetic  | FHE arithmetic (add/sub without decrypting) |
| Privacy         | none              | full confidentiality of amounts             |
| Compatibility   | ERC-20 compatible | extends ERC-20 logic with FHE               |

---

## ⚙️ 3. Architecture Overview

CFT is part of the  **Zama FHEVM architecture** :

```
User (Wallet w/ FHE key)
   ↓  (encrypted tx)
Gateway  ←→  Coprocessor  ←→  Host Contract (CFT)
                          ↑
                       Relayer
```

* **Gateway** : Entry point for encrypted transactions.
* **Coprocessor** : Off-chain engine that does FHE math (like “secure calculator”).
* **Relayer** : Brings encrypted computation results back on-chain.
* **Host Contract (CFT)** : Handles token logic and interacts with encrypted data.

---

## 💡 4. Key Features

| Feature                         | Description                                                        |
| ------------------------------- | ------------------------------------------------------------------ |
| 🔒**Encrypted Balances**  | `confidentialBalanceOf(address)`returns `euint64`              |
| 🕵️**Private Transfers** | `confidentialTransfer()`hides transfer amounts                   |
| 🤝**Operators**           | Delegate transfers via `setOperator()`                           |
| 🪄**Transfer and Call**   | `confidentialTransferAndCall()`triggers receiver callbacks       |
| 🧾**Disclosure**          | `discloseEncryptedAmount()`allows public decryption (optional)   |
| 🧱**ERC-20 Wrapper**      | `ConfidentialFungibleTokenERC20Wrapper`bridges to normal ERC-20s |
| 🗳️**Voting Extension**  | `ConfidentialFungibleTokenVotes`adds encrypted governance        |

---

## 🔍 5. Important Functions

| Function                                                     | Purpose                           |
| ------------------------------------------------------------ | --------------------------------- |
| `confidentialBalanceOf(address)`                           | Get encrypted balance             |
| `confidentialTotalSupply()`                                | Total encrypted supply            |
| `confidentialTransfer(to, encryptedAmount, proof)`         | Confidential transfer             |
| `setOperator(operator, until)`                             | Authorize delegate transfers      |
| `discloseEncryptedAmount(encryptedAmount)`                 | Start decryption (off-chain)      |
| `finalizeDiscloseEncryptedAmount(requestId, amount, sigs)` | Complete decryption               |
| `_mint() / _burn()`                                        | Internal FHE mint/burn            |
| `_transfer()`                                              | Internal encrypted transfer logic |

---

## 🧩 6. Example: Transfer Flow (Simplified)

```solidity
// Assume Alice wants to send Bob 10 tokens confidentially

// Step 1: Alice encrypts amount = 10 → encryptedAmount
// Step 2: Alice sends tx to contract:
confidentialTransfer(bob, encryptedAmount, inputProof)

// Step 3: Gateway validates inputProof
// Step 4: Coprocessor computes new encrypted balances
// Step 5: Relayer commits results back to contract
// Step 6: On-chain contract updates encrypted balances
```

👉 All without revealing “10”.

---

## 🧰 7. How to Build One Yourself

### Install dependencies

```bash
npm install @openzeppelin/confidential-contracts
```

### Import

```solidity
import "@openzeppelin/confidential-contracts/token/ConfidentialFungibleToken.sol";
```

### Example Contract

```solidity
pragma solidity ^0.8.20;

import "@openzeppelin/confidential-contracts/token/ConfidentialFungibleToken.sol";

contract MyPrivateToken is ConfidentialFungibleToken {
    constructor()
        ConfidentialFungibleToken("PrivateCoin", "PRV", "ipfs://token-metadata")
    {}
}
```

Then deploy on a **local Hardhat network** for testing, or on an **FHEVM-compatible network** (like Zama's devnet) for production.

---

## 🧮 8. Extensions

| Extension                                       | Purpose                                |
| ----------------------------------------------- | -------------------------------------- |
| **ConfidentialFungibleTokenERC20Wrapper** | Wraps ERC-20 ↔ Confidential token     |
| **ConfidentialFungibleTokenVotes**        | Enables confidential governance/voting |
| **ConfidentialFungibleTokenUtils**        | Library for safe transfer callbacks    |

---

## 🧠 9. Key Takeaways

* Built on  **Zama fhEVM** , not standard EVM.
* **All arithmetic is homomorphic** (no decryption required for logic).
* Ideal for:  **Confidential payrolls, DeFi privacy, private DAOs** .
* You can use the **Wrapper** to make any ERC-20 token confidential.

---

## 🚀 10. Learn Next

Here’s your recommended learning order:

| Week | Topic                                                        |
| ---- | ------------------------------------------------------------ |
| 1    | 🔹 FHE basics + FHEVM architecture                           |
| 2    | 🔹 Understanding `ConfidentialFungibleToken`               |
| 3    | 🔹 Building and testing a Confidential Token                 |
| 4    | 🔹 Wrapping ERC-20s into Confidential Tokens                 |
| 5    | 🔹 Using Zama Coprocessor locally                            |
| 6    | 🔹 Advanced topics (Confidential DeFi, Governance, Auditing) |
