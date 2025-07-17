import { createContext, useContext } from "react";
import type { Store } from "./useStore";

export const StoreContext = createContext<Store | null>(null);

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within StoreProvider");
  }
  return context;
};