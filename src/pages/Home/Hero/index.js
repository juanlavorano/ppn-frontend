import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Description from "./Description";
import backgroundImage from "static/png/Background.png";
import ToastContainer from "@components/ToastContainer";

const Container = styled.div`
  background-image: url(${backgroundImage});
  background-position: 50% 0;
  background-attachment: fixed;
  background-size: auto;
  padding: 8rem 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

export default function Hero() {
  return (
    <Container>
      <Header />
      <Description />
      <ToastContainer />
    </Container>
  );
}
