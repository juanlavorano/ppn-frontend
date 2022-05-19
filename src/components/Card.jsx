import React from "react";
import styled from "styled-components";

const CardContent = styled.p`
  margin: auto;
  opacity: 0;
  color: ${(props) => props.theme.colors.white};
  font-weight: 700;
`;

const CardContainer = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border-radius: 20px;
  width: 350px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.5s ease;
  }

  &:hover ${CardContent} {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;

export default function Card({ backgroundImage, children }) {
  return (
    <CardContainer backgroundImage={backgroundImage}>
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}
