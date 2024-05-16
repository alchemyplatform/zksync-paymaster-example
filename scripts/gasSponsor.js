const { Provider, types, Wallet } = require("zksync-ethers");
const { getPaymasterParams } = require("zksync-ethers/build/paymaster-utils");

const provider = Provider.getDefaultProvider(types.Network.Sepolia);

const wallet = new Wallet(
  "", // <-- this private key does not need gas, as it will be sponsored
  provider
);

console.log(wallet.address);

const PAYMASTER = "0xE5Cebaf0AB44D0Fc129848CFE0393b0C80Ec74f8";

(async () => {
  const paymasterParams = getPaymasterParams(PAYMASTER, {
    type: "General",
    innerInput: new Uint8Array(),
  });

  const tx = await wallet.sendTransaction({
    data: "0x1337",
    to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    customData: {
      paymasterParams,
    },
  });
  console.log(tx);
})();
