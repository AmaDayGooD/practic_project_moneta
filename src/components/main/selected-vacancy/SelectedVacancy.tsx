import type { FC } from "react";
import style from "./SelectedVacancy.module.css";
import leftArrow from "/icons/left_arrow.svg";
import Button from "@general_components/button/Button.tsx";
import { useStoreContext } from "@store/storeContext.ts";
import setCurrency from "@utils/setCurrency.tsx";
import setExperience from "@utils/setExperience.tsx";

const SelectedVacancy: FC = () => {
  const {
    setActiveTab,
    selectedVacancy: vacancy,
    sendCvDialog,
    setSendCvDialog } = useStoreContext();

  const onClickRespond = () => {
    console.log("onClickRespond: " + sendCvDialog)
    setSendCvDialog(true)
  };

  const goToListVacancies = () => {
    setActiveTab("vacancies");
  };

  return (
    <section>
      <section className={style.title_vacancy}>
        <div>
          <Button onClick={goToListVacancies} image={leftArrow} />
          <h1 className={style.name_vacancy}>{vacancy?.title}</h1>
        </div>
        <Button className={style.btn_respond} onClick={onClickRespond} text={"Откликнуться"}></Button>
      </section>
      <section className={style.info_vacancy}>
        <ul>
          {vacancy?.salary && <li><strong>Заработная
            плата: </strong><span>от {vacancy?.salary.from} до {vacancy?.salary.to} {setCurrency(vacancy?.salary.currency)} за месяц {vacancy.salary.gross ? ", на руки" : ""}</span>
          </li>}
          {vacancy?.experience &&
            <li><strong>Опыт работы: </strong><span>{setExperience(vacancy.experience)}</span></li>}
        </ul>
      </section>
      <section className={style.requirements_vacancy}>
        <h2>Ожидания от кандидата</h2>
        <ul>
          <li>Знание и понимание принципов работы сетевых протоколов (модель OSI)</li>
        </ul>
      </section>
      <section className={style.offer}>
        <h2>Мы предлагаем:</h2>
        <ul>
          <li>Работу в аккредитованной IТ-компании</li>
        </ul>
      </section>
      <section className={style.description_vacancy}>
        <p>У нас современный офис с парковкой и всем необходимым для комфортной работы и отдыха в самом сердце
          Йошкар-Олы. Рядом набережная с прекрасными видами, кучей кафешек, театрами, музеями и быстрой доступностью из
          любой точки города.</p>
      </section>
    </section>
  );
};

export default SelectedVacancy;