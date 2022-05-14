import React, { useState, useEffect, useCallback } from "react";
import useAccounts from "@hooks/useAccounts";
import useContract from "@hooks/useContract";
import styled from "styled-components";

const RootContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  grid-gap: 1rem;
`;

const ImgContainer = styled.div`
  max-width: 21.875rem;
  padding: 10px;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 0.625rem;
`;

const ImgName = styled.h6`
  font-size: 0.875rem;
  font-weight: 900;
`;

export default function MyCollection() {
  const { signer } = useAccounts();
  const contract = useContract();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [myNFTs, setMyNFTs] = useState([]);

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

    setLoading(true);

    const tokensIds = await getTokensIndexByAddress();
    if (!tokensIds) return setError({ message: "You have no tokens" });

    const contractURI = await contract.baseURI();

    let myNFTs = [];

    for (let token of tokensIds) {
      myNFTs.push({
        url: `https://gateway.pinata.cloud/ipfs/${contractURI}/${token}.png`,
        id: token,
      });
    }

    setMyNFTs(myNFTs);
    setLoading(false);
  }, [contract, getTokensIndexByAddress]);

  useEffect(() => {
    retrieveNFTs();
  }, [retrieveNFTs]);

  return (
    <RootContainer>
      {loading && <p>Loading</p>}
      {error && <p>{error.message}</p>}

      {!!myNFTs.length &&
        myNFTs.map((nft) => (
          <ImgContainer>
            <Img src={nft.url} alt={`nft-${nft.id}`} />
            <ImgName>#{nft.id}</ImgName>
          </ImgContainer>
        ))}
    </RootContainer>
  );
}
