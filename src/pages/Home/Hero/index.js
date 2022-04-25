import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Description from "./Description";
import backgroundImage from "static/png/Background.png";

const Container = styled.div`
  background-image: url(${backgroundImage});
  background-position: 50% 0;
  background-attachment: fixed;
  background-size: auto;
  padding: 10rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
`;

export default function Hero() {
  return (
    <Container>
      <Header />
      <Description />
    </Container>
  );
}
