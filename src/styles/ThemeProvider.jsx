import React from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";

export default function ThemeProvider({ children }) {
  const theme = {
    colors: {
      primary: "#55286F",
      secondary: "#D8B4E2",
      background: "#210B2C",
      gray: "#909090",
      white: "#FFFFFF",
      black: "#0D0411",

      disabled: "8A8A8A8A"
    },
  };

  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
}
