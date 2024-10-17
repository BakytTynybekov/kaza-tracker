import { createContext, useEffect, useState } from "react";

export const GeneralContext = createContext();

function GeneralContextProvider({ children }) {
  const contextData = {};
  return (
    <GeneralContext.Provider value={contextData}>
      {children}
    </GeneralContext.Provider>
  );
}

export default GeneralContextProvider;
