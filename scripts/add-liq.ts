import { ethers } from "hardhat";
import { BigNumber } from "ethers";

async function main() {
  const e18 = BigNumber.from(10).pow(18);
  const supply = e18.mul(690000000000); // 690 billion

  const deployer = await ethers.getSigner(process.env.DEPLOYER || "");
  console.log("deployer is", deployer.address);

  const instance = await ethers.getContractAt(
    "SimpleToken",
    "0xb00b58d07d5fb10ae1ea6f9b47c3c723a9e8af2d"
  );

  const router = "0x7a250d5630b4cf539739df2c5dacb4c659f2488d"; // router
  const freezeDuration = 60 * 20; // 20 min freeze

  const maxHoldingAmount = e18.mul("6148900000");
  const minHoldingAmount = e18.mul("4657400000");

  const tx = await instance
    .connect(deployer)
    .addLiquidity(router, freezeDuration, maxHoldingAmount, minHoldingAmount, {
      value: e18, // 1eth liq
    });

  console.log("hash", tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
