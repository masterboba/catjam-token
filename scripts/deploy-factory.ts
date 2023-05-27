import { deployOrLoadAndVerify } from "./utils";

async function main() {
  await deployOrLoadAndVerify(
    "DeterministicDeployFactory",
    "DeterministicDeployFactory",
    []
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
