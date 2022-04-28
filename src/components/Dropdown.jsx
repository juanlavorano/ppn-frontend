import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

const infoBtn = css`
  right: 0;
  font-size: 1rem;
`;

const Wrapper = styled.div`
  position: absolute;
  padding-top: 1.25rem;
  ${(props) => props.type === "help" && infoBtn};
`;

const DropdownContainer = styled.div`
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
  cursor: default;
  overflow: hidden;
  min-width: 10rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  a {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    text-decoration: none;
    color: ${(props) => props.theme.colors.white}
    white-space: nowrap;
    &:hover {
      background: hsl(236, 10%, 23%;
    }
  }
`;

const Option = styled.div``;

const Dropdown = ({ options }) => {
  return (
    <Wrapper className="dropdown-content">
      <DropdownContainer>
        {options.map((option) => (
          <Option key={option.meta.name}>{option.meta.name}</Option>
        ))}
      </DropdownContainer>
    </Wrapper>
  );
};

export default Dropdown;
