const HDWalletProvider = require("@truffle/hdwallet-provider");
const keys = require("./keys.json");
module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.MNEMONIC,
          },
          providerOrUrl: `https://ropsten.infura.io/v3/${keys.INFURA_PROJECT_ID}`,
          addressIndex: 0,
        }),
      network_id: 3,
      gas: 5500000, //Gas Limit,How much gas we are willing to spent
      gasPrice: 20000000000, //how much we are willing to spend for unit of gas
      confirmations: 2, //number of block to wait between deployment.
      timeoutBlocks: 200, //number of blocks before deployment times out
    },
  },

  compilers: {
    solc: {
      version: "0.8.11",
    },
  },
};

//  > transaction hash:    0x3d96f1b0ca501910742d8398c3891cfb423ac9f3fa054261c82c5d9712f4c854
//  > Blocks: 1            Seconds: 17
//  > contract address:    0x29926FaC5F0E0F01d4E69e81054566174C2017B4
// NEXT_PUBLIC_TARGET_CHAIN_ID = 1337;
// NEXT_PUBLIC_NETWORK_ID = 5777;
