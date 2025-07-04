import style from "./AboutCompany.module.css";
import type { FC } from "react";
import monetaTeam from '/image/moneta_team.png'

const AboutCompany: FC = () => {
  return (
    <section className={style.about_company}>
      <h1>Что такое Монета</h1>
      <p>Монета — аккредитованная финтех-компания из Йошкар-Олы. Мы помогаем бизнесу принимать, отправлять и учитывать
        платежи. Закрываем весь цикл: процессинг, банковские расчёты, массовые выплаты, автоматизация
        платежей.<br /><br />Наши клиенты — от стартапов и самозанятых до крупных компаний с миллионами операций в
        месяц.
        Мы берём на себя
        сложную работу с деньгами, чтобы клиенты могли спокойно развивать бизнес.</p>

      <section className={style.about}>
        <div className={style.about_item}>
          <span>250</span>
          <p>сотрудников по всему миру</p>
        </div>
        <div className={style.about_item}>
          <span>20</span>
          <p>лет работаем в финтехе</p>
        </div>
        <div className={style.about_item}>
          <span>10к</span>
          <p>компаний-клиентов</p>
        </div>
        <div className={style.about_item}>
          <span>4</span>
          <p>комфортных офиса</p>
        </div>
      </section>
      <img src={monetaTeam} alt="Moneta team" />
    </section>
  );
};

export default AboutCompany;