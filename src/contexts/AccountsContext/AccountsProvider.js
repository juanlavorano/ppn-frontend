import React, { useState, useEffect, useCallback } from "react";
import AccountsContext from "./AccountsContext";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";

export default function AccountsProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  // Get extensions addresses
  const getAccounts = useCallback(async () => {
    await web3Enable("guardians");
    const foundAccounts = await web3Accounts();

    if (!accounts.length || accounts.length !== foundAccounts.length)
      setAccounts(foundAccounts);
  }, [accounts.length]);

  const connectAccount = useCallback(
    async (account) => {
      const foundAccount = accounts.find(
        (acc) => acc.address === account.address
      );

      setSelectedAccount(foundAccount);

      const injector = await web3FromAddress(foundAccount.address);
      return injector;
    },
    [accounts]
  );

  useEffect(() => {
    getAccounts();
  }, [accounts, connectAccount, getAccounts]);

  return (
    <AccountsContext.Provider
      value={{ accounts, selectedAccount, setSelectedAccount, connectAccount }}
    >
      {children}
    </AccountsContext.Provider>
  );
}
