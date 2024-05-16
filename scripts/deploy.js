const { Provider, types, Wallet, ContractFactory } = require("zksync-ethers");
const PaymasterJson = require("../artifacts/Paymaster.json");

const { abi, bin: bytecode } =
  PaymasterJson.contracts["contracts/Paymaster.sol:Paymaster"];

const provider = Provider.getDefaultProvider(types.Network.Sepolia);

const wallet = new Wallet(
  "", // <-- provide a private key with gas
  provider
);

console.log(wallet.address);

(async () => {
  const cf = new ContractFactory(abi, bytecode, wallet);
  const result = await cf.deploy();
  const contract = await result.waitForDeployment();
  console.log(await contract.getAddress());
})();
