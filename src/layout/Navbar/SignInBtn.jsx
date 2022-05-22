import React, { useCallback } from "react";
import styled from "styled-components";
import AccountSelect from "./AccountSelect";
import { LazyMotion, domAnimation } from "framer-motion";
import { BtnBaseAnimated } from "components/Buttons";
import useAccounts from "hooks/useAccounts";
import useLayout from "@hooks/useLayout";
import { breakpoints, down } from "@styles/devices";

const Btn = styled(BtnBaseAnimated)`
  display: flex;
  align-items: center;
  font-weight: 700;
  padding: 0 1.25rem;
  border-radius: 1000rem;
  height: 2.5rem;
  z-index: 2;
  
  ${down(breakpoints.laptop)} {
    color: white;
    padding: 0;
  }
`;

const AnimBtn = ({ children, onClick }) => (
  <Btn
    whileTap={{
      scale: 0.97,
    }}
    onClick={onClick}
  >
    {children}
  </Btn>
);

const SignInBtn = () => {
  const { setIsSelectAccountOpen } = useLayout();
  const { selectedAccount } = useAccounts();

  const handleOpen = () => setIsSelectAccountOpen((prevState) => !prevState);

  const buttonText = useCallback(() => {
    if (selectedAccount) {
      return selectedAccount.meta.name;
    } else {
      return "Choose account";
    }
  }, [selectedAccount]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimBtn onClick={handleOpen}>{buttonText()}</AnimBtn>
      <AccountSelect />
    </LazyMotion>
  );
};

export default SignInBtn;
