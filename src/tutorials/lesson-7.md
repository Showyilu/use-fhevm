Excellent ⚙️ — you’ve now mastered the full suite of confidential smart contracts.

Now it’s time to peek **under the hood** of what actually powers them.

Welcome to:

# 🧠 Lesson 7: Inside FHEVM — Gateway, Coprocessor & Input Proofs

---

## 🎯 Goal

By the end of this lesson, you’ll:

✅ Understand the **core architecture** of the Zama FHEVM

✅ See how encrypted transactions flow between the  **Gateway** ,  **Coprocessor** , and **Relayer**

✅ Learn what **Input Proofs** and **ACL (Access Control Lists)** do

✅ Know how to design contracts that interact securely with the FHEVM runtime

---

## 🧩 1. Why FHEVM Exists

Smart contracts normally operate on  **public data** .

FHEVM (Fully Homomorphic Encryption Virtual Machine) extends the EVM so it can execute **encrypted arithmetic** — addition, subtraction, multiplication, division — directly  **on ciphertexts** .

So, instead of:

```solidity
uint64 balance = balances[msg.sender];
balance += 100;
```

You can do:

```solidity
euint64 balance = balances[msg.sender];
balance = balance + encryptedAmount;
```

The blockchain never sees the real value of `balance`.

---

## ⚙️ 2. FHEVM Architecture Overview

```
          ┌────────────────────────────────────────┐
          │              FHEVM Runtime              │
          │────────────────────────────────────────│
          │                                        │
User Tx → │  Gateway  ──▶  Coprocessor  ──▶  Relayer│
          │                                        │
          │────────────────────────────────────────│
          │         Host Smart Contract Layer       │
          │ (e.g. ConfidentialFungibleToken.sol)    │
          └────────────────────────────────────────┘
```

### Components:

| Component               | Role                                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| **Gateway**       | On-chain entry point. Receives encrypted inputs, verifies signatures, dispatches to contracts. |
| **Coprocessor**   | Off-chain FHE computation engine that performs encrypted math using user keys.                 |
| **Relayer**       | Middleware that returns computation results from Coprocessor → Gateway.                       |
| **Host Contract** | On-chain Solidity code that uses encrypted data (e.g., CFT, Swap, Vesting).                    |

---

## 🔐 3. Gateway in Detail

The **Gateway** contract handles:

* Registration of encrypted inputs
* Verification that ciphertexts are valid
* Association of ciphertexts with users’ **Access Control Lists (ACLs)**

When you call:

```solidity
confidentialTransfer(to, encryptedAmount, inputProof)
```

The Gateway:

1. Verifies the **inputProof** against ACL rules (proving you own the ciphertext).
2. Passes the encrypted input to the **Coprocessor** for computation.
3. Records the pending result event.

---

## 🧮 4. Coprocessor (The FHE Engine)

This is the real “math brain” of FHEVM.

* Operates **off-chain** but in a **verifiable** way.
* Uses **homomorphic encryption keys** to compute on ciphertexts without decrypting.
* Signs results with its  **FHE public key** , then sends them back via the Relayer.

Example:

```
Input: Enc(5), Enc(10)
Compute: Enc(5 + 10)
Output: Enc(15)
```

You never see the plaintext — even the Coprocessor doesn’t.

---

## 🔁 5. Relayer

Once computation finishes:

* The Relayer packages results into a **proof-of-result** transaction.
* Sends it back to the Gateway.
* The Gateway updates the encrypted state in your contract (balances, reserves, etc.).

In short:

> Gateway = entry point
>
> Coprocessor = calculator
>
> Relayer = messenger

---

## 📜 6. Input Proofs Explained

### What they are:

An **Input Proof** is a cryptographic proof that you are allowed to use a given encrypted amount (ciphertext) on-chain.

It ensures:

* You can’t reuse ciphertexts from others.
* You can only operate on data you encrypted or were authorized for.

### Example call:

```solidity
confidentialTransfer(address to, externalEuint64 encryptedAmount, bytes inputProof)
```

Here:

* `encryptedAmount` = ciphertext (e.g., Enc(1000))
* `inputProof` = proof that the sender owns that ciphertext in the ACL

If you omit the proof, you must already be authorized:

```solidity
confidentialTransfer(to, euint64 amount);
```

---

## 🗝️ 7. Access Control List (ACL)

The ACL defines **who can decrypt or use** each encrypted value.

For example:

* The owner can transfer, decrypt, or reveal amounts.
* The gateway and coprocessor have “execution” access.
* Auditors or designated addresses can have decryption rights for compliance.

It’s what enforces:

> “Only authorized addresses can see or manipulate a ciphertext.”

---

## 🧰 8. Typical FHEVM Execution Flow

Here’s a step-by-step trace:

```
1. User encrypts inputs using their FHE public key
2. User submits tx with ciphertext + inputProof to Gateway
3. Gateway verifies inputProof (ownership)
4. Gateway calls host contract (e.g., CFT)
5. Host contract sends encrypted operation to Coprocessor
6. Coprocessor computes FHE arithmetic (add, mul, etc.)
7. Coprocessor signs result → sends via Relayer
8. Gateway updates contract’s encrypted state
9. Optional: Authorized party decrypts using ACL permissions
```

Everything remains encrypted end-to-end.

---

## ⚡ 9. Example — Confidential Transfer Lifecycle

**Note:** In practice, you use the `@zama-fhe/relayer-sdk` to handle encryption/decryption automatically.

```
User Wallet
  ↓
Encrypt(500) using relayer-SDK
  ↓
Send tx → Gateway.confidentialTransfer()
  ↓
Gateway verifies proof, logs task
  ↓
Coprocessor: computes new encrypted balances
  ↓
Relayer: submits signed result
  ↓
Contract updates encrypted balance
  ↓
Decrypt (if authorized) using relayer-SDK
```

At no point does anyone see `500` in plaintext on-chain.

**SDK Integration:**
```typescript
import { createRelayerClient } from "@zama-fhe/relayer-sdk";

const relayer = await createRelayerClient({ chainId: 11155111 }); // Sepolia
const encrypted = await relayer.encrypt64(500n);
// ... use in transaction ...
const decrypted = await relayer.decrypt64(encryptedBalance);
```

---

## 🧩 10. Developer Tips

✅ Always use **matching encryption keys** from the FHEVM SDK.

✅ Prefer `externalEuint64` with `inputProof` for untrusted callers.

✅ For internal logic, `euint64` (ACL-verified) is simpler.

✅ Watch for **type mismatches** (e.g., 32-bit vs 64-bit encrypted integers).

✅ To debug, temporarily log decrypted results in a **local devnet** only.

---

## 🧭 11. Recap

| Concept               | Description                                         |
| --------------------- | --------------------------------------------------- |
| **Gateway**     | On-chain router that authenticates encrypted inputs |
| **Coprocessor** | Off-chain FHE compute engine                        |
| **Relayer**     | Bridge returning results back to Gateway            |
| **Input Proof** | Cryptographic proof that user owns ciphertext       |
| **ACL**         | Permission registry defining who can access/decrypt |
| **Result**      | On-chain encrypted state updated after computation  |
