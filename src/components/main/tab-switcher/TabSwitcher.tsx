import Button from "../../../general-components/button/Button.tsx";
import style from "./TabSwitcher.module.css";
import type { FC } from "react";
import { useStoreContext } from "../../../store/storeContext.ts";

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
        className={`${style.tabButton} ${activeTab === "vacancies" ? style.active : ""}`}
        text={"Вакансии"}
        onClick={() => setActiveTab("vacancies")}
      />
    </div>
  );
};

export default TabSwitcher;