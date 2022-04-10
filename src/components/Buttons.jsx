import styled from "styled-components";
import { m } from "framer-motion";
import { Link } from "react-router-dom";

const BtnBase = styled(Link)`
	background: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.white};
	outline: none;
	border: none;
	user-select: none;
	cursor: pointer;
	text-decoration: none;
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
