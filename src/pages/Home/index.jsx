import React from "react";
import styled from "styled-components";
import { BtnBase } from "components/Buttons";
import backgroundImage from "static/svg/background-image.svg";

const Container = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  padding: 5rem;
  display: flex;
  height: 80vh;
`;

const Header = styled.h1`
  flex: 1;
  font-weight: 900;
  font-size: 3.5em;
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 2.5rem;
`;

const Description = styled.div`
  flex: 1;
  margin: auto;
  padding: 0.625em;
`;

const DescriptionText = styled.p`
  margin: 1.5em 0;
  font-weight: 600;
`;

const SeeCollection = styled(BtnBase)`
  padding: 0.625em 1.25em;
  border-radius: 3.125em;
  font-size: 1.125em;
  transition: filter 100ms linear;

  &:active {
    filter: brightness(120%);
  }
`;

const HighlightedSpan = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;

export default function Home() {
  return (
    <>
      <Container>
        <Header>
          <div>
            Buy <HighlightedSpan>Guardians</HighlightedSpan>
          </div>
          <div>
            Buy <HighlightedSpan>Reef</HighlightedSpan>
          </div>
        </Header>

        <Description>
          <DescriptionText>
            Guardians are NFTs on the Reef blockchain. Each of these 10,000
            Guardians has attributes that make them unique according to a
            defined rarity system.
          </DescriptionText>
          <SeeCollection to="/collection">See Collection</SeeCollection>
        </Description>
      </Container>
    </>
  );
}
