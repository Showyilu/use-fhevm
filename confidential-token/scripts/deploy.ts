import { network } from "hardhat";

async function main() {
  console.log("Deploying MyPrivateToken...");
  
  const { viem } = await network.connect({ network: "localhost" });
  const publicClient = await viem.getPublicClient();
  const [deployerClient] = await viem.getWalletClients();
  
  console.log("Deploying from:", deployerClient.account.address);
  
  const token = await viem.deployContract("MyPrivateToken");
  
  console.log("MyPrivateToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
