import detectEtherumProvider from "@metamask/detect-provider";

import Web3 from "web3";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { setupHooks } from "./hooks/setupHooks";
import { loadContract } from "@utils/loadContract";
const Web3Context = createContext(null);
const setListeners = (provider) => {
  provider.on("chainChanged", (_) => window.location.reload());
};
const createWeb3State = ({
  web3,
  provider,
  contract,
  contractNfts,
  isLoading,
}) => {
  return {
    web3,
    provider,
    contract,
    contractNfts,
    isLoading,
    hooks: setupHooks({ web3, provider, contract, contractNfts }),
  };
};
export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState(
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      contractNfts: null,
      isLoading: true,
    })
  );
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEtherumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        const contractNfts = await loadContract("NFTMarketplace", web3);
        const contract = await loadContract("CourseMarketplace", web3);
        console.log(contractNfts);
        setListeners(provider);
        setWeb3Api(
          createWeb3State({
            web3,
            provider,
            contract,
            contractNfts,
            isLoading: false,
          })
        );
      } else {
        setWeb3Api((api) => ({ ...api, isLoading: false }));
        console.error("Please,install Metamask");
      }
    };
    loadProvider();
  }, []);
  const _web3Api = useMemo(() => {
    return {
      ...web3Api,

      requireInstall: !web3Api.isLoading && !web3Api.web3,

      connect: web3Api.provider
        ? async () => {
            try {
              await web3Api.provider.request({ method: "eth_requestAccounts" });
            } catch (error) {
              console.error("Cannot retrieve account");
              location.reload();
            }
          }
        : () =>
            console.error(
              "Cannot connect to metamask ,try to reload your browser please."
            ),
    };
  }, [web3Api]);
  return (
    <Web3Context.Provider value={{ _web3Api }}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}
export function useHooks(cb) {
  const { _web3Api } = useWeb3();

  return cb(_web3Api.hooks);
}
