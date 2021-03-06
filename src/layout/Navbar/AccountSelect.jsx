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
import { down, breakpoints } from "@styles/devices";

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

const modalEntryAnim = css`
  animation: ${swipeRightToLeft} 0.2s cubic-bezier(0.83, 0, 0.17, 1) forwards;
`;

const modalExitAnim = css`
  animation: ${swipeLeftToRight} 0.2s cubic-bezier(0.83, 0, 0.17, 1) forwards;
`;

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;

  ${down(breakpoints.laptop)} {
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 99;
  }
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
  z-index: 100;

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
  const [isAllowanceModalOpen, setIsAllowanceModalOpen] = useState(false);

  const [alert, setAlert] = useState({
    isSelectAccountOpen: false,
  });

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
                              onTouchStart={() => handleAccountChange(account)}
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
          </BackDrop>
        )}
      </LazyMotion>
    </>
  );
};

export default AccountSelect;
