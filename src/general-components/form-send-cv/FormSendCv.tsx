import { useState, useRef, useEffect, type FormEvent } from "react";
import { type FC } from "react";

import style from "./FormSendCv.module.css";
import close from "/icons/close.svg";
import uploadSimple from "/icons/upload_simple.svg";

type Props = {
  withTitle?: boolean;
};

const FormSendCv: FC<Props> = ({ withTitle = true }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const fileNameRef = useRef<HTMLSpanElement>(null);

  const [fileName, setFileName] = useState<string>("загрузить файл");

  const closeAllDialogs = () => {
    const dialogs = document.querySelectorAll("dialog");
    dialogs.forEach((dialog) => dialog.open && dialog.close());
  };

  const handleFile = (file: File) => {
    if (file.name) {
      setFileName(file.name);
    }
  };

  useEffect(() => {
    const dropArea = dropAreaRef.current;
    const fileInput = fileInputRef.current;

    if (!dropArea || !fileInput) return;

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      dropArea.classList.add(style.dragover);
    };

    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dropArea.classList.remove(style.dragover);
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      dropArea.classList.remove(style.dragover);

      const file = e.dataTransfer?.files[0];
      if (file) {
        handleFile(file);
      }
    };

    const onClick = () => {
      fileInput.click();
    };

    const onChange = () => {
      const file = fileInput.files?.[0];
      if (file) {
        handleFile(file);
      }
    };

    dropArea.addEventListener("dragover", onDragOver);
    dropArea.addEventListener("dragleave", onDragLeave);
    dropArea.addEventListener("drop", onDrop);
    dropArea.addEventListener("click", onClick);
    fileInput.addEventListener("change", onChange);

    return () => {
      dropArea.removeEventListener("dragover", onDragOver);
      dropArea.removeEventListener("dragleave", onDragLeave);
      dropArea.removeEventListener("drop", onDrop);
      dropArea.removeEventListener("click", onClick);
      fileInput.removeEventListener("change", onChange);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Форма отправлена!");
  };

  return (
    <form className={style.send_cv_form} onSubmit={handleSubmit}>
      {withTitle && (
        <div className={style.title}>
          <h1>Отклик на вакансию<br />Системный администратор</h1>
          <button type="button" onClick={closeAllDialogs} aria-label="Закрыть">
            <img src={close} alt="Close dialog" />
          </button>
        </div>
      )}

      <div className={style.name}>
        <div>
          <label htmlFor="dialog_first_name"><span>*</span> Имя</label>
          <input id="dialog_first_name" type="text" placeholder="Иван" name="firstName" required />
        </div>
        <div>
          <label htmlFor="dialog_last_name"><span>*</span> Фамилия</label>
          <input id="dialog_last_name" type="text" placeholder="Иванов" name="lastName" required />
        </div>
      </div>

      <div className={style.phone}>
        <label htmlFor="dialog_phone"><span>*</span> Номер телефона</label>
        <input id="dialog_phone" type="tel" placeholder="+7 (999) 999-99-99" name="phone" required />
      </div>

      <div className={style.email}>
        <label htmlFor="dialog_email"><span>*</span> Почта</label>
        <input id="dialog_email" type="email" placeholder="ivanovivan@mail.com" name="email" required />
      </div>

      <div className={style.resume}>
        <label htmlFor="dialog_cv"><span>*</span> Ссылка на резюме или файл (pdf/doc)</label>
        <input id="dialog_cv" type="url" placeholder="ссылка на резюме" name="urlCv" />
      </div>

      <div className={style.area_to_send_cv} ref={dropAreaRef}>
        <img src={uploadSimple} alt="Upload CV" />
        <span ref={fileNameRef}>{fileName}</span>
        <input
          ref={fileInputRef}
          type="file"
          className={style.cv_file_input}
          name="cv_file"
          accept=".pdf,.doc,.docx"
        />
      </div>

      <button type="submit">Отправить</button>
    </form>
  );
};

export default FormSendCv;