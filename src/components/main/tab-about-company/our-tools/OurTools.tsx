import type { FC } from "react";
import style from './OurTools.module.css'
import onlineWallet from '/icons/online_wallet.svg'
import receipt from "/icons/receipt.svg"
import creditCard from "/icons/credit_card.svg"
import wallet from "/icons/wallet.svg"
import identificationCard from "/icons/identification_card.svg"

const OurTools: FC = () => {
  return (
    <section className={style.our_tools}>
      <h1>Какие инструменты мы создаем</h1>
      <div className={style.tools}>
        <div className={style.tools_item}>
          <img src={onlineWallet} alt="Online wallet" />
          <h2>Приём онлайн-платежей</h2>
          <p>Подключаем оплату банковскими картами, Системой быстрых платежей (СБП), электронными кошельками и другими
            методами. Клиенты платят так, как им удобно, а бизнес получает деньги без задержек.</p>
        </div>
        <div className={style.tools_item}>
          <img src={receipt} alt="Receipt" />
          <h2>Работа с маркетплейсами</h2>
          <p>Предоставляем маркетплейсам платёжные решения: создаём платёжные формы для сайтов, настраиваем приём
            платежей
            от
            клиентов, распределяем деньги между продавцами и обеспечиваем хранение средств на кошельке
            маркетплейса.</p>
        </div>
        <div className={style.tools_item}>
          <img src={creditCard} alt="Credit card" />
          <h2>Регулярные платежи</h2>
          <p>Предоставляем автоматические списания для подписок, аренды и других регулярных услуг. Это экономит время
            клиентов
            и удерживает их.</p>
        </div>
        <div className={style.tools_item}>
          <img src={wallet} alt="Wallet" />
          <h2>Встроенные кошельки на сайте</h2>
          <p>Разрабатываем кошельки, которые можно встроить прямо на сайт. Это удобно для клиентов и повышает их
            лояльность.</p>
        </div>
        <div className={style.tools_item}>
          <img src={identificationCard} alt="Identification card" />
          <h2>Мультиэквайринг</h2>
          <p>Даём возможность работать с несколькими платёжными системами одновременно и получать платежи от клиентов
            на
            счета
            разных банков. Это снижает риски и повышает надёжность платежей.</p>
        </div>
      </div>
    </section>
  )
};

export default OurTools;