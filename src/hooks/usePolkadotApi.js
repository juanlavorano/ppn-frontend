import { useContext } from "react";
import PolkadotApiContext from "contexts/PolkadotApiContext/PolkadotApiContext";

export default function useAccounts() {
  return useContext(PolkadotApiContext);
}
