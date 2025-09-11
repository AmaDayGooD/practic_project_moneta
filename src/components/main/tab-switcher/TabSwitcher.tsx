import type { FC } from "react";
import style from "./TabSwitcher.module.css";
import { useStoreContext } from "@store/storeContext.ts";
import Button from "@general_components/button/Button.tsx";

const TabSwitcher: FC = () => {
  const { activeTab, setActiveTab } = useStoreContext();

  return (
    <div className={style.tab}>
      <Button
        className={`${style.tabButton} ${activeTab === "about" ? style.active : ""}`}
        text={"О компании"}
        onClick={() => setActiveTab("about")}
      />
      <Button
        className={`${style.tabButton} ${activeTab === "vacancies" || activeTab === "selectedVacancy" ? style.active : ""}`}
        text={"Вакансии"}
        onClick={() => setActiveTab("vacancies")}
      />
    </div>
  );
};

export default TabSwitcher;