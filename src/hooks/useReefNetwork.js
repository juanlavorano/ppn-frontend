import { useContext } from "react";
import ReefNetworkContext from "@contexts/ReefNetworkContext/ReefNetworkContext";

export default function useAccounts() {
  return useContext(ReefNetworkContext);
}
