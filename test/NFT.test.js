const NFTMarketplace = artifacts.require("NFTMarketplace");
const { catchRevert } = require("./utils/exceptions");

contract("NFTMarketplace", (accounts) => {
  before(async () => {
    nftMarketplace = await NFTMarketplace.deployed();
  });
  it("Should create and execute market sales", async function () {
    let listingPrice = await nftMarketplace.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = web3.utils.toWei("1", "ether");
    /* create two tokens */
    await nftMarketplace.createToken(
      "https://www.mytokenlocation.com",
      auctionPrice,
      { value: listingPrice }
    );
    await nftMarketplace.createToken(
      "https://www.mytokenlocation2.com",
      auctionPrice,
      { value: listingPrice }
    );

    const buyerAddress = accounts[0];

    /* execute sale of token to another user */

    await nftMarketplace.createMarketSale(1, {
      from: buyerAddress,
      value: auctionPrice,
    });

    /* resell a token */
    await nftMarketplace.resellToken(1, auctionPrice, {
      from: buyerAddress,
      value: listingPrice,
    });

    /* query for and return the unsold items */
    items = await nftMarketplace.fetchMarketItems();
    items = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nftMarketplace.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );
    console.log("items: ", items);
  });
});
