// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const DNAConsent = await hre.ethers.getContractFactory("DNAConsent");

  const contract = await DNAConsent.deploy();
  await contract.waitForDeployment(); // ✅ v6 fix

  const address = await contract.getAddress(); // ✅ v6 way to get address
  console.log("✅ DNAConsent deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
