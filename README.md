# DApp Starter Kit

Derived from Kickstart DApp at [EthereumCasts](https://github.com/StephenGrider/EthereumCasts)

This repository is using the Public Rinkeby Test Network, if you want to just develop with a local test network, please view this [React Truffle Box](https://github.com/truffle-box/react-box/tree/master/src) provided by the [Truffle Framework](http://truffleframework.com/)

Interacting with any public Ethereum network requires some initial setup, please be aware

## Prerequisites

Install to your computer:

* [Node.js (LTS is fine)](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/en/docs/install)

Install to your browser:

* [Metamask](https://chrome.google.com/webstore/search/metamask)
  * After installing, create an account and save the mnemonic phrase for later
  * Make sure you from the top left corner of the extension that you select the Rinkeby Test Network, by default the Main Ethereum Network will be selected

Navigate to and follow the directions below for the following:

* [Rinkeby Ethereum Faucet](https://faucet.rinkeby.io/)
  * Copy your address from MetaMask by opening up the extension and clicking the ... and then selecting the option "Copy Address to clipboard"
  * Follow the instructions on the Faucet webpage to get your Ether and choose the 18.75 ethers option
  * This faucet will give you Ether for free on the Rinkeby Test Network. This will come in handy later when deploying and interacting with your contracts

- [Infura](https://infura.io/)
  * Sign up for Infura at https://infura.io/, you should recieve an email will all the public ethereum networks - save the Rinkeby Test Provider URL for later
  * This url will allow you to connect to a node provided by Infura, which is required to interact with any Ethereum Network

## Steps to Get Started If Using the Public Rinkeby Test Network

1. Install dependencies with yarn

```shell
yarn install
```

2. Add your contract (.sol) to the ethereum/contracts folder

3. Modify ethereum/compile.js to read and compile your contract
   * Replace the <> with the your contract

```javascript
const contractPath = path.resolve(
  __dirname,
  "contracts",
  "<Your Contract>.sol"
);
```

4. Compile the contracts
   * This will generate .json files for each contract you compiled under ethereum/build

```shell
node compile.js
```

5. Modify ethereum/deploy.js
   * Replace the <Your Contract> with the .json file name of the compiled contract from the previous step that you want to deploy

```javascript
const compiledFactory = require("./build/<Your Contract>.json");
```

* Replace the <MetaMask Mnemonic phrase> with the MetaMask mnemonic phrase that you saved earlier
* Replace the <Infura Provider URL with Access Key> with the Rinkeby Test Provider URL that you saved earlier

```javascript
const provider = new HDWalletProvider(
  "<MetaMask Mnemonic phrase>", //mnemonic generates many accounts
  "<Infura Provider URL with Access Key>" //access key
);
```

6. Deploy the contract to the Rinkeby Network
   * Make sure to save address where contract is deployed. This should be logged to the console as "Contract deployed to <Contract Address>"

```shell
node compile.js
```

7. Use can use [Remix - Solidity Browser IDE](https://remix.ethereum.org/) Run -> At Address with contract selected to view and interact with your deployed contract on the Rinkeby Network

   * Go to the Run tab
   * Make sure under the environment option that the Injected Web3 option is selected this will use MetaMask's web3 instance to interact with the Rinkeby Network
   * Make sure you have a copy of you contract pasted in the IDE and select it from the dropdown above the "Create" and "At Address" inputs
   * Then paste the address where your contract was deployed into the "At Address" input and click the button

8. Modify ethereum/contract.js to interact with your contract instance in your JavaScript code
   * Replace <Your Contract> with the contract you want to get the instance of

```javascript
import Contract from "./build/<Your Contract>.json";
```

* Replace the <Address of Contract> with the saved address from the previous deployment step

```javascript
const instance = new web3.eth.Contract(
  JSON.parse(Contract.interface),
  "<Address of Contract>"
);
```

9. Modify ethereum/web3.js to use your Infura Rinkeby

```javascript
const provider = new Web3.providers.HttpProvider(
  "<Infura Provider URL with Access Key>"
);
```

## Links

### Development

* [Remix - Solidity Browser IDE](https://remix.ethereum.org/)
* [Truffle - DApp Framework](http://truffleframework.com/)

### Rinkeby - Public Ethereum Test Network

* [Infura - Portal into public Ethereum Test Networks](https://infura.io/)
* [Rinkeby - Etherscan for Rinkeby](https://rinkeby.etherscan.io/)
* [Rinkeby Faucet - Ether Faucet for Rinkeby](https://faucet.rinkeby.io/)

### Documentation

* [Solidity](https://solidity.readthedocs.io/en/develop/)
