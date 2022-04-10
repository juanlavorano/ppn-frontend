import React from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";

export default function ThemeProvider({ children }) {
  const theme = {
    colors: {
      primary: "#55286F",
      secondary: "#8958A3",
      background: "#210B2C",
      backgroundLight: "#FFE8FF",
      gray: "#00C9B4",
      white: "#FFFFFF",
      black: "#0D0411",

      disabled: "#8A8A8A",
    },
  };

  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
}
