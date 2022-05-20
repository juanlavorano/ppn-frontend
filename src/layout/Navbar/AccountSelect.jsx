import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import styled, { css, keyframes } from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import "simplebar/src/simplebar.css";
import SimpleBar from "simplebar-react";
import { useEscape, useAccounts } from "@hooks";
import { truncateAddress } from "@utils/formatters";
import useLayout from "@hooks/useLayout";
import useContract from "@hooks/useContract";
import { MIN_APPROVE_REEF } from "@constants/app";
import AllowanceModal from "./AllowanceModal";

const StyledSimpleBar = styled(SimpleBar)`
  min-width: 12rem;
  p:not(:first-child) {
    margin-top: 0.5rem;
  }
  .simplebar-track.simplebar-horizontal .simplebar-scrollbar:before,
  .simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
    background: hsl(230, 36%, 4%);
  }
`;

const swipeRightToLeft = keyframes`
	0% {
		transform: translateX(100%);
		opacity: 0;
	}
	100% {
		transform: translateX(0);
		opacity: 1;
	}
`;

const swipeLeftToRight = keyframes`
	0% {
		transform: translateX(0);
		opacity: 1;
	}
	100% {
		transform: translateX(100%);
		opacity: 0;
	}
`;

const swipeDownwards = keyframes`
	0% {
		transform: translate(-50%,-100px);
		opacity: 0;
	}
	100% {
		transform: translate(-50%,0);
		opacity: 1;
	}
`;

const swipeUpwards = keyframes`
	0% {
		transform: translate(-50%,0);
		opacity: 1;
	}
	100% {
		transform: translate(-50%,-100px);
		opacity: 0;
	}
`;

const modalEntryAnim = css`
  animation: ${swipeRightToLeft} 0.2s cubic-bezier(0.83, 0, 0.17, 1) forwards;
`;

const modalExitAnim = css`
  animation: ${swipeLeftToRight} 0.2s cubic-bezier(0.83, 0, 0.17, 1) forwards;
`;

const alertEntryAnim = css`
  animation: ${swipeDownwards} 0.2s cubic-bezier(0.83, 0, 0.17, 1) forwards;
`;

const alertExitAnim = css`
  animation: ${swipeUpwards} 0.2s cubic-bezier(0.83, 0, 0.17, 1) forwards;
`;

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const Modal = styled.div`
  position: absolute;
  right: 0;
  margin-right: 4rem;
  margin-top: 7rem;
  padding: 2rem 1.5rem;
  padding-top: 1.5rem;
  background: hsl(240, 10%, 16%);
  border-radius: 0.5rem;
  z-index: 100;
  min-width: 14rem;
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .close-btn {
    background: hsl(236, 10%, 23%);
    color: hsl(240, 6%, 75%);
    position: absolute;
    top: 0.675rem;
    right: 0.675rem;
    padding: 0.125rem;
    border-radius: 1000rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      width: 1.25rem;
      height: 1.25rem;
      stroke: hsl(240, 6%, 75%);
      stoke-width: 0.125rem;
    }
    opacity: 0;
    display: none;
  }
  &:hover {
    .close-btn {
      opacity: 1;
      display: flex;
    }
  }
  .account-name {
    line-height: 1;
    font-size: 1.5rem;
    user-select: none;
    color: hsl(240, 6%, 75%);
    background: hsl(236, 10%, 23%);
    padding: 1rem 1.25rem;
    cursor: pointer;
    border-radius: 0.25rem;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  label {
    display: block;
    color: hsl(240, 6%, 75%);
    cursor: pointer;
    font-weight: 400;
    font-size: 1rem;
    margin-top: 0.25rem;
  }
  ${(props) => (!props.remove ? modalEntryAnim : modalExitAnim)}
`;

const Title = styled.h1`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: hsl(240, 6%, 75%);
`;

const networkButtonStyles = css`
  --app-theme-opacity: 0.25;
  --app-theme-text: rgb(211 231 255);
  border: solid 0.15rem rgb(13, 104, 216);
  background: rgba(13, 104, 216, 0.5);
  color: rgb(211 231 255);
`;

