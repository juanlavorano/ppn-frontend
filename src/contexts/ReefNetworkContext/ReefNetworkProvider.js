import React, { useState, useEffect, useCallback } from "react";
import PolkadotApiContext from "./ReefNetworkContext";
import { WsProvider } from "@polkadot/api";
import { REEF_WS_MAINNET } from "@constants/networks";
import { Provider } from "@reef-defi/evm-provider";

export default function PolkadotApiProvider({ children }) {
  const [provider, setProvider] = useState(null);

  const connect = useCallback(async () => {
    // Initialise the provider to connect to the local node

    const provider = new Provider({
      provider: new WsProvider(REEF_WS_MAINNET),
    });

    await provider.api.isReady;

    setProvider(provider);
  }, []);

  useEffect(() => {
    connect();
  }, [connect]);

  return (
    <PolkadotApiContext.Provider value={{ provider }}>
      {children}
    </PolkadotApiContext.Provider>
  );
}
