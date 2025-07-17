import type { FC } from "react";
import style from './OurPrinciples.module.css'

import cloudSun from '/icons/cloud_sun.svg'
import heart from '/icons/heart.svg'
import star from '/icons/star.svg'
import caretDoubleUp from '/icons/caret_double_up.svg'

const OurPrinciples: FC = () => {
  return (
    <section className={style.our_principles}>
      <h1>Наши принципы</h1>
      <div className={style.principles}>
        <div className={style.principles_item}>
          <img src={cloudSun} alt="Cloud" />
          <h2>Ценим баланс и комфорт</h2>
          <p>Мы уважаем твоё личное время и стремимся создать условия, где ты можешь работать эффективно. У нас нет
            тотального
            контроля — мы доверяем тебе и ценим результат, а не количество проведённых за компьютером минут.</p>
        </div>
        <div className={style.principles_item}>
          <img src={heart} alt="Heart" />
          <h2>Слышим мнение каждого</h2>
          <p>У нас ценят инициативу и идеи, ведь твоя экспертиза может изменить продукт и даже компанию. Мы даём
            пространство
            для реализации идей каждому — от стажёра до руководителя.</p>
        </div>
        <div className={style.principles_item}>
          <img src={star} alt="Star" />
          <h2>Избегаем барьеров</h2>
          <p>Мы стараемся избегать лишней бюрократии: если нужно что‑то решить, то не требуем горы документов. А если
            понадобится помощь, то коллеги всегда поддержат и подскажут решение.</p>
        </div>
        <div className={style.principles_item}>
          <img src={caretDoubleUp} alt="Double arrow up" />
          <h2>Растим профессионалов</h2>
          <p>Мы оплачиваем курсы и тренинги, проводим воркшопы и даём возможность работать над крутыми проектами.
            Расти
            как
            специалист или руководитель — выбор за тобой.</p>
        </div>
      </div>
    </section>
  )
};

export default OurPrinciples;