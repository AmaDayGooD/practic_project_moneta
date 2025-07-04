import React from "react";
import styles from './Footer.module.css'
import coinLogo from '/icons/moneta_full_blue_logo.svg'
import socialMedia from '/icons/social_media.svg'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="footer-about-company">
        <a href="https://www.moneta.ru/">
          <img src={coinLogo} alt="logo" />
        </a>
        <span>© 2005 — 2023 НКО «МОНЕТА» (ООО)</span>
      </div>
      <nav>
        <ul>
          <li><a href="https://www.moneta.ru/info/d/ru/public/about/index.htm">О нас</a></li>
          <li><a href="https://www.moneta.ru/info/d/ru/public/merchants/index.htm">Бизнесу</a></li>
          <li><a href="https://www.moneta.ru/info/d/ru/public/users/tariffs.htm">Физлицам</a></li>
        </ul>
        <ul>
          <li><a href="https://www.moneta.ru/news.htm">Новости</a></li>
          <li><a href="https://www.moneta.ru/info/d/ru/public/about/contacts.htm">Контакты</a></li>
          <li><a href="https://yoshkar-ola.hh.ru/employer/5936246?hhtmFrom=vacancy">Вакансии</a></li>
        </ul>
        <ul>
          <li><a href="#">Задать вопрос</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Политика<br />конфиденциальности</a></li>
        </ul>
      </nav>
      <div>
        <a href="#">
          <img src={socialMedia} alt="Social media" />
        </a>
      </div>
    </footer>
  );
};


export default Footer;