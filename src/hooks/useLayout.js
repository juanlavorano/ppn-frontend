import { useContext } from "react";
import LayoutContext from "@contexts/LayoutContext/LayoutContext";

export function useLayout() {
  return useContext(LayoutContext);
}

export default useLayout;
