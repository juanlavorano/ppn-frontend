import React from "react";
import MyCollection from "./MyCollection";
import ChooseAccount from "./ChooseAccount";
import useAccounts from "@hooks/useAccounts";

export default function Collection() {
  const { selectedAccount } = useAccounts();

  return selectedAccount ? <MyCollection /> : <ChooseAccount />;
}
