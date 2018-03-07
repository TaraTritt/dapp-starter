// this is the library import
// however if we want to actually use web3 we need to declare an instance, see below
import Web3 from "web3";

let web3;

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

export default web3;
