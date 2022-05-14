import React from "react";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "styles/ThemeProvider";
import ReefNetworkProvider from "@contexts/ReefNetworkContext/ReefNetworkProvider";
import AccountsProvider from "@contexts/AccountsContext/AccountsProvider";
import LayoutProvider from "@contexts/LayoutContext/LayoutProvider";
import { createRoutes, routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <ReefNetworkProvider>
          <AccountsProvider>
            <ThemeProvider>{createRoutes(routes)}</ThemeProvider>
          </AccountsProvider>
        </ReefNetworkProvider>
      </LayoutProvider>
    </BrowserRouter>
  );
}

export default App;
