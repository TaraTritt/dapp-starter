// import our web3 instance
import web3 from "./web3";
import Contract from "./build/<Your Contract>.json";

// get Contract instance
// replace <> with the address of your deployed Contract instance
// use web3 to get the contract instance
const instance = new web3.eth.Contract(
  JSON.parse(Contract.interface),
  "<Address of Contract>"
);

export default instance;
