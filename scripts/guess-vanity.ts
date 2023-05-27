import { BigNumber, ethers } from "ethers";
import { encoder, create2Address } from "./utils-create2";

const {
  bytecode,
} = require("../artifacts/contracts/SimpleToken.sol/SimpleToken.json");

const main = async () => {
  const factoryAddr = "0x790DeEB2929201067a460974612c996D2A25183d";

  const e18 = BigNumber.from(10).pow(18);
  const supply = e18.mul(690000000000); // 690 billion

  const owner = process.env.DEPLOYER;
  const lpSupply = supply.mul(9).div(10); // 90% to LP
  const bondingSupply = supply.div(10); // 10% to bonding

  const name = "Borat Token";
  const symbol = "BORAT";

  let counter = 0;
  while (counter++ < 1e9) {
    const saltHex = ethers.utils.id(counter.toString());
    const initCode =
      bytecode +
      encoder(
        ["string", "string", "address", "uint256", "uint256"],
        [name, symbol, owner, lpSupply, bondingSupply]
      );

    const create2Addr = create2Address(factoryAddr, saltHex, initCode);

    if (counter % 10000 === 0) console.log(counter, create2Addr);
    if (create2Addr.toLocaleLowerCase().startsWith("0xb00b5")) {
      console.log("precomputed address:", create2Addr);
      console.log("salt needed:", saltHex);
      console.log("iterations needed:", counter);
      break;
    }
  }
};
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
