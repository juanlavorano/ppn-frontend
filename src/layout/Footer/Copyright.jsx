import React from "react";
import styled from "styled-components";

const CopyrightText = styled.p`
  color: ${(props) => props.theme.colors.white};
  filter: brightness(80%);
  letter-spacing: 0.0625rem;
`;

export default function Copyright() {
  return (
    <CopyrightText>
      © {new Date().getFullYear()} PPN | All Rights Reserved
    </CopyrightText>
  );
}
