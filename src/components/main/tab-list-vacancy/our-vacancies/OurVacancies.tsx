import type { FC } from "react";
import style from "./OurVacancies.module.css";
import ListVacancy from "./list-vacancy/ListVacancy.tsx";
import Button from "@general_components/button/Button.tsx";
import { useStoreContext } from "@store/storeContext.ts";

const OurVacancies: FC = () => {
  const {vacanciesFilter, setVacanciesFilter} = useStoreContext();

  return (
    <section className={style.our_vacancies}>
      <h1>Наши вакансии</h1>
      <nav>
        <Button className={`all_vacancies ${vacanciesFilter == "all" ? style.active : ""}`} text={"Все"} onClick={() => setVacanciesFilter("all")}/>
        <Button className={`technical_vacancies ${vacanciesFilter == "developer" ? style.active : ""}`} text={"Техническое направление"} onClick={() => setVacanciesFilter("developer")}/>
        <Button className={`back_office_vacancies ${vacanciesFilter == "backoffice" ? style.active : ""}`} text={"Бэкофис и работа с клиентами"} onClick={() => setVacanciesFilter("backoffice")}/>
      </nav>
      <ListVacancy />
    </section>
  );
};

export default OurVacancies;