import { network } from "hardhat";
import { parseUnits } from "viem";

async function main() {
  const usdcAddr = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";
  const wrapAddr = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

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
  await wrapper.write.wrap([userClient.account.address, amount]);

  console.log("✅ 100 USDC wrapped confidentially!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
