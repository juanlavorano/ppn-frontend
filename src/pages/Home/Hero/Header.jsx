import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.h1`
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

const HighlightedSpan = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;

export default function Header() {
  return (
    <HeaderContainer>
      <div>
        Buy <HighlightedSpan>Guardians</HighlightedSpan>
      </div>
      <div>
        Buy <HighlightedSpan>Reef</HighlightedSpan>
      </div>
    </HeaderContainer>
  );
}
