import React from "react";
import PolkadotApiProvider from "contexts/PolkadotApiContext/PolkadotApiProvider";
import AccountsProvider from "contexts/AccountsContext/AccountsProvider";
import Home from "pages/Home";

function App() {
  return (
    <PolkadotApiProvider>
      <AccountsProvider>
        <Home />
      </AccountsProvider>
    </PolkadotApiProvider>
  );
}

export default App;
