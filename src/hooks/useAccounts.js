import { useContext } from "react";
import AccountsContext from "contexts/AccountsContext/AccountsContext";

export function useAccounts() {
  return useContext(AccountsContext);
}

export default useAccounts;
