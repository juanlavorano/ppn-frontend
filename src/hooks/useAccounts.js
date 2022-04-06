import { useContext } from "react";
import AccountsContext from "contexts/AccountsContext/AccountsContext";

export default function useAccounts() {
  return useContext(AccountsContext);
}
