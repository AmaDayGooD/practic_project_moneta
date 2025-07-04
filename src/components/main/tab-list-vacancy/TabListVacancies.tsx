import type { FC } from "react";
import OurVacancies from "./our-vacancies/OurVacancies.tsx";
import NotFindVacancies from "./not-find-vacancies/NotFindVacancies.tsx";


const TabListVacancies: FC = () => {
  return (
    <>
      <OurVacancies />
      <NotFindVacancies />
    </>
  );
};

export default TabListVacancies;