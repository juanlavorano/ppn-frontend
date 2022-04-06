import React, { useState, useEffect, useCallback } from "react";
import AccountsContext from "./AccountsContext";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";

export default function AccountsProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState(null);

  // Get extensions addresses
  const getAccounts = useCallback(async () => {
    await web3Enable("guardians");
    const foundAccounts = await web3Accounts();

    if (!accounts.length || accounts.length !== foundAccounts.length)
      setAccounts(foundAccounts);
  }, [accounts.length]);

  useEffect(() => {
    getAccounts();

    if (!currentAccount) setCurrentAccount(accounts[0]);
  }, [accounts, currentAccount, getAccounts]);

  return (
    <AccountsContext.Provider value={{ accounts, currentAccount }}>
      {children}
    </AccountsContext.Provider>
  );
}
