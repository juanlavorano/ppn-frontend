import React from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import colors from "./colors";

export default function ThemeProvider({ children }) {
  const theme = {
    colors,
  };

  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
}
