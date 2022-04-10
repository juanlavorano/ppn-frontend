import React from "react";
import ThemeProvider from "styles/ThemeProvider";
import PolkadotApiProvider from "contexts/PolkadotApiContext/PolkadotApiProvider";
import AccountsProvider from "contexts/AccountsContext/AccountsProvider";
import { BrowserRouter } from "react-router-dom";
import { createRoutes, routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <PolkadotApiProvider>
        <AccountsProvider>
          <ThemeProvider>
            {createRoutes(routes)}
          </ThemeProvider>
        </AccountsProvider>
      </PolkadotApiProvider>
    </BrowserRouter>
  );
}

export default App;
