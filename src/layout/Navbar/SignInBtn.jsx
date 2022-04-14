import React, { useState } from "react";
import styled from "styled-components";
import AccountSelect from "./AccountSelect";
import { LazyMotion, domAnimation } from "framer-motion";
import { BtnBaseAnimated } from "components/Buttons";
import useAccounts from "hooks/useAccounts";

const Btn = styled(BtnBaseAnimated)`
  display: flex;
  align-items: center;
  font-weight: 700;
  padding: 0 1.25rem;
  border-radius: 1000rem;
  height: 2.5rem;
  z-index: 2;
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
  const [isOpen, setIsOpen] = useState(false);
  const { selectedAccount } = useAccounts();

  const handleOpen = () => setIsOpen((prevState) => !prevState);

  return (
    <LazyMotion features={domAnimation}>
      <AnimBtn onClick={handleOpen}>
        {selectedAccount ? selectedAccount.meta.name : "Choose account"}
      </AnimBtn>
      <AccountSelect isActive={isOpen} setIsActive={setIsOpen} />
    </LazyMotion>
  );
};

export default SignInBtn;
