const nftMarketplaceMigration = artifacts.require("NFTMarketplace");

module.exports = function (deployer) {
  deployer.deploy(nftMarketplaceMigration);
};
