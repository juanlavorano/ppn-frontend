import React, { useState } from "react";
import styled from "styled-components";
import useContract from "@hooks/useContract";
import useAccounts from "@hooks/useAccounts";
import useLayout from "@hooks/useLayout";
import { toast } from "react-toastify";
import { mint } from "@constants/notifications";

const DescriptionContainer = styled.div`
  flex: 1;
  margin: auto;
  padding: 1em 3em;
  width: 50%;
  border-radius: 30px;
  background-color: ${(props) => props.theme.colors.white};
  opacity: 0.7;
`;

const DescriptionText = styled.p`
  margin: 1.5em 0;
  font-weight: 600;
`;

const Mint = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  outline: none;
  margin-left: 15%;
  width: 75%;
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
  font-size: 1.5em;
  transition: filter 100ms linear;
  &:active {
    filter: brightness(120%);
  }
`;

export default function Description() {
  const contract = useContract();
  const { selectedAccount } = useAccounts();
  const { setIsSelectAccountOpen } = useLayout();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMint = async () => {
    if (!selectedAccount)
      return setIsSelectAccountOpen((prevState) => !prevState);

    try {
      if (contract) {
        setIsProcessing(true);
        await contract.mint();
      }

      toast.success(mint.success, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsProcessing(false);
    } catch {
      toast.error(mint.error, {
        position: "bottom-center",
      });
      setIsProcessing(false);
    }
  };

  return (
    <DescriptionContainer>
      <DescriptionText>
        <strong>PPN</strong> is an NFTs project on the Reef blockchain. Each of
        these 10,000 PPNs has attributes that make them unique according to a
        defined rarity system.
      </DescriptionText>
      <Mint onClick={handleMint} disabled={isProcessing}>
        {selectedAccount ? "Mint" : "Choose an account to MINT"}
      </Mint>
    </DescriptionContainer>
  );
}
