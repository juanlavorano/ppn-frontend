import Logo from "components/Logo";
import React from "react";
import styled, { css } from "styled-components";

const padded = css`
	padding: 2rem;
`;

const LoadingContainer = styled.div`
	${props => props.navbar && padded}
`;

const Loading = ({ navbar }) => {
	return (
		<LoadingContainer navbar={navbar}>
			<Logo size="20" />
		</LoadingContainer>
	);
};

export default Loading;
