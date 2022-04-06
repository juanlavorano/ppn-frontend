import React, { useState, useEffect, useCallback } from "react";
import PolkadotApiContext from "./PolkadotApiContext";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { REEF_WS_TESTNET } from "constants/networks";

export default function PolkadotApiProvider({ children }) {
  const [chain, setChain] = useState(null);
  const [nodeName, setNodeName] = useState(null);
  const [nodeVersion, setNodeVersion] = useState(null);
  const [api, setApi] = useState(null);

  const connect = useCallback(async () => {
    // Initialise the provider to connect to the local node
    const provider = new WsProvider(REEF_WS_TESTNET);

    // Create the API and wait until ready
    const api = await ApiPromise.create({ provider });

    // Retrieve the chain & node information information via rpc calls
    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
    ]);

    if (chain) return { chain, nodeName, nodeVersion, api };
  }, []);

  useEffect(() => {
    const { chain, nodeName, nodeVersion, api } = connect();

    setChain(chain);
    setNodeName(nodeName);
    setNodeVersion(nodeVersion);
    setApi(api);
  }, [connect]);

  return (
    <PolkadotApiContext.Provider value={{ chain, nodeName, nodeVersion, api }}>
      {children}
    </PolkadotApiContext.Provider>
  );
}
