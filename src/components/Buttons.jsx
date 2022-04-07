import styled from "styled-components";
import { m } from "framer-motion";

const BtnBase = styled.a`
	background: ${(props) => props.theme.colors.primary};
	color: var(--app-text);
	outline: none;
	border: none;
	user-select: none;
	cursor: pointer;
	&[disabled] {
		background: ${(props) => props.theme.colors.disabled};
		pointer-events: none;
	}
`;

const BtnBaseAnimated = styled(m.a)`
  color: ${props => props.theme.colors.primary};
  outline: none;
  border: none;
  user-select: none;
  cursor: pointer;
  &[disabled] {
    background: ${props => props.theme.colors.disabled};
    pointer-events: none;
  }
`;

export { BtnBase, BtnBaseAnimated };
