import { Contract } from "ethers";
import { PPN_ABI, PPN_ADDRESS } from "@constants";
import useAccounts from "@hooks/useAccounts";
import { useCallback, useEffect, useState } from "react";

export default function useContract() {
  const { signer } = useAccounts();
  const [contract, setContract] = useState(null);

  const instantiateContract = useCallback(() => {
    let contract;
    if (signer) contract = new Contract(PPN_ADDRESS, PPN_ABI, signer);

    return contract;
  }, [signer]);

  useEffect(() => {
    setContract(instantiateContract());
  }, [instantiateContract]);

  return contract;
}
