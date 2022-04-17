import React from "react";
import ThemeProvider from "styles/ThemeProvider";
import ReefNetworkProvider from "@contexts/ReefNetworkContext/ReefNetworkProvider";
import AccountsProvider from "contexts/AccountsContext/AccountsProvider";
import { BrowserRouter } from "react-router-dom";
import { createRoutes, routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <ReefNetworkProvider>
        <AccountsProvider>
          <ThemeProvider>
            {createRoutes(routes)}
          </ThemeProvider>
        </AccountsProvider>
      </ReefNetworkProvider>
    </BrowserRouter>
  );
}

export default App;
