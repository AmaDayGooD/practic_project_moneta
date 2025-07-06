import styles from "./Header.module.css";

import coinLogo from '/icons/moneta_full_blue_logo.svg'
import hero from '/image/hero.png'
import type { FC } from "react";
import Button from "@general_components/button/Button.tsx";

const defaultNavLinks = [
  { title: "Бизнесу", href: "https://payanyway.ru/info/w/ru/public/welcome.htm " },
  { title: "Физлицам", href: "https://www.moneta.ru/info/d/ru/public/users/tariffs.htm " },
  { title: "Документация", href: "https://docs.moneta.ru/ " },
  { title: "О нас", href: "https://www.moneta.ru/info/d/ru/public/about/contacts.htm " },
  { title: "Контакты", href: "https://www.moneta.ru/info/d/ru/public/about/contacts.htm" },
];

export const Header: FC = () => {
  return (
    <>
      <header className={styles.header}>
        <img src={coinLogo} alt="Logo" />
        <nav className={styles.menu_items}>
          {defaultNavLinks.map((link, index) => (
            <a key={index} href={link.href}>
              {link.title}
            </a>
          ))}
        </nav>
        <div className={styles.menu_btn}>
          <a href="https://www.moneta.ru/login.htm ">
            <Button text={"Вход"} type={"light"}/>
          </a>
          <a href="https://www.moneta.ru/register.htm ">
            <Button text={"Регистрация"}/>
          </a>
        </div>
        <button className={styles.burger_menu}></button>
      </header>
      <img className={styles.hero} src={hero} alt="Pay" />
    </>
  );
};

export default Header;