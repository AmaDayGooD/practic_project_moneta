import { useState } from "react";
import type { VacancyItem } from "../types/Vacancy.ts";

type Tab = "about" | "vacancies" | "selectedVacancy";

export type Store = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  selectedVacancy: VacancyItem | null;
  setSelectedVacancy: (vacancy: VacancyItem | null) => void;
};

export const useStore = (): Store => {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyItem | null>(null);

  console.log(selectedVacancy, activeTab);

  return {
    activeTab,
    setActiveTab,
    selectedVacancy,
    setSelectedVacancy,
  };
};