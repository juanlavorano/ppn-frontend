import React, { useEffect, useState } from "react";
import Divider from "@components/Divider";
import LinkGroups from "./LinkGroups";
import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";
import SignInBtn from "./SignInBtn";
import { useCycle } from "framer-motion";
import styled from "styled-components";
import useResponsiveness from "@hooks/useResponsiveness";
import { DESKTOP } from "@constants/devices";
import Logo from "@components/Logo";
import colors from "@styles/colors";

const Nav = styled.nav`
  position: sticky;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.25rem;
  padding: 2.5rem 3.75rem;
  backdrop-filter: ${(props) =>
    props.blur ? `blur(5px) brightness(0.75)` : `none`};
  z-index: 50;
  top: 0;
  transition: backdrop-filter 0.2s ease;
  &:after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    background: ${(props) => props.theme.colors.primary}
    height: 1px;
    width: 100%;
    display: block;
    opacity: ${(props) => (props.blur ? `1` : `0`)};
    z-index: -1;
  }

  padding: 1.25rem 1.5rem;
`;

const LogoContainer = styled.a`
  cursor: pointer;
  user-select: none;
  display: inline-block;
  align-items: center;
  font-weight: 900;
  text-decoration: none;
  span,
  svg {
    vertical-align: middle;
  }
  span {
    padding-left: 0.5rem;
  }

  font-size: 1.5rem;
`;

const ContentContainer = styled.div`
  display: grid;
  place-items: center;
  grid-auto-flow: column;
  gap: 1rem;
`;

const Navbar = React.memo(() => {
  const [isAtTop, setIsAtTop] = useState(true);
  const { currentDevice } = useResponsiveness();
  const [isOpen, toggleOpen] = useCycle(false, true);
  const offsetLimit = 20;

  useEffect(() => {
    window.onscroll = () => {
      isAtTop === true && setIsAtTop(false);
      window.pageYOffset <= offsetLimit && setIsAtTop(true);
    };
    return () => (window.onscroll = null);
  });

  return (
    <Nav blur={!isAtTop}>
      <LogoContainer href="/" className="animate-icon">
        <Logo height={30} color={colors.background} />
      </LogoContainer>
      <ContentContainer>
        {currentDevice === DESKTOP ? (
          <>
            <LinkGroups isAtTop={isAtTop} />
            <Divider />
            <SignInBtn />
          </>
        ) : (
          <>
            <MenuToggle isOpen={isOpen} toggleOpen={toggleOpen} />
            <Navigation isOpen={isOpen} />
          </>
        )}
      </ContentContainer>
    </Nav>
  );
});

export default Navbar;
