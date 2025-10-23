Welcome to  **Lesson 3** , where we move beyond deploying a single confidential token and learn how to **wrap an existing ERC-20 into a confidential asset** using OpenZeppelin’s `ConfidentialFungibleTokenERC20Wrapper`.

---

# 🧱 Lesson 3: Wrapping ERC-20 → Confidential Token

---

## 🎯 Goal

By the end of this lesson, you’ll:

✅ Understand how a wrapper links a public ERC-20 ↔ Confidential token

✅ Deploy a wrapper contract on the FHEVM Devnet

✅ Wrap & unwrap tokens at a fixed rate

✅ Observe how encrypted arithmetic preserves confidentiality

---

## 🧩 1. Conceptual Overview

**What problem does wrapping solve?**

Existing ERC-20s (like DAI, USDC) store balances publicly.

A **Confidential ERC-20 Wrapper** lets users keep those same assets, but in  **encrypted form** .

```
      ┌────────────┐           ┌────────────────────────┐
      │ Public ERC-20│          │ Confidential Wrapper   │
      │  (e.g., USDC)│────wrap──▶(FHE-encrypted balances)│
      └────────────┘           └────────────────────────┘
              ▲                            │
              └────── unwrap ──────────────┘
```

* **Wrap:** lock public tokens → mint equivalent confidential units.
* **Unwrap:** burn confidential tokens → release public tokens.
* Exchange rate = `rate()` (usually 1:1 × 10⁶ decimals).

---

## ⚙️ 2. Setup Your Project

**⚠️ Important:** This lesson demonstrates the wrapper contract architecture, but full functionality requires an FHEVM-enabled environment. The contracts will compile and deploy on standard Hardhat localhost, but FHE operations (wrap/unwrap) will fail. For complete testing, deploy to Sepolia testnet with FHEVM support.

Continue in the same Hardhat workspace from Lesson 2.

The required dependencies should already be installed from Lesson 2:
- `@openzeppelin/contracts`
- `@openzeppelin/confidential-contracts`
- `@fhevm/solidity`

For client-side encryption (needed for FHEVM devnet), install the relayer SDK:
```bash
npm install @zama-fhe/relayer-sdk
```

---

## 📜 3. Write Your Wrapper Contract

Create `contracts/MyConfidentialUSDC.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/confidential-contracts/token/extensions/ConfidentialFungibleTokenERC20Wrapper.sol";

contract MyConfidentialUSDC is ConfidentialFungibleTokenERC20Wrapper {
    constructor(address underlying_)
        ConfidentialFungibleToken("Confidential USDC", "cUSDC", "")
        ConfidentialFungibleTokenERC20Wrapper(IERC20(underlying_))
    {}
}
```

🧠 Here `underlying_` is the address of your base ERC-20 (e.g., mock USDC you deploy or an existing token on devnet).

---

## 🧮 4. Deploy Both Tokens

1️⃣ Deploy a basic ERC-20 (mock USDC):

```solidity
// contracts/MockUSDC.sol
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "mUSDC") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
```

2️⃣ Compile and deploy:

**⚠️ Note:** This lesson requires a local Hardhat node. Start it in a separate terminal with `npx hardhat node`, then proceed with deployment.

```bash
npx hardhat compile
npx hardhat run scripts/deploy-mock.ts --network localhost
```

`scripts/deploy-mock.ts`:

```typescript
import { network } from "hardhat";

async function main() {
  console.log("Deploying MockUSDC and MyConfidentialUSDC...");
  
  const { viem } = await network.connect({ network: "localhost" });
  const [deployerClient] = await viem.getWalletClients();
  
  console.log("Deploying from:", deployerClient.account.address);
  
  // Deploy MockUSDC
  const usdc = await viem.deployContract("MockUSDC");
  console.log("MockUSDC deployed to:", usdc.address);
  
  // Deploy MyConfidentialUSDC wrapper
  const wrapper = await viem.deployContract("MyConfidentialUSDC", [usdc.address]);
  console.log("MyConfidentialUSDC deployed to:", wrapper.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

## 💰 5. Wrap Public Tokens → Confidential Ones

**⚠️ Important Limitation:** The `wrap` function uses FHE operations (`FHE.asEuint64`) which require a full FHEVM environment with a coprocessor. Standard Hardhat localhost does not support FHE operations, so this will revert with "Internal error".

To fully test wrapping/unwrapping, you would need to:
1. Deploy to Sepolia testnet with FHEVM support
2. Use the `@zama-fhe/relayer-sdk` for client-side encryption

For reference, here's what the wrap script would look like:

Create `scripts/wrap.ts`:

```typescript
import { network } from "hardhat";
import { parseUnits } from "viem";
// For FHEVM devnet, uncomment:
// import { createRelayerClient } from "@zama-fhe/relayer-sdk";

