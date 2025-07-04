import type { FC } from "react";
import style from "./NotFindVacancies.module.css";
import FormSendCv from "@general_components/form-send-cv/FormSendCv.tsx";

const NotFindVacancies: FC =() => {
  return (
    <section className={style.not_find_vacancies}>
      <div className={style.description}>
        <h1>Хочешь работать с нами, но не нашлось подходящей вакансии?</h1>
        <p>Отправь нам своё резюме через форму — мы обязательно рассмотрим твою кандидатуру и найдём для тебя
          интересное
          направление</p>
      </div>
      <div id="container_send_cv">
        <FormSendCv withTitle={false} />
      </div>

    </section>
  )
};

export default NotFindVacancies;