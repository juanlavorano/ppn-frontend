import React from "react";
import styled from "styled-components";

const Container = styled.div`
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
  background: ${(props) => props.theme.colors.backgroundLight};
  width: 400px;
  border-radius: 50px;
  margin: auto;
  text-align: center;
  padding: 1rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

export default function AlertSign({ children, onClick }) {
  return (
    <Container onClick={onClick}>
      <h4>{children}</h4>
    </Container>
  );
}
