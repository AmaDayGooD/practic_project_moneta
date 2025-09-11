import { useStore } from "./useStore";
import type { FC, ReactNode } from "react";
import { StoreContext } from "./storeContext";

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const store = useStore();
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};