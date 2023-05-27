import { ethers } from "ethers";

export const encoder = (types: string[], values: unknown[]) => {
  const abiCoder = ethers.utils.defaultAbiCoder;
  const encodedParams = abiCoder.encode(types, values);
  return encodedParams.slice(2);
};

export const create2Address = (
  factoryAddress: string,
  saltHex: string,
  initCode: string
) => {
  return ethers.utils.getCreate2Address(
    factoryAddress,
    saltHex,
    ethers.utils.keccak256(initCode)
  );
};
