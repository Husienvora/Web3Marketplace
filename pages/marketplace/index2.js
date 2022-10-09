import React, { useEffect, useState } from "react";
import { useNfts } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { BaseLayout } from "@components/ui/layout";
export default function index2() {
  const { _web3Api } = useWeb3();
  const { Marketnft } = useNfts();
  const [Listingprice, setListingprice] = useState();
  const [Mynfts, setMynfts] = useState();
  const listingprice = async () => {
    let listingPrice = await _web3Api.contractNfts.methods
      .getListingPrice()
      .call();
    setListingprice(listingPrice);
  };
  const CreatToken = async (url, auctionprice, listingPrice) => {
    try {
      await _web3Api.contractNfts.methods
        .createToken(url, auctionprice, {
          value: listingPrice,
        })
        .call();
    } catch (error) {
      console.log("Could not create token");
    }
  };

  const createMarketSale = async (tokenId, auctionPrice, buyerAddress) => {
    try {
      await _web3Api.contractNfts.methods.createMarketSale(tokenId, {
        from: buyerAddress,
        value: auctionPrice,
      });
    } catch (error) {
      console.log("Cannot execute sale");
    }
  };

  const resellToken = async (
    tokenId,
    auctionPrice,
    buyerAddress,
    listingPrice
  ) => {
    try {
      await _web3Api.contractNfts.methods.resellToken(tokenId, auctionPrice, {
        from: buyerAddress,
        value: listingPrice,
      });
    } catch (error) {
      console.log("Cannot resell token");
    }
  };

  const fetchMyNFTs = async (buyerAddress) => {
    try {
      await _web3Api.contractNfts.methods.fetchMyNFTs({ from: buyerAddress });
    } catch (error) {
      console.log("Could not fetch nfts");
    }
  };

  const fetchItemsListed = async (buyerAddress) => {
    try {
      await _web3Api.contractNfts.methods.fetchItemsListed({
        from: buyerAddress,
      });
    } catch (error) {
      console.log("Could not fetch Items Listed");
    }
  };

  console.log(_web3Api);
  useEffect(() => {
    listingprice();
  }, []);

  return <div>{Listingprice}</div>;
}

index2.Layout = BaseLayout;
