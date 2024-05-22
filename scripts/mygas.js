const {Provider, types, Wallet} = require("zksync-ethers");
const {getPaymasterParams} = require("zksync-ethers/build/paymaster-utils");
const provider = Provider.getDefaultProvider(types.Network.Sepolia);
const paymaster = "0xE5Cebaf0AB44D0Fc129848CFE0393b0C80Ec74f8";
const wallet = new Wallet("5731d17bf2a1f8cc6aaeb5679e356a0b58b53b9c77fa7167b717e03f503f5e43", provider);
console.log(wallet.address);
(async () => {
    const paymasterParams = getPaymasterParams(paymaster, {
        type: "General",
        innerInput: new Uint8Array()
    });
    const tx = await wallet.sendTransaction({
        data: "0x1337",
        to: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        customData: {
            paymasterParams
        }
    });
    console.log(tx);
})();
