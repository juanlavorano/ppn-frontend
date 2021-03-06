import { Contract } from "ethers";
import { REEF_ERC20_ADDRESS, PPN_ADDRESS } from "@constants/address";
import { REEF_ERC20_ABI, PPN_ABI } from "@constants/abi";
import useAccounts from "@hooks/useAccounts";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { MIN_APPROVE_REEF } from "@constants/app";

export default function useContract() {
  const { signer } = useAccounts();
  const [ppnContract, setPPNContract] = useState(null);
  const [reefERC20Contract, setReefERC20Contract] = useState(null);

  const instantiateContract = useCallback(
    (contractAddres, contractAbi) => {
      let contract;
      if (signer) contract = new Contract(contractAddres, contractAbi, signer);

      return contract;
    },
    [signer]
  );

  const getAddressAllowance = useCallback(
    async (userAddress) => {
      let allowance;

      if (reefERC20Contract) {
        // Get allowance in Wei
        allowance = await reefERC20Contract.allowance(userAddress, PPN_ADDRESS);

        // Wei to Ether
        allowance = ethers.utils.formatEther(allowance);
      }

      return allowance;
    },
    [reefERC20Contract]
  );

  const mint = async () => {
    // Get evm addres from signer
    const evmAddress = await signer.queryEvmAddress();

    // Check signer's allowance
    const allowance = await getAddressAllowance(evmAddress);

    if (allowance < MIN_APPROVE_REEF) return;

    if (ppnContract) {
      await ppnContract.mint();
    }
  };

  useEffect(() => {
    setPPNContract(instantiateContract(PPN_ADDRESS, PPN_ABI));
    setReefERC20Contract(
      instantiateContract(REEF_ERC20_ADDRESS, REEF_ERC20_ABI)
    );
  }, [instantiateContract]);

  return { ppnContract, reefERC20Contract, getAddressAllowance, mint };
}
