import { network } from "hardhat";

async function main() {
  console.log("Deploying tokens and swap contract...");
  
  const { viem } = await network.connect({ network: "localhost" });
  const [deployerClient] = await viem.getWalletClients();
  
  console.log("Deploying from:", deployerClient.account.address);
  
  // Deploy TokenA (reuse MyPrivateToken)
  const tokenA = await viem.deployContract("MyPrivateToken");
  console.log("TokenA (MyPrivateToken) deployed to:", tokenA.address);
  
  // Deploy TokenB
  const tokenB = await viem.deployContract("TokenB");
  console.log("TokenB deployed to:", tokenB.address);
  
  // Deploy ConfidentialSwap
  const swap = await viem.deployContract("ConfidentialSwap", [tokenA.address, tokenB.address]);
  console.log("ConfidentialSwap deployed to:", swap.address);
  
  console.log("\n✅ Deployment complete!");
  console.log("Save these addresses for the next steps:");
  console.log("  TokenA:", tokenA.address);
  console.log("  TokenB:", tokenB.address);
  console.log("  Swap:", swap.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
