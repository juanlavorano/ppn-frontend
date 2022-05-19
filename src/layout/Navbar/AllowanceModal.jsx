import React from "react";
import Modal from "@components/Modal";
import styled from "styled-components";
import useContract from "@hooks/useContract";
import { PPN_ADDRESS } from "@constants/address";
import useAccounts from "@hooks/useAccounts";

const Button = styled.button`
  color: ${(props) => props.theme.colors.white};
  outline: none;
  border-radius: 50px;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  padding: 0.625rem;
  &[disabled] {
    background: ${(props) => props.theme.colors.disabled};
    pointer-events: none;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AcceptButton = styled(Button)`
  background: ${(props) => props.theme.colors.primary};
  border: none;
`;

const CancelButton = styled(Button)`
  color: ${(props) => props.theme.colors.black};
  border: 1px solid ${(props) => props.theme.colors.black};
  background: ${(props) => props.theme.colors.white};
`;

export default function AllowanceModal({ isOpen, setIsOpen }) {
  const { reefERC20Contract } = useContract();
  const { disconnectAccount, signer } = useAccounts();

  const approveContract = async () => {
    if (reefERC20Contract) {
      // Send contract approval for 100M reef, so that allowance shouldn't be asked for again
      const response = await reefERC20Contract.approve(
        PPN_ADDRESS,
        100000000000000000000000000n
      );

      return response;
    }
  };

  const handleAccept = async () => {
    try {
      setIsOpen(false);

      const evmAddress = await signer.queryEvmAddress();
      await approveContract(evmAddress);
    } catch {
      disconnectAccount();
    }
  };

  const handleCancel = async () => {
    await disconnectAccount();
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Allowance needed">
      <div>
        Allowance provided to PPN is needed to continue with the transaction. Do
        you want to proceed?
      </div>
      <ButtonsContainer>
        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        <AcceptButton onClick={handleAccept}>Accept</AcceptButton>
      </ButtonsContainer>
    </Modal>
  );
}