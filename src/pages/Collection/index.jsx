import React from "react";
import MyCollection from "./MyCollection";
import AlertSign from "./AlertSign";
import useAccounts from "@hooks/useAccounts";

export default function Collection() {
  const { selectedAccount } = useAccounts();

  return selectedAccount ? (
    <MyCollection />
  ) : (
    <AlertSign>Choose an account to see your NFTs</AlertSign>
  );
}
