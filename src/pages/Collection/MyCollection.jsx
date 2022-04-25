import React, { useEffect, useCallback } from "react";
import useAccounts from "hooks/useAccounts";
import useContract from "hooks/useContract";

export default function MyCollection() {
  const { signer } = useAccounts();
  const contract = useContract();

  const getAccountBalance = useCallback(
    async (signerAddress) => {
      if (!contract) return;

      const balanceInBigNumber = await contract.balanceOf(signerAddress);

      return balanceInBigNumber.toNumber();
    },
    [contract]
  );

  const getTokensIndexByAddress = useCallback(async () => {
    if (!signer || !contract) return;

    // Get EVM address
    const signerAddress = await signer.getAddress();

    // Initialize tokens array
    let tokens = [];

    // Get number of tokens the account has (in BigNumber)
    const accountBalance = await getAccountBalance(signerAddress);

    // Get tokens indexes
    for (let t = 0; t < accountBalance; t++) {
      const token = await contract.tokenOfOwnerByIndex(signerAddress, t);
      tokens.push(token.toNumber());
    }

    return tokens;
  }, [contract, getAccountBalance, signer]);

  const retrieveNFTs = useCallback(async () => {
    if (!contract) return;
    const tokensIds = await getTokensIndexByAddress();
    const contractURI = await contract.baseURI();

    let myNFTs = [];

    for (let token of tokensIds) {
       
    }
  }, [contract, getTokensIndexByAddress]);

  useEffect(() => {
    retrieveNFTs();
  }, [getTokensIndexByAddress, retrieveNFTs]);

  return <div>MyCollection</div>;
}
