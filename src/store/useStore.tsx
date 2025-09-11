import { useState } from "react";
import type { VacancyItem } from "../types/Vacancy.ts";

type Tab = "about" | "vacancies" | "selectedVacancy";
type Filter = "all" | "developer" | "backoffice";

export type Store = {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  selectedVacancy: VacancyItem | null;
  setSelectedVacancy: (vacancy: VacancyItem | null) => void;
  sendCvDialog: boolean;
  setSendCvDialog: (sendCvDialog: boolean) => void;
  sentCvDialog: boolean;
  setSentCvDialog: (sentDialog: boolean) => void;
  alreadySentDialog: boolean;
  setAlreadySentDialog: (alreadySentDialog: boolean) => void;
  vacanciesFilter: Filter;
  setVacanciesFilter: (selectedFilter: Filter) => void;
};

export const useStore = (): Store => {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyItem | null>(null);
  const [sendCvDialog, setSendCvDialog] = useState<boolean>(false);
  const [sentCvDialog, setSentCvDialog] = useState<boolean>(false);
  const [alreadySentDialog, setAlreadySentDialog] = useState<boolean>(false);
  const [vacanciesFilter, setVacanciesFilter] = useState<Filter>("all");


  return {
    activeTab, setActiveTab,
    selectedVacancy, setSelectedVacancy,
    sendCvDialog, setSendCvDialog,
    sentCvDialog, setSentCvDialog,
    alreadySentDialog, setAlreadySentDialog,
    vacanciesFilter, setVacanciesFilter
  };
};