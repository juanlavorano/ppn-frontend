import React from "react";
import useResponsiveness from "hooks/useResponsiveness";
import { DESKTOP } from "constants/devices";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const LinkContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 1.5rem;
  .nav-selected {
    text-decoration: none;
    color: ${(props) => props.theme.colors.secondary} !important;
  }
  .nav-links {
    text-decoration: none;
    color: ${(props) => props.theme.colors.black};
    transition: color 0.2s ease;
    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const InfoContainer = styled.div`
  margin-top: 3rem;
  display: grid;
  font-size: 1rem;
  gap: 0.5rem;
  a {
    text-decoration: underline !important;
    text-underline-offset: 10%;
    text-decoration-thickness: 0.1rem;
  }
`;

const LinkGroups = () => {
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
  ];
  return (
    <LinkContainer>
      <>
        {routes.map((route) => (
          <NavLink
            key={route.link}
            to={route.link}
            end
            className={(navData) =>
              navData.isActive ? "nav-selected" : "nav-links"
            }
          >
            {route.name}
          </NavLink>
        ))}
      </>

      {currentDevice !== DESKTOP && (
        <InfoContainer>
          <NavLink
            to="/terms-of-service"
            end
            className={(navData) =>
              navData.isActive ? "nav-selected" : "nav-links"
            }
          >
            Terms of Service
          </NavLink>
          <NavLink
            to="/privacy-policy"
            end
            className={(navData) =>
              navData.isActive ? "nav-selected" : "nav-links"
            }
          >
            Privacy Policy
          </NavLink>
        </InfoContainer>
      )}
    </LinkContainer>
  );
};

export default LinkGroups;
