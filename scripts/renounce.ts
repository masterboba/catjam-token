import { ethers } from "hardhat";
import { BigNumber } from "ethers";

async function main() {
  const e18 = BigNumber.from(10).pow(18);

  const deployer = await ethers.getSigner(process.env.DEPLOYER || "");
  console.log("deployer is", deployer.address);

  const instance = await ethers.getContractAt(
    "SimpleToken",
    "0xb00b58d07d5fb10ae1ea6f9b47c3c723a9e8af2d"
  );

  const tx = await instance.connect(deployer).renounceEverything();
  console.log("hash", tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
