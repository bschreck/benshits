import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: {
        mnemonic:
        "arm bunker now crowd canoe candy erupt ability behave pretty pass essay",
      },
    },
    rinkeby: {
      url: process.env.ROPSTEN_URL || "",
      accounts: {
        mnemonic:
          //"wife jacket tourist stock immune sponsor cash truck ship strike pizza paper",
          "arm bunker now crowd canoe candy erupt ability behave pretty pass essay",
      },
    },
    localhost: {
      url: "http://localhost:8545",
      accounts: [
        process.env.PRE_FUNDED_PRIVATE_KEY_1 || "",
        process.env.PRE_FUNDED_PRIVATE_KEY_2 || "",
      ],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    artifacts: "artifacts",
  },
};

export default config;
