import Logo from "@components/Logo";
import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <Logo size="20" />
    </LoadingContainer>
  );
};

export default Loading;
