import React, { useState } from "react";
import styled from "styled-components";
import useContract from "@hooks/useContract";
import useAccounts from "@hooks/useAccounts";
import useLayout from "@hooks/useLayout";
import { toast } from "react-toastify";
import { mint as mintNotification } from "@constants/notifications";
import useScreenSize from "@hooks/useResponsiveness";
import { MOBILE } from "@constants/devices";

const DescriptionContainer = styled.div`
  margin: 1em auto;
  padding: 3em 0;
  width: ${props => props.width};
  border-radius: 30px;
  background-color: ${(props) => props.theme.colors.white};
  opacity: 0.7;
`;

const DescriptionText = styled.p`
  font-weight: 600;
  padding: 0 3em;
  margin-bottom: 2em;
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
  const { mint } = useContract();
  const { selectedAccount } = useAccounts();
  const { setIsSelectAccountOpen } = useLayout();
  const [isProcessing, setIsProcessing] = useState(false);
  const {currentDevice} = useScreenSize()

  const handleMint = async () => {
    if (!selectedAccount)
      return setIsSelectAccountOpen((prevState) => !prevState);

    try {
      setIsProcessing(true);
      await mint();

      setIsProcessing(false);
      toast.success(mintNotification.success, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch {
      toast.error(mintNotification.error, {
        position: "bottom-center",
      });
      setIsProcessing(false);
    }
  };

  return (
    <DescriptionContainer width={currentDevice === MOBILE ? '75%' : '50%'}>
      <DescriptionText>
      <strong>PPN</strong> is an NFT project on the Reef blockchain. Each of
        these 10,000 PPNs has attributes that make them unique according to a
        defined rarity system.
        Minting price = 14.000 <strong>Reef</strong> 
      </DescriptionText>
      <Mint onClick={handleMint} disabled={isProcessing}>
        {selectedAccount ? "Mint" : "Choose an account to MINT"}
      </Mint>
    </DescriptionContainer>
  );
}
