import { network } from "hardhat";
// For FHEVM devnet, uncomment:
// import { createRelayerClient } from "@zama-fhe/relayer-sdk";

async function main() {
  const swapAddr = "<SWAP_ADDRESS>";

  console.log("Executing confidential swap...");
  const { viem } = await network.connect({ network: "localhost" });
  const [userClient] = await viem.getWalletClients();
  
  const swap = await viem.getContractAt("ConfidentialSwap", swapAddr);

  console.log("⚠️  This requires Sepolia testnet with FHEVM support");
  console.log("Standard Hardhat localhost does not support FHE operations");
  
  // On Sepolia testnet:
  // 1. Create relayer client
  // const relayer = await createRelayerClient({ chainId: 11155111 }); // Sepolia
  
  // 2. Encrypt the swap amount
  // const encryptedAmountIn = await relayer.encrypt64(100n);
  
  // 3. Execute the swap
  // await swap.write.swapAforB([encryptedAmountIn]);
  
  console.log("✅ Would swap confidentially 100 A → B (encrypted result on-chain)");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
