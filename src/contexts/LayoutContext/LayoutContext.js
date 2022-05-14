import { createContext } from "react";
const LayoutContext = createContext({
  isSelectAccountOpen: false,
  setIsSelectAccountOpen: () => null,
});

export default LayoutContext;
