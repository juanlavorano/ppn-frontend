import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from "styled-components";

const Content = styled.div`
  min-height: 100vh;
`;

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
