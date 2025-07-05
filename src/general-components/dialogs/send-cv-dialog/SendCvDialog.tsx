import { type FC, useEffect, useRef } from "react";
import FormSendCv from "@general_components/form-send-cv/FormSendCv.tsx";
import { useStoreContext } from "@store/storeContext.ts";

import style from "./SendCvDialog.module.css";

const SendCvDialog: FC = () => {
  const { sendCvDialog, selectedVacancy } = useStoreContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const title = selectedVacancy?.title;

  useEffect(() => {
    console.log(sendCvDialog)
    if (sendCvDialog) {
      dialogRef.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialogRef.current?.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sendCvDialog]);

  return (
    <dialog ref={dialogRef} id={"container_send_cv"} className={style.wrapper_dialog}>
      <FormSendCv title={title} vacancy={selectedVacancy}/>
    </dialog>
  );
};

export default SendCvDialog;