import React from "react";
import styled from "styled-components";
import useScreenSize from "@hooks/useResponsiveness";
import Card from "@components/Card";
import ppn from "@static/jpeg/PPN_1.jpeg";
import reef from "@static/jpeg/Reef.jpeg";
import ipfs from "@static/png/Ipfs-logo-1024-ice-text.png";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.black};
  padding: 10rem;
  display: flex;
  height: 100vh;
  overflow-y: hidden;
  justify-content: space-between;
  align-items: center;
`;

export default function CardsSection() {
  const { currentDevice } = useScreenSize();

  return (
    <Container currentDevice={currentDevice}>
      <Card backgroundImage={ppn}>PPN 😎</Card>
      <Card backgroundImage={ipfs}>Stored on IPFS</Card>
      <Card backgroundImage={reef}> Powered by Reef blockchain</Card>
    </Container>
  );
}
