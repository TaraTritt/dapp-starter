const path = require("path");
const solc = require("solc"); // solidity compiler
const fs = require("fs-extra"); // has extra functions over 'fs' module

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath); // removes all files and folders under build directory

const contractPath = path.resolve(
  __dirname,
  "contracts",
  "<Your Contract>.sol"
);
const source = fs.readFileSync(contractPath, "utf-8"); // path and encoding
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // will check if dir exists if not creates it

for (let contract in output) {
  // loop through all contracts
  fs.outputJsonSync(
    // write out each contract to JSON file to buildPath
    path.resolve(buildPath, contract.replace(":", "") + ".json"), // path
    output[contract] // contents
  );
}
