import useSWR from "swr";
import { useState } from "react";
import axios from "axios";
const Web3Utils = require("web3-utils");
export const handler = (web3, contractNfts) => () => {
  const swrRes = useSWR(
    () => (web3 && contractNfts ? `web3/Nfts` : null),
    async () => {
      const [Marketnfts, setMarketnfts] = useState();
      const data = await contractNfts.methods.fetchMarketItems();
      const items = data.map(async (nft) => {
        const tokenUri = await contractNfts.tokenUri(nft.tokenId);
        const meta = await axios.get(tokenUri);
        let price = Web3Utils.fromWei(nft.price.toString(), "ether");
        let item = {
          price,
          tokenId: nft.tokenId.toNumber(),
          seller: nft.seller,
          owner: nft.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      });

      setMarketnfts(items);

      return { Marketnfts };
    }
  );

  return swrRes;
};
