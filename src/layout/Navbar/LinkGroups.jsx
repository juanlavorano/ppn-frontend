import React from "react";
import useResponsiveness from "@hooks/useResponsiveness";
import { DESKTOP } from "@constants/devices";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SignInBtn from "./SignInBtn";

const LinkContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.device === DESKTOP ? "row" : "column")};
  background: ${(props) =>
    props.device !== DESKTOP && props.theme.colors.primary};

  padding: 1em;
  border-radius: 1em;
  align-items: flex-end;

  .nav-selected {
    margin: ${(props) => (props.device === DESKTOP ? "0 0.5em" : "0.5em 0")};
    text-decoration: none;
    color: ${(props) => props.theme.colors.secondary} !important;
  }

  .nav-links {
    display: flex;
    justify-content: flex-end;
    text-decoration: none;
    margin: ${(props) => (props.device === DESKTOP ? "0 0.5em" : "0.5em 0")};
    color: ${(props) =>
      props.isAtTop ? props.theme.colors.black : props.theme.colors.white};
    transition: color 0.2s ease;
    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
  transition: color 0.4s ease;
`;

const LinkGroups = ({ isAtTop }) => {
  const { currentDevice } = useResponsiveness();

  const routes = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Collection",
      link: "/collection",
    },
    {
      name: "Roadmap",
      link: "/roadmap",
    },
  ];

  return (
    <LinkContainer isAtTop={isAtTop} device={currentDevice}>
      {routes.map((route) => (
        <NavLink
          key={route.link}
          to={route.link}
          className={(navData) =>
            navData.isActive ? "nav-selected" : "nav-links"
          }
        >
          {route.name}
        </NavLink>
      ))}
      {currentDevice !== DESKTOP && <SignInBtn />}
    </LinkContainer>
  );
};

export default LinkGroups;
