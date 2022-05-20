import React from "react";
import styled from "styled-components";
import Discord from "@static/svg/Discord.svg";
import Twitter from "@static/svg/Twitter.svg";

const SocialIcon = styled.img`
  width: 1.5rem;
  margin: 0.5rem;
  cursor: pointer;
  filter: brightness(70%);
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: brightness(100%);
  }
`;
export default function Socials() {
  return (
    <>
      <a href="https://twitter.com/PPNtwrk" target="_blank" rel="noreferrer">
        <SocialIcon src={Twitter} alt="twitter icon" />
      </a>
      <a href="https://discord.gg/9MtxqP5kNb" target="_blank" rel="noreferrer">
        <SocialIcon src={Discord} alt="discord icon" />
      </a>
    </>
  );
}
