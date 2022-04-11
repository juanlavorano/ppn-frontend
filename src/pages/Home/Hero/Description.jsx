import React from "react";
import styled from "styled-components";
import { BtnBase } from "components/Buttons";

const DescriptionContainer = styled.div`
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

export default function Description() {
  return (
    <DescriptionContainer>
      <DescriptionText>
        Guardians are NFTs on the Reef blockchain. Each of these 10,000
        Guardians has attributes that make them unique according to a defined
        rarity system.
      </DescriptionText>
      <SeeCollection to="/collection">See Collection</SeeCollection>
    </DescriptionContainer>
  );
}
