import type { FC } from "react";
import style from "./OurAdvantages.module.css";
import workingConditions from "/image/working_conditions.png";
import devAndSupp from "/image/dev_and_supp.png";
import influence from "/image/influence.png";
import healthCare from "/image/health_care.png";
import openCulture from "/image/open_culture.png";
import flexibility from "/image/flexibility.png";
import teamAndHobbies from "/image/team_and_hobbies.png";

const OurAdvantages: FC = () => {
  return (
    <section className={style.our_advantages}>
      <h1>Наши преимущества</h1>
      <div className={style.advantages_item}>
        <div>
          <h2>Комфортные условия работы</h2>
          <p>Современные офисы в Йошкар-Оле и Москве с удобными рабочими местами или возможность работать из дома —
            выбирай,
            где тебе удобнее.</p>
        </div>
        <img src={workingConditions} alt="Working conditions" />
      </div>

      <div className={style.advantages_item}>
        <div>
          <h2>Развитие и поддержка</h2>
          <p>Мы помогаем расти: оплачиваем обучение, проводим воркшопы и предоставляем наставников.</p>
        </div>
        <img src={devAndSupp} alt="Developing and supporting" />
      </div>

      <div className={style.advantages_item}>
        <div>
          <h2>Влияние на продукт</h2>
          <p>Твои идеи могут изменить наш продукт и повлиять на жизнь тысяч пользователей. Мы ценим инициативу и даём
            возможность реализовать свои задумки.</p>
        </div>
        <img src={influence} alt="Influence" />
      </div>

      <div className={style.advantages_item}>
        <div>
          <h2>Забота о здоровье и комфорте</h2>
          <p>Все плюсы аккредитованной IT-компании, ДМС, компенсация занятий спортом и обучения — мы создаём условия,
            чтобы ты чувствовал себя хорошо и мог сосредоточиться на важных задачах. А если хочешь прокачать
            английский, у нас есть бесплатные групповые занятия по уровням.</p>
        </div>
        <img src={healthCare} alt="Health care" />
      </div>

      <div className={style.advantages_item}>
        <div>
          <h2>Открытая культура</h2>
          <p>У нас нет строгой иерархии — только неформальная атмосфера, где каждый может высказаться и быть
            услышанным.
            Мы
            общаемся на равных и поддерживаем друг друга.</p>
        </div>
        <img src={openCulture} alt="Open culture" />
      </div>

      <div className={style.advantages_item}>
        <div>
          <h2>Гибкость и баланс</h2>
          <p>Гибкий график и возможность подстроить рабочий день под свои нужды — мы ценим твоё время и личное
            пространство.</p>
        </div>
        <img src={flexibility} alt="Flexibility" />
      </div>

      <div className={style.advantages_item}>
        <div>
          <h2>Команда и увлечения</h2>
          <p>Корпоративные мероприятия, клубы по интересам и возможность находить единомышленников — у нас работают не
            просто коллеги, а друзья.</p>
        </div>
        <img src={teamAndHobbies} alt="Team and hobbies" />
      </div>

    </section>
  );
};

export default OurAdvantages;