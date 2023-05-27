import hre from "hardhat";
import { BigNumber } from "ethers";

async function main() {
  const e18 = BigNumber.from(10).pow(18);
  const supply = e18.mul(690000000000); // 690 billion

  const lpSupply = supply.mul(9).div(10); // 90% to LP
  const bondingSupply = supply.div(10); // 10% to bonding

  const name = "Borat Token";
  const symbol = "BORAT";

  await hre.run("verify:verify", {
    address: "0xb00b58d07d5fb10ae1ea6f9b47c3c723a9e8af2d",
    constructorArguments: [
      name,
      symbol,
      process.env.DEPLOYER,
      lpSupply,
      bondingSupply,
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
