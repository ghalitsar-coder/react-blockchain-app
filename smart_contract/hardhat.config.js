require("@nomiclabs/hardhat-waffle");
// https://eth-goerli.g.alchemy.com/v2/Ppqc1eKkf--krH2b-Aphzzj6GbZkUSYg
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks:{
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/Ppqc1eKkf--krH2b-Aphzzj6GbZkUSYg",
      accounts:["f3dc589d6f4b896bfcba4440cbda88f2b63fb736580218c884ae0522db672b3d"]
    }
  }
};
