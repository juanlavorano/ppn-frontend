import React from "react";
import Modal from "@components/Modal";
import styled from "styled-components";
import useContract from "@hooks/useContract";
import { PPN_ADDRESS } from "@constants/address";
import useAccounts from "@hooks/useAccounts";
import { toast } from "react-toastify";
import { allowance } from "@constants/notifications";
import { ALLOWANCE_AMOUNT } from "@constants/app";

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -5%);
  position: absolute;
  display: ${(props) => !props.isOpen && 'none'};
`;

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
      // Send contract approval for 100000000000000000000000000 wei, so that allowance shouldn't be asked for again
      const response = await reefERC20Contract.approve(
        PPN_ADDRESS,
        ALLOWANCE_AMOUNT
      );

      return response;
    }
  };

  const handleAccept = async () => {
    try {
      setIsOpen(false);

      const evmAddress = await signer.queryEvmAddress();
      const approve = await approveContract(evmAddress);

      if (approve) {
        toast.success(allowance.success, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch {
      toast.error(allowance.error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      disconnectAccount();
    }
  };

  const handleCancel = async () => {
    await disconnectAccount();
    setIsOpen(false);
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={handleCancel}
        title="Allowance needed"
      >
        <div>
          You need to provide allowance to PPN in order to mint. Do you want to
          proceed?
        </div>
        <ButtonsContainer>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
          <AcceptButton onClick={handleAccept}>Accept</AcceptButton>
        </ButtonsContainer>
      </Modal>
    </ModalContainer>
  );
}
