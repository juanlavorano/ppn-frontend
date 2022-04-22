import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Description from "./Description";
import backgroundImage from "static/svg/background-image.svg";

const Container = styled.div`
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  padding: 10rem;
  display: flex;
  flex-direction: column;
  height: 80vh;
`;

export default function Hero() {
  return (
    <Container>
      <Header />
      <Description />
    </Container>
  );
}
