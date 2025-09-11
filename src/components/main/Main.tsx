import type { FC } from "react";
import style from "./Main.module.css";
import TabSwitcher from "./tab-switcher/TabSwitcher.tsx";
import { useStoreContext } from "@store/storeContext.ts";
import TabAboutCompany from "./tab-about-company/TabAboutCompany.tsx";
import SelectedVacancy from "./selected-vacancy/SelectedVacancy.tsx";
import TabListVacancies from "./tab-list-vacancy/TabListVacancies.tsx";

const Main: FC = () => {
  const activeTab = useStoreContext().activeTab;

  return (
    <div className={style.main}>
      <TabSwitcher />
      {activeTab === "about" ? (
        <TabAboutCompany key="about" />
      ) : activeTab === "vacancies" ? (
        <TabListVacancies key="vacancies" />
      ) : (
        <SelectedVacancy key="selected" />
      )}
    </div>
  );
};

export default Main;