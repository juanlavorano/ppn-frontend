import React from "react";
import ThemeProvider from "styles/ThemeProvider";
import PolkadotApiProvider from "contexts/PolkadotApiContext/PolkadotApiProvider";
import AccountsProvider from "contexts/AccountsContext/AccountsProvider";
import Home from "pages/Home";
import Layout from "layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <PolkadotApiProvider>
        <AccountsProvider>
          <ThemeProvider>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              ></Route>
            </Routes>
          </ThemeProvider>
        </AccountsProvider>
      </PolkadotApiProvider>
    </BrowserRouter>
  );
}

export default App;
