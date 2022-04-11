import React, { useState } from "react";
import styled from "styled-components";
import { LazyMotion, domAnimation } from "framer-motion";
import { BtnBaseAnimated } from "components/Buttons";

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

const SignInBtn = (values) => {
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState();
  const { accounts, connectAccount } = values.values;

  const handleOnClick = async () => {
    const injector = await connectAccount(accounts[0])
    console.log(injector);
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimBtn onClick={handleOnClick}>
        {username ? username : `Connect`}
      </AnimBtn>
    </LazyMotion>
  );
};

export default SignInBtn;
