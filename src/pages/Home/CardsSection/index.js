import React from "react";
import styled from "styled-components";
import Card from "@components/Card";
import ppn from "@static/jpeg/PPN_1.jpeg";
import reef from "@static/jpeg/Reef.jpeg";
import ipfs from "@static/png/Ipfs-logo-1024-ice-text.png";
import { down, breakpoints } from "@styles/devices";

const Section = styled.div`
  background-color: ${(props) => props.theme.colors.black};
  padding: 5rem;
  overflow-x: hidden;
`;

const CardsContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${down(breakpoints.laptop)} {
    flex-direction: column;
  }
`;

const ContainerItem = styled.div`
  flex: 1;
  margin: 1rem;
`;

export default function CardsSection() {
  return (
    <Section>
      <CardsContainer>
        <ContainerItem>
          <Card backgroundImage={ppn}>PPN 😎</Card>
        </ContainerItem>
        <ContainerItem>
          <Card backgroundImage={ipfs}>Stored on IPFS</Card>
        </ContainerItem>
        <ContainerItem>
          <Card backgroundImage={reef}> Powered by Reef blockchain</Card>
        </ContainerItem>
      </CardsContainer>
    </Section>
  );
}