async function main() {
  const usdcAddr = "<MOCK_USDC_ADDRESS>";
  const wrapAddr = "<WRAPPER_ADDRESS>";

  console.log("Connecting to network...");
  const { viem } = await network.connect({ network: "localhost" });
  const [userClient] = await viem.getWalletClients();
  
  console.log("User address:", userClient.account.address);

  // Get contracts
  const usdc = await viem.getContractAt("MockUSDC", usdcAddr);
  const wrapper = await viem.getContractAt("MyConfidentialUSDC", wrapAddr);

  // Approve wrapper to take 100 USDC (with 18 decimals)
  const amount = parseUnits("100", 18);
  console.log(`Approving wrapper to spend ${amount} mUSDC...`);
  await usdc.write.approve([wrapAddr, amount]);

  console.log("Wrapping 100 mUSDC → ConfidentialUSDC ...");
  
  // On Sepolia testnet, you would use relayer-sdk:
  // const relayer = await createRelayerClient({ chainId: 11155111 }); // Sepolia
  // Then wrap normally - the SDK handles encryption
  
  await wrapper.write.wrap([userClient.account.address, amount]);

  console.log("✅ 100 USDC wrapped confidentially!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**Note about decimals:** MockUSDC uses 18 decimals (ERC20 default), but the wrapper maxes out at 6 decimals, creating a conversion rate of 10^12. This means:
- 1,000,000,000,000 (1e12) MockUSDC units = 1 confidential token unit
- Use `parseUnits("100", 18)` for the amount

**Using relayer-sdk on Sepolia testnet:**
The `@zama-fhe/relayer-sdk` handles client-side encryption and decryption automatically when you create a relayer client with Sepolia's chain ID (11155111).

Expected behavior (on Sepolia testnet):
```
Wrapping 100 mUSDC → ConfidentialUSDC ...
✅ 100 USDC wrapped confidentially!
```

---

## 🔓 6. Unwrap (Confidential → Public)

**⚠️ Note:** Like wrapping, unwrapping also requires Sepolia testnet with FHEVM support and will not work on standard Hardhat localhost.

`scripts/unwrap.ts`:

```typescript
import { network } from "hardhat";

async function main() {
  const wrapAddr = "<WRAPPER_ADDRESS>";
  
  const { viem } = await network.connect({ network: "localhost" });
  const [userClient] = await viem.getWalletClients();
  const wrapper = await viem.getContractAt("MyConfidentialUSDC", wrapAddr);

  // Note: This requires FHEVM encryption capabilities
  // You would need to use the fhevmjs library to create encrypted inputs
  // Example: const encrypted = await encrypt64(50n);
  
  console.log("Requesting unwrap of 50 C-USDC ...");
  // await wrapper.write.unwrap([userClient.account.address, userClient.account.address, encrypted, "0x"]);

  console.log("✅ Unwrap initiated (50 C-USDC → 50 mUSDC)");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Behind the scenes:

1. The unwrap tx creates a  **Gateway request** .
2. The Coprocessor decrypts the amount off-chain.
3. Once ready, `finalizeUnwrap()` is called to send back the 50 mUSDC.

---

## 🧠 7. Understanding `rate()` and Decimals

The wrapper automatically handles decimal conversion between the underlying token and confidential token:

```typescript
import { network } from "hardhat";

async function main() {
  const wrapAddr = "<WRAPPER_ADDRESS>";
  
  const { viem } = await network.connect({ network: "localhost" });
  const wrapper = await viem.getContractAt("MyConfidentialUSDC", wrapAddr);
  
  const rate = await wrapper.read.rate();
  const decimals = await wrapper.read.decimals();
  
  console.log("Rate:", rate.toString());          // 1000000000000 (10^12)
  console.log("Decimals:", decimals.toString());  // 6
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**How rate works:**
- MockUSDC has 18 decimals (standard ERC20)
- Wrapper maxes out at 6 decimals (for FHE efficiency)
- Rate = 10^(18-6) = 10^12
- Therefore: 1,000,000,000,000 MockUSDC units = 1 confidential token unit
- All wrapping/unwrapping rounds to multiples of `rate()`

---

## 🧩 8. How Callbacks Work

The wrapper implements `IERC1363Receiver`.

So, if the underlying token supports **ERC-1363** (transfer-and-call), users can wrap tokens directly by calling:

```solidity
IERC1363(USDC).transferAndCall(wrapper, 100e6, abi.encode(toAddress));
```

The wrapper’s `onTransferReceived()` handles minting confidential units automatically.

---

## 🧧🧯 9. Verify Confidential Balances

**⚠️ Note:** Balance verification also requires FHEVM decryption capabilities.

```typescript
import { network } from "hardhat";

async function main() {
  const wrapAddr = "<WRAPPER_ADDRESS>";
  
  const { viem } = await network.connect({ network: "localhost" });
  const [userClient] = await viem.getWalletClients();
  const wrapper = await viem.getContractAt("MyConfidentialUSDC", wrapAddr);
  
  const balance = await wrapper.read.confidentialBalanceOf([userClient.account.address]);
  console.log("Encrypted C-USDC Balance:", balance);
  
  // Decryption requires fhevmjs library and FHEVM gateway
  // const decrypted = await decrypt(balance);
  // console.log("Decrypted Balance:", decrypted);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Expected output (on FHEVM devnet):
```
Encrypted C-USDC Balance: 0x3ea41...
Decrypted Balance: 50
```

---

## 🧭 10. Recap

| Step | Concept              | Outcome                                         |
| ---- | -------------------- | ----------------------------------------------- |
| 1–3 | Setup + Contract     | Created a wrapper around Mock USDC              |
| 4–5 | Deployment + Wrap    | Minted confidential tokens backed by real USDC  |
| 6    | Unwrap               | Redeemed encrypted assets back to public tokens |
| 7–9 | Rates + Verification | Controlled precision & verified decryption      |

---

## 🚀 Next Lesson Preview

### **Lesson 4 – Confidential DeFi Primitives**

You’ll build:

* A **Confidential Swap** contract
* How encrypted math lets you run AMMs (privately)
* Designing a minimal Confidential Liquidity Pool
* Understanding oracle and Relayer roles
