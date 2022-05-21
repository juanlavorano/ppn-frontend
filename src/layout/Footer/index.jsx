import React from "react";
import styled from "styled-components";
import Copyright from "./Copyright";
import Socials from "./Socials";
import Divider from "@components/Divider";

const FooterContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.black};
  height: 5rem;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Copyright />
      <Divider />
      <Socials />
    </FooterContainer>
  );
}
