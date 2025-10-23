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
