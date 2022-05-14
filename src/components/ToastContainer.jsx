import React from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer as ToastifyContainer } from "react-toastify";

const NotificationContainer = styled(ToastifyContainer)`
  --toastify-color-light: ${(props) => props.theme.colors.secondaryLight};
`;

export default function ToastContainer() {
  return <NotificationContainer />;
}
