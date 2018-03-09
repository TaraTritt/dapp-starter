# DApp Starter Kit

Derived from the Kickstart DApp at [EthereumCasts](https://github.com/StephenGrider/EthereumCasts).

This is a simple boilerplate repo to develop DApps with instructions on how to use the Public Ethereum Rinkeby Test Network specifically.

If you are here for a Hackathon, please [click here](https://github.com/TaraTritt/dapp-starter/wiki/Fannie-Mae-Blockchain-Challenge) to view the description of the Fannie Mae Blockchain Challenge.

## DApp Development Tutorial

If you are new to DApp develoment please use the **[tutorial](https://github.com/TaraTritt/dapp-starter/wiki/DApp-Tutorial)** that accompanies this repo to get started. It contains an overview of the blockchain, Ethereum, Solidity, React, and DApp development.

## Built With

* [solc](https://github.com/ethereum/solc-js) - JavaScript bindings for the Solidity compiler

  From [ethereum/compile.js](https://github.com/TaraTritt/dapp-starter/blob/master/ethereum/compile.js)

  ```javascript
  const contractPath = path.resolve(
    __dirname,
    "contracts",
    "<Your Contract>.sol"
  );
  const source = fs.readFileSync(contractPath, "utf-8"); // path and encoding
  const output = solc.compile(source, 1).contracts;
  ```

* [web3.js](https://web3js.readthedocs.io/en/1.0/) - A JavaScript library that allows you to interact with a local or remote ethereum node, using a HTTP or IPC connection. This allows you to do things, like deploy your contracts, make calls to your contract, and get information on your accounts.

  * This project is using the 1.0.0-beta.30 version, versions 0.xx.xx do not support promises or the async / await syntax, only callbacks were supported. 
  * **Please be aware that much of the documentation you find online is for versions 0.xx.xx [click here](https://web3js.readthedocs.io/en/1.0/) for the 1.0 documentation.**

 
  From [pages/index.js](https://github.com/TaraTritt/dapp-starter/blob/master/pages/index.js)

  ```javascript
  static async getInitialProps() {
    const auctionEndTime = await contract.methods.auctionEndTime().call();
    console.log(auctionEndTime);
    return { auctionEndTime };
  }
  ```

  * Metamask also automatically injects a web3 library with a provider into any page you are browsing, which is used in the app when available

  From [ethereum/web3.js](https://github.com/TaraTritt/dapp-starter/blob/master/ethereum/web3.js)

  ```javascript
  if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    // we are in the browser and metamask is running
    // get metamask instance that injects web3 into all web pages
    // this will not work if user does not metamask installed
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // we are on the server or the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
      "<Infura Provider URL with Access Key>"
    );
    web3 = new Web3(provider);
  }
  ```

* [truffle-hdwallet-provider](https://github.com/trufflesuite/truffle-hdwallet-provider) - Wallet-enabled Web3 provider that can be used to sign transactions for addresses derived from a 12-word mnemonic.

  From [ethereum/deploy.js](https://github.com/TaraTritt/dapp-starter/blob/master/ethereum/deploy.js)

  ```javascript
  const provider = new HDWalletProvider(
    "<MetaMask Mnemonic phrase>", //mnemonic generates many accounts
    "<Infura Provider URL with Access Key>" //provider url with access key
  );
  const web3 = new Web3(provider);
  ```

* [Next.js](https://learnnextjs.com/) - a minimalist framework for server side rendered React applications

* [React](https://reactjs.org/) - a JavaScript library to build dynamic single page applications

  ```javascript
  class Hello extends React.Component {
    render() {
      return <div>Hello {this.props.name}</div>;
    }
  }

  ReactDOM.render(<Hello name="World" />, document.getElementById("container"));
  ```

  Renders:

  `Hello World`

* [Semantic UI React](https://react.semantic-ui.com) - a UI framework that provides a variety of React components for building simple but beautiful interfaces

  From [components/Header.js](https://github.com/TaraTritt/dapp-starter/blob/master/components/Header.js)

  ```javascript
  import React from "react";
  import { Menu } from "semantic-ui-react";

  export default () => {
    return (
      <Menu style={{ marginTop: "10px" }}>
        <Menu.Item>Sample DApp</Menu.Item>
        <Menu.Menu position="right" />
      </Menu>
    );
  };
  ```

## Prerequisites

Install to your computer:

* [Node.js (LTS is fine)](https://nodejs.org/en/)
  * If you already have node installed, make sure you have at least version 8.0.0 >= of Node.js. You can check your node version by running this command: 

```node
node -v
```

Install to your browser:

* [Metamask](https://chrome.google.com/webstore/search/metamask)
  * After installing, create an account and save the mnemonic phrase for later
  * Make sure you select the Rinkeby Test Network from the top left corner of the extension - by default the Main Ethereum Network will be selected

Navigate to and follow the directions below for the following:

* [Rinkeby Ethereum Faucet](https://faucet.rinkeby.io/)
  * Copy your address from MetaMask by opening up the extension and clicking the ... and then selecting the option "Copy Address to clipboard"
  * Follow the instructions on the Faucet webpage to get your Ether and choose the 18.75 ethers option
  * This faucet will give you Ether for free on the Rinkeby Test Network. This will come in handy later when deploying and interacting with your contracts

- [Infura](https://infura.io/)
  * Sign up for Infura at https://infura.io/, you should recieve an email will all the public ethereum networks - save the Rinkeby Test Provider URL for later
  * This url will allow you to connect to a node provided by Infura, which is required to interact with any Ethereum Network

## Getting Started

The **[tutorial](https://github.com/TaraTritt/dapp-starter/wiki/DApp-Tutorial)** that accompanies this repo, gives more context and details on all the following steps. If you are already familiar with DApp development, just execute the steps below to configure this project.

### Compile Contract

**If you are on a Windows computer, please execute this command as an [administrator](https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-8.1/) below first:**

If you are on windows, open up your terminal as administrator and run the following command:

```shell
npm install --global --production windows-build-tools
```
This installs a few build tools that are required to install web3 successfully on a Windows machine. You should only have to run this one time since we are installing this module globally by running install with the `--global` flag.

If you have issues with this install see [here](https://github.com/TaraTritt/dapp-starter/wiki/Error-Index#web3)

1.  Install dependencies with npm from the root directory of the project

```shell
npm install
```

2.  Add your contract(s) (.sol) to the ethereum/contracts folder

3.  Modify ethereum/compile.js to read and compile your contract. If you don't have a contract yet, you can use the [SampleContract.sol](https://github.com/TaraTritt/dapp-starter/tree/master/ethereum/contracts) under the ethereum/contracts folder

* Replace the `<Your Contract>` with your contract (.sol)

```javascript
const contractPath = path.resolve(
  __dirname,
  "contracts",
  "<Your Contract>.sol"
);
```

4.  Compile the contracts by executing ethereum/compile.js. **Make sure to execute this command inside the ethereum directory**

```shell
node compile.js
```

* This will generate .json files for each contract you compiled under ethereum/build

### Deploy Contract

5.  Modify ethereum/deploy.js to deploy your desired contract

* Replace the `<Your Contract>` with the .json file name of the compiled contract in ethereum/build from the previous step that you want to deploy

```javascript
const compiledContract = require("./build/<Your Contract>.json");
```

6.  Modify ethereum/deploy.js to use the accounts you generated with MetaMask & use the Infura provider you registered

* Replace the `<MetaMask Mnemonic phrase>` with the MetaMask mnemonic phrase that you saved earlier
* Replace the `<Infura Provider URL with Access Key>` with the Rinkeby Test Provider URL that you saved earlier

```javascript
const provider = new HDWalletProvider(
  "<MetaMask Mnemonic phrase>", //mnemonic generates many accounts
  "<Infura Provider URL with Access Key>" //access key
);
```

7.  If you have any constructor arguments for your contract, update the arguments array to your constructor's arguments, if not remove the `arguments` attribute.

```javascript
    .deploy({
      data: compiledContract.bytecode,
      arguments: ["<Your constructor arguments here>"]
    })
```

8.  Deploy the contract to the Rinkeby Network. **Make sure to execute this command inside the ethereum directory.** This may take a few minutes to finish executing.

```shell
node deploy.js
```

* Make sure to save the address where contract the contract is deployed. This should be logged to the console as "Contract deployed to `<Contract Address>`". This message is also automatically written to the [ADDRESS](https://github.com/TaraTritt/dapp-starter/blob/master/ADDRESS) file under the root directory
* You can view your deployed contract using [Rinkeby - Etherscan for Rinkeby](https://rinkeby.etherscan.io/). Just paste your contract's address into the search. There should be one transaction present for the contract creation
* If you want to deploy more than one contract, just modify deploy.js again following the instructions in the previous step and rerun the command below

8.  Use can use the [Remix - Solidity Browser IDE](https://remix.ethereum.org/) to view and interact with your deployed contract on the Rinkeby Network

* Go to the "Run" tab
* Make sure under the environment option that the Injected Web3 option is selected this will use MetaMask's injected Web3 instance in your browser to interact with the Rinkeby Network
* Make sure you have a copy of you contract pasted in the IDE and select it from the dropdown above the "Create" and "At Address" inputs
* Then paste the address where your contract was deployed into the "At Address" input and click. You should see a panel created underneath that shows all the public functions of your contract

### Define Web3 Provider for App

9.  Modify ethereum/web3.js to use your Infura Rinkeby Provider URL

```javascript
const provider = new Web3.providers.HttpProvider(
  "<Infura Provider URL with Access Key>"
);
```

### Define Web3 Contract Instance for App

10. Modify ethereum/contract.js to interact with your contract instance in your JavaScript code

* Replace `<Your Contract>` with the contract .json file you want to get the instance of from the ethereum/build folder

```javascript
import Contract from "./build/<Your Contract>.json";
```

11. Modify ethereum/contract.js to get your deployed contract instance via the address that was logged to the console

* Replace the `<Address of Contract>` with the saved address from the previous deployment step

```javascript
const instance = new web3.eth.Contract(
  JSON.parse(Contract.interface),
  "<Address of Contract>"
);
```

### Call Contract via Web3 in App

12. Modify the pages/index.js to call a method on your deployed contract

* Remove `auctionEndTime()` and replace it with a method on your deployed contract that returns something and render it using React

```javascript
static async getInitialProps() {
    const auctionEndTime = await contract.methods.auctionEndTime().call();
    console.log(auctionEndTime);
    return { auctionEndTime };
}
```

13. Run your app locally on port 3000. **Make sure to execute this command from the root directory of your project**

```shell
npm start
```

## Examples

* [Discount Note Auction DApp](https://github.com/TaraTritt/dn-auction-dapp): the purpose of this DApp is to auction off discount notes and it shows you how you can extend this starter repo into a more complex DApp

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
