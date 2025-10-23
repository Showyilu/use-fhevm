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
