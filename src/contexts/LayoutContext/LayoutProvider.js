import React, { useState } from "react";
import LayoutContext from "./LayoutContext";

export default function AccountsProvider({ children }) {
  const [isSelectAccountOpen, setIsSelectAccountOpen] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        isSelectAccountOpen,
        setIsSelectAccountOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
