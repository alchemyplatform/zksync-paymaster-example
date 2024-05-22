const smartAccountAdress = "0xe6A7F270D146DF39d5c17cA2bc433d432cc3724D"
const ethers = require("ethers");
const { Provider, types, Wallet, ContractFactory } = require("zksync-ethers");


const paymasterJson = require("../artifacts/Paymaster.json");


const {abi, bin: bytecode} = 
  paymasterJson.contracts["contracts/Paymaster.sol:Paymaster"]

const provider = Provider.getDefaultProvider(types.Network.Sepolia); // zkSync Era testnet (L2)
const ethProvider = ethers.getDefaultProvider("sepolia"); // Sepolia testnet (L1)



const PRIVATE_KEY = process.env.PRIVATE_KEY;
const wallet = new Wallet(
"5731d17bf2a1f8cc6aaeb5679e356a0b38b53b9c77fa7167b717e03f503f5e43",
 provider,
ethProvider);

console.log (wallet.address);
(async () => {
   
   console.log(await wallet.getBalance());

})();