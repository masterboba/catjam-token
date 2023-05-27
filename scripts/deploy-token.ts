import { ethers } from "hardhat";
import { create2Address, encoder } from "./utils-create2";
import { BigNumber } from "ethers";

const {
  bytecode,
} = require("../artifacts/contracts/SimpleToken.sol/SimpleToken.json");

async function main() {
  const factory = await ethers.getContractAt(
    "DeterministicDeployFactory",
    "0x790DeEB2929201067a460974612c996D2A25183d"
  );

  console.log("factory at", factory.address);

  console.log((await ethers.getSigners()).map((a) => a.address));
  const deployer = await ethers.getSigner(process.env.DEPLOYER || "");
  console.log("deployer is", deployer.address);

  // prepare init variables
  const e18 = BigNumber.from(10).pow(18);
  const supply = e18.mul(690000000000); // 690 billion

  const lpSupply = supply.mul(9).div(10); // 90% to LP
  const bondingSupply = supply.div(10); // 10% to bonding

  const name = "Borat Token";
  const symbol = "BORAT";

  const saltHex =
    "0x0755885ed0779bb90ed49db652a0bec454604a24680619b579fc5bed1606d99d";

  const initCode =
    bytecode +
    encoder(
      ["string", "string", "address", "uint256", "uint256"],
      [name, symbol, deployer.address, lpSupply, bondingSupply]
    );

  // guess deploy address
  const create2Addr = create2Address(factory.address, saltHex, initCode);
  console.log("expected", create2Addr);

  // deploy...
  const tx = await factory.connect(deployer).deploy(initCode, saltHex);
  console.log("deploy tx", tx.hash);

  const token = await ethers.getContractAt("SimpleToken", create2Addr);

  console.log("totalSupply", await token.totalSupply());
  console.log("owner", await token.owner());
  console.log("balanceOf deploer", await token.balanceOf(deployer.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
