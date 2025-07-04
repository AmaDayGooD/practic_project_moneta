import { type FC, useEffect, useRef } from "react";

import style from "./FormSendCv.module.css";

import close from "/icons/close.svg";
import uploadSimple from "/icons/upload_simple.svg";

type Props = {
  withTitle?: boolean;
}

const FormSendCv: FC<Props> = ({ withTitle = true }) => {

  const dropAreaRef = useRef<HTMLDivElement>(null);
  const cvTextRef = useRef<HTMLSpanElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (cvTextRef.current) {
      cvTextRef.current.textContent = file.name;
    }
    // Здесь можно добавить логику отправки файла или сохранения в state
  };

  const loadFile = () => {
    const dropArea = dropAreaRef.current;
    const cvText = cvTextRef.current;
    const fileInput = fileInputRef.current;

    if (!dropArea || !cvText || !fileInput) return;

    const clickHandler = () => {
      fileInput.click();
    };

    const dragOverHandler = (e: DragEvent) => {
      e.preventDefault();
      dropArea.classList.add("dragover");
    };

    const dragLeaveHandler = () => {
      dropArea.classList.remove("dragover");
    };

    const dropHandler = (e: DragEvent) => {
      e.preventDefault();
      dropArea.classList.remove("dragover");
      const file = e.dataTransfer?.files[0];
      if (file) {
        handleFile(file);
      }
    };

    const fileChangeHandler = () => {
      const file = fileInput.files?.[0];
      if (file) {
        handleFile(file);
      }
    };

    dropArea.addEventListener("click", clickHandler);
    dropArea.addEventListener("dragover", dragOverHandler);
    dropArea.addEventListener("dragleave", dragLeaveHandler);
    dropArea.addEventListener("drop", dropHandler);
    fileInput.addEventListener("change", fileChangeHandler);
    return () => {
      dropArea.removeEventListener("click", clickHandler);
      dropArea.removeEventListener("dragover", dragOverHandler);
      dropArea.removeEventListener("dragleave", dragLeaveHandler);
      dropArea.removeEventListener("drop", dropHandler);
      fileInput.removeEventListener("change", fileChangeHandler);
    };
  };

  const closeAllDialogs = () => {
    const dialogs = document.querySelectorAll("dialog");

    dialogs.forEach(dialog => {
      if (dialog.open) {
        dialog.close();
      }
    });
  };

  useEffect(() => {
    const cleanUp = loadFile();
    return cleanUp;
  }, []);

  return (
    <form className={style.send_cv_form}>
      {withTitle ?
        <div className={style.title}>
          <h1>Отклик на вакансию<br />Системный администратор</h1>
          <button type="button" onClick={() => closeAllDialogs()}>
            <img src={close} alt="Close dialog" />
          </button>
        </div>
        : ""
      }
      <div className={style.name}>
        <div>
          <label htmlFor="dialog_first_name"><span>*</span> Имя</label>
          <input id="dialog_first_name" type="text" placeholder="Иван" name="firstName" />
        </div>
        <div>
          <label htmlFor="dialog_last_name"><span>*</span> Фамилия</label>
          <input id="dialog_last_name" type="text" placeholder="Иванов" name="lastName" />
        </div>
      </div>
      <div className={style.phone}>
        <label htmlFor="dialog_phone"><span>*</span> Номер телефона</label>
        <input id="dialog_phone" type="tel" placeholder="+7 (999) 999-99-99" name="phone" />
      </div>
      <div className={style.email}>
        <label htmlFor="dialog_email"><span>*</span> Почта</label>
        <input id="dialog_email" type="email" placeholder="ivanovivan@mail.com" name="email" />
      </div>
      <div className={style.resume}>
        <label htmlFor="dialog_cv"><span>*</span> Ссылка на резюме или файл (pdf/doc)</label>
        <input id="dialog_cv" type="url" placeholder="ссылка на резюме" name="urlCv" />
      </div>
      <div className={style.area_to_send_cv} id="drop_area">
        <img src={uploadSimple} alt="Upload CV" />
        <span id="cv_text">загрузить файл</span>
        <input ref={fileInputRef} type="file" className={style.cv_file_input} name="cv_file"
               accept=".pdf,.doc,.docx" />
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default FormSendCv;