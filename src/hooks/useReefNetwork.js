import { useContext } from "react";
import ReefNetworkContext from "@contexts/ReefNetworkContext/ReefNetworkContext";

export function useAccounts() {
  return useContext(ReefNetworkContext);
}

export default useAccounts;
