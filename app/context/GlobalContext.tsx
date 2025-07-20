"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { readLocalStorage } from "../services/local-storage";

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(readLocalStorage("isLoggedIn"));
  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context;
};
