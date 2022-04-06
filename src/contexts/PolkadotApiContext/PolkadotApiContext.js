import { createContext } from "react";
const PolkadotApiContext = createContext({
  chain: null,
  nodeName: null,
  nodeVersion: null,
});

export default PolkadotApiContext;
