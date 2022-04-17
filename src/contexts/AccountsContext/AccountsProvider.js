import React, { useState, useEffect, useCallback } from "react";
import AccountsContext from "./AccountsContext";
import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from "@reef-defi/extension-dapp";
import useReefNetwork from "@hooks/useReefNetwork";
import { Signer } from "@reef-defi/evm-provider";
import { APP_NAME, SELECTED_ACCOUNT, EXPIRY_TIME } from "@constants";

export default function AccountsProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const { provider } = useReefNetwork();
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [signer, setSigner] = useState(null);

  const init = useCallback(async () => {
    // Get extensions
    await web3Enable(APP_NAME);

    // Get accounts from extensions
    const allAccounts = await web3Accounts();
    setAccounts(allAccounts);

    // Set account and signer if there's one in local storage
    if (window.localStorage.getItem(SELECTED_ACCOUNT)) {
      const storageAccount = JSON.parse(
        window.localStorage.getItem(SELECTED_ACCOUNT)
      );

      // Clean account in local storage if it's been more than EXPIRY_TIME
      if (new Date() > new Date(storageAccount.expiry)) {
        localStorage.removeItem("SELECTED_ACCOUNT");
        return;
      }

      // Set account and signer
      const injector = await web3FromSource(storageAccount.account.meta.source);
      const signer = new Signer(
        provider,
        storageAccount.account.address,
        injector.signer
      );

      setSelectedAccount(storageAccount.account);
      setSigner(signer);
    }
  }, [provider]);

  const selectAccount = useCallback(
    async (account) => {
      await provider.api.isReady;

      const injector = await web3FromSource(account.meta.source);

      // Instantiate signer
      let signer;
      if (account)
        signer = new Signer(provider, account.address, injector.signer);

      // Claim default account
      if (!(await signer.isClaimed())) {
        console.log(
          "No claimed EVM account found -> claimed default EVM account: ",
          await signer.getAddress()
        );
        await signer.claimDefaultAccount();
      } else {
        // Set states
        setSelectedAccount(account);
        setSigner(signer);

        // Save account in storage with expiry date
        const storageExpiry = new Date(new Date().getTime() + EXPIRY_TIME);
        window.localStorage.setItem(
          SELECTED_ACCOUNT,
          JSON.stringify({
            account,
            expiry: storageExpiry,
          })
        );
      }
    },
    [provider]
  );

  useEffect(() => {
    (async () => {
      if (provider) await init();
    })();
  }, [init, provider]);

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        selectedAccount,
        selectAccount,
        signer,
      }}
    >
      {children}
    </AccountsContext.Provider>
  );
}
