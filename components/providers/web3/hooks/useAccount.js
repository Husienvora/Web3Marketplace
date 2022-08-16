import { useEffect } from "react";
import useSWR from "swr";
const Web3Utils = require("web3-utils");
const adminAddresses = {
  "0x8f93dA22d9ccE6e882088984cEBD8382AdEac33D": true,
  "0x70C1c4FDeB25aB45a1efa2500978F1A905EbBB85": true,
};

export const handler = (web3, provider) => () => {
  const { data, mutate, ...rest } = useSWR(
    () => (web3 ? "web3/accounts" : null),
    async () => {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      if (!account) {
        throw new Error(
          "Cannot retreive an account. Please refresh the browser."
        );
      }

      return account;
    }
  );

  useEffect(() => {
    const mutator = (accounts) => mutate(accounts[0] ?? null);
    provider?.on("accountsChanged", mutator);

    return () => {
      provider?.removeListener("accountsChanged", mutator);
    };
  }, [provider]);

  return {
    data,
    isAdmin: (data && adminAddresses[data]) ?? false,
    mutate,
    ...rest,
  };
};
