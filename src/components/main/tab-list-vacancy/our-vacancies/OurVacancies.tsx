import type { FC } from "react";
import style from "./OurVacancies.module.css";
import ListVacancy from "./list-vacancy/ListVacancy.tsx";
import Button from "@general_components/button/Button.tsx";

const OurVacancies: FC = () => {
  return (
    <section className={style.our_vacancies}>
      <h1>Наши вакансии</h1>
      <nav>
        <Button className="all_vacancies" text={"Все"}></Button>
        <Button className="technical_vacancies" text={"Техническое направление"}></Button>
        <Button className="back_office_vacancies" text={"Бэкофис и работа с клиентами"}></Button>
      </nav>
      <ListVacancy />
    </section>
  );
};

export default OurVacancies;