import type { FC } from "react";

import style from './AdmissionToTeam.module.css'

const AdmissionToTeam: FC = () => {
  return (
    <section className={style.admission_to_team}>
      <h1>Как мы принимаем в команду</h1>
      <div className={style.admission_item}>
        <span className={style.stage}>1</span>
        <span className={style.name_stage}>Онлайн-встреча</span>
        <p>Короткий разговор по видеосвязи, чтобы обсудить твои ожидания и наши возможности. Узнаем друг друга лучше и
          поймём, есть ли точки соприкосновения.</p>
      </div>
      <div className={style.vertical_divider}></div>
      <div className={style.admission_item}>
        <span className={style.stage}>2</span>
        <span className={style.name_stage}>Тестовое задание или техническое интервью</span>
        <p>В зависимости от вакансии мы проводим техническое интервью с экспертами или предлагаем выполнить тестовое
          задание. Это позволяет нам лучше оценить ваши навыки, а тебе — познакомиться с нашими требованиями</p>
      </div>
      <div className={style.vertical_divider}></div>
      <div className={style.admission_item}>
        <span className={style.stage}>3</span>
        <span className={style.name_stage}>Финальное собеседование </span>
        <p>Это возможность познакомиться с командой — будущими коллегами, наставником и руководителем. Ты сможешь
          обсудить
          задачи, почувствовать атмосферу и решить, комфортно ли будет работать вместе.</p>
      </div>
      <div className={style.vertical_divider}></div>
      <div className={style.admission_item}>
        <span className={style.stage}>4</span>
        <span className={style.name_stage}>Пребординг</span>
        <p>В оффере пропишем ожидания от роли, условия оплаты, бонусы, задачи и закреплённого наставника. Также
          поможем
          с
          оформлением, выдадим технику, настроим доступы и поддержим в период адаптации.</p>
      </div>
    </section>
  )
};

export default AdmissionToTeam;