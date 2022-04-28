import { web3FromAddress } from "@reef-defi/extension-dapp";

export const getInjector = async (account) => {
  const injector = await web3FromAddress(account.address);
  return injector;
};
