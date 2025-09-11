import type { FC } from "react";
import style from "./Banner.module.css"
import smileCoin from "/icons/smile_coin.svg"

const Banner: FC= ()=> {
  return (
    <section className={style.banner}>
      <span>Стань частью команды Монеты уже сейчас</span>
      <img src={smileCoin} alt="Smile coin" />
    </section>
  )
};

export default Banner;