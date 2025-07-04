import type { FC } from "react";
import TabSwitcher from "./tab-switcher/TabSwitcher.tsx";
import style from "./Main.module.css"
import TabAboutCompany from "./tab-about-company/TabAboutCompany.tsx";
import TabListVacancies from "./tab-list-vacancy/TabListVacancies.tsx";
import { useStoreContext } from "../../store/storeContext.ts";

const Main: FC = () => {
  const activeTab = useStoreContext().activeTab

  return (
    <div className={style.main}>
      <TabSwitcher />
      {activeTab === 'about' ? <TabAboutCompany /> : <TabListVacancies/>}
    </div>
  );
};

export default Main;