const Button = styled(m.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: 700;
  padding: 0.675rem 1.25rem;
  border-radius: 0.5rem;
  background: hsl(236, 10%, 23%);
  outline: none;
  border: none;
  cursor: pointer;
  z-index: 2;
  user-select: none;
  ${(props) => props.network && networkButtonStyles};
`;

const Alert = styled.div`
  position: absolute;
  margin-top: 7rem;
  left: 50%;
  transform: translateX(-50%);
  max-width: 24rem;
  margin-right: 0;
  width: fit-content;
  margin-top: 7rem;
  padding: 2rem 1.5rem;
  padding-top: 1.5rem;
  background: hsl(240, 10%, 16%);
  border-radius: 0.5rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  ${(props) => (!props.remove ? alertEntryAnim : alertExitAnim)}
`;

const Content = styled.p`
  padding-top: 0.25rem;
  padding-bottom: 1rem;
  font-size: 1.125rem;
  color: hsl(240, 6%, 75%);
`;

const elemContains = (rect, x, y) => {
  return rect
    ? rect.x <= x &&
        x <= rect.x + rect.width &&
        rect.y <= y &&
        y <= rect.y + rect.height
    : false;
};

const AccountSelect = () => {
  const { isSelectAccountOpen, setIsSelectAccountOpen } = useLayout();
  const { getAddressAllowance } = useContract();
  const [elemIsVisible, setElemIsVisible] = useState(isSelectAccountOpen);
  const { accounts, selectAccount, signer } = useAccounts();
  const initialClaimButtonText = "I Accept";
  const [isAllowanceModalOpen, setIsAllowanceModalOpen] = useState(false);
  // eslint-disable-next-line
  const [claimButtonText, setClaimButtonText] = useState(
    initialClaimButtonText
  );

  const [alert, setAlert] = useState({
    isSelectAccountOpen: false,
  });
  const [alertIsVisible, setAlertIsVisible] = useState(
    alert.isSelectAccountOpen
  );
  const modalRef = useRef();
  const alertRef = useRef();

  const handleAccountChange = async (account) => {
    const matchedAccount = accounts.find(
      (acc) => acc.address === account.address
    );

    await selectAccount(matchedAccount);

    setIsSelectAccountOpen(false);
  };

  const handleCheckAllowance = useCallback(async () => {
    if (signer) {
      // Get evm addres from signer
      const evmAddress = await signer.queryEvmAddress();

      // Check signer's allowance
      const allowance = await getAddressAllowance(evmAddress);

      // If allowance is not enough for one NFT, prompt mesasge to ask for it
      if (allowance < MIN_APPROVE_REEF) {
        setIsAllowanceModalOpen(true);
      }
    }
  }, [getAddressAllowance, setIsAllowanceModalOpen, signer]);

  // Check account allowance effect
  useEffect(() => {
    handleCheckAllowance();
  }, [handleCheckAllowance]);

  // Toggle select account menu effect
  useEffect(() => {
    if (isSelectAccountOpen === false) {
      setTimeout(() => {
        setElemIsVisible(isSelectAccountOpen);
      }, 200);
    } else {
      setElemIsVisible(isSelectAccountOpen);
    }
  }, [isSelectAccountOpen]);

  useEffect(() => {
    if (alert.isSelectAccountOpen === false) {
      setTimeout(() => {
        setAlertIsVisible(alert.isSelectAccountOpen);
      }, 200);
    } else {
      setAlertIsVisible(alert.isSelectAccountOpen);
    }
  }, [alert.isSelectAccountOpen]);

  const closeModal = () => {
    setAlert({
      ...alert,
      isSelectAccountOpen: false,
    });
    setIsSelectAccountOpen(false);
  };

  useLayoutEffect(() => {
    setIsSelectAccountOpen(false);
    //eslint-disable-next-line
  }, []);

  const handleClickOutside = (e) => {
    let rect = modalRef?.current?.getBoundingClientRect();
    let rect2 = alertRef?.current?.getBoundingClientRect();
    if (
      !elemContains(rect, e.clientX, e.clientY) &&
      !elemContains(rect2, e.clientX, e.clientY)
    ) {
      closeModal();
    }
  };

  useEscape(() => {
    closeModal();
  });

  return (
    <>
      <AllowanceModal
        setIsOpen={setIsAllowanceModalOpen}
        isOpen={isAllowanceModalOpen}
      />

      <LazyMotion features={domAnimation}>
        {elemIsVisible && (
          <BackDrop
            remove={!isSelectAccountOpen}
            onMouseDown={handleClickOutside}
            onTouchStart={handleClickOutside}
          >
            <Modal remove={!isSelectAccountOpen} ref={modalRef}>
              <Title>Choose an account</Title>
              <StyledSimpleBar style={{ maxHeight: 300 }}>
                {accounts?.length ? (
                  <>
                    {accounts
                      ? accounts.map((account, index) => {
                          return (
                            <m.p
                              onClick={() => handleAccountChange(account)}
                              className="account-name"
                              whileHover={{
                                y: -2.5,
                                x: 0,
                              }}
                              whileTap={{
                                scale: 0.99,
                              }}
                              key={index}
                            >
                              {account.meta.name}
                              <label title={account.address}>
                                {truncateAddress(account.address)}
                              </label>
                            </m.p>
                          );
                        })
                      : null}
                  </>
                ) : (
                  "Please connect your wallet"
                )}
              </StyledSimpleBar>
            </Modal>
            {alertIsVisible && (
              <Alert remove={!alert.isSelectAccountOpen} ref={alertRef}>
                <Title>Claim EVM Account</Title>
                <Content>
                  EVM account not claimed.
                  <br />
                  Please claim it and try logging in again.
                  <br />
                  You will need some Reef in order to pay for the transaction.
                </Content>
                <Button
                  whileHover={{
                    y: -5,
                    x: 0,
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.99,
                  }}
                >
                  {claimButtonText}
                </Button>
              </Alert>
            )}
          </BackDrop>
        )}
      </LazyMotion>
    </>
  );
};

export default AccountSelect;
