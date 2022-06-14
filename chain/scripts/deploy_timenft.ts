import { ethers } from "hardhat";

async function main() {
  const TimeNFT = await ethers.getContractFactory("TimeNFT");
  const token = await TimeNFT.deploy("TimeNFT", "TNFT", 10);
  await token.deployed();

  console.log("TimeNFT deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
