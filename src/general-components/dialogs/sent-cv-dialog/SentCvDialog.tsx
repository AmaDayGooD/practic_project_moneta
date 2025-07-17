import { type FC, useEffect, useRef } from "react";
import style from "./SentCvDialog.module.css";
import { useStoreContext } from "@store/storeContext.ts";
import close from "/icons/close.svg";
import smile_circle from "/icons/smile_circle.svg";
import starCircle from "/icons/star_circle.svg";
import Button from "@general_components/button/Button.tsx";


const SentCvDialog: FC = () => {
  const { sentCvDialog, setSentCvDialog, setSendCvDialog, alreadySentDialog, setAlreadySentDialog } = useStoreContext();
  const dialogSentRef = useRef<HTMLDialogElement>(null);
  const dialogAlreadySentRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (sentCvDialog) {
      dialogSentRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogSentRef.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sentCvDialog]);

  useEffect(() => {
    if (alreadySentDialog) {
      dialogAlreadySentRef.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialogAlreadySentRef.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [alreadySentDialog]);

  const closeDialogs = () => {
    setSentCvDialog(false);
    setAlreadySentDialog(false);
    setSendCvDialog(false);
  };

  return (
    <>
      <dialog ref={dialogSentRef} onClose={() => closeDialogs}>
        <div className={style.sent_cv}>
          <div className={style.header_controls}>
            <Button image={close} className={style.btn} onClick={() => closeDialogs()} />
          </div>
          <div className={style.content}>
            <img src={smile_circle} alt="Smile circle" />
            <h1>Отклик отправлен!</h1>
            <span>HR-менеджер скоро свяжется с вами</span>
          </div>
        </div>
      </dialog>

      <dialog ref={dialogAlreadySentRef} onClose={() => closeDialogs}>
        <div className={style.sent_cv}>
          <div className={style.header_controls}>
            <Button image={close} className={style.btn} onClick={() => closeDialogs()} />
          </div>
          <div className={style.content}>
            <img src={starCircle} alt="Star circle" />
            <h1>Вы уже откликались на эту вакансию </h1>
            <span>Повторите попытку позже</span>
          </div>
        </div>
      </dialog>
    </>


  );
};

export default SentCvDialog;