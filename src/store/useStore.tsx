import { useState } from "react";

type Tab = "about" | "vacancies";

export type Store = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
};

export const useStore = (): Store => {
  const [activeTab, setActiveTab] = useState<Tab>("about");

  return {
    activeTab,
    setActiveTab,
  };
};