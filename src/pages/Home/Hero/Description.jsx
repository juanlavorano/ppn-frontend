import React from "react";
import styled from "styled-components";
import { BtnBase } from "components/Buttons";
import useContract from "@hooks/useContract";

const DescriptionContainer = styled.div`
  flex: 1;
  margin: auto;
  padding: 0 15rem;
`;

const DescriptionText = styled.p`
  margin: 1.5em 0;
  font-weight: 600;
`;

const Mint = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  outline: none;
  margin-left: 10px;
  border: none;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  &[disabled] {
    background: ${(props) => props.theme.colors.disabled};
    pointer-events: none;
  }
  padding: 0.625em 1.25em;
  border-radius: 3.125em;
  font-size: 1.125em;
  transition: filter 100ms linear;

  &:active {
    filter: brightness(120%);
  }
`;

export default function Description() {
  const contract = useContract();

  const handleMint = async () => {
    if (contract) {
      contract.mint();
    }
  };

  return (
    <DescriptionContainer>
      <DescriptionText>
        PPN is an NFTs project on the Reef blockchain. Each of these 10,000 PPNs
        has attributes that make them unique according to a defined rarity
        system.
      </DescriptionText>
      <Mint onClick={handleMint}>Mint</Mint>
    </DescriptionContainer>
  );
}
