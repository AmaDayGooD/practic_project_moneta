import React, { type FC, useEffect, useRef, useState } from "react";

import style from "./FormSendCv.module.css";
import close from "/icons/close.svg";
import uploadSimple from "/icons/upload_simple.svg";
import IMask from "imask";
import { useStoreContext } from "@store/storeContext.ts";
import type { VacancyItem } from "@/src/types/Vacancy.ts";
import localStorage from "@utils/utilsLocalStorage.tsx";
import isTwoWeeksPassed from "@utils/dataTimeUtils.tsx";

type Props = {
  title?: string;
  vacancy?: VacancyItem | null;
};

const FormSendCv: FC<Props> = ({ title = null, vacancy = null }) => {
  const { setSentCvDialog, setSendCvDialog, setAlreadySentDialog } = useStoreContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const fileNameRef = useRef<HTMLSpanElement>(null);

  const [fileName, setFileName] = useState<string>("загрузить файл");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    urlCv: "",
  });

  const clearFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      urlCv: "",
    });
  };

  const closeAllDialogs = () => {
    setSentCvDialog(false);
    setSendCvDialog(false);
    clearFormData();
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


  const [errors, setErrors] = useState({
    errorFirstName: false,
    errorLastName: false,
    errorPhone: false,
    errorEmail: false,
    errorUrlCv: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const errorMap = {
      firstName: "errorFirstName",
      lastName: "errorLastName",
      phone: "errorPhone",
      email: "errorEmail",
      urlCv: "errorUrlCv",
    };

    if (name === "phone") {
      IMask(e.target, { mask: "+7 (000) 000 00-00" });
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [errorMap[name]]: false,
    }));
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const newErrors = { ...errors };

    const regexUrlCv: RegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*$/i;

    newErrors.errorFirstName = !(formData.firstName.trim() !== "" &&
      formData.firstName.length >= 2 &&
      !/\d/.test(formData.firstName)
    );

    newErrors.errorLastName = !(formData.lastName.trim() !== "" &&
      formData.lastName.length >= 2 &&
      !/\d/.test(formData.lastName)
    );

    newErrors.errorPhone = formData.phone.length < 18;

    newErrors.errorEmail = !(/\S+@\S+\.\S+/.test(formData.email));

    newErrors.errorUrlCv = fileInputRef.current?.value ? false : !(regexUrlCv.test(formData.urlCv));

    setErrors(newErrors);

    const isFormValid = Object.values(newErrors).every(
      (error) => !error,
    );


    if (isFormValid) {
      if (vacancy != null) {

        const localData = JSON.parse(localStorage.getObjectLocalData(vacancy.id) as string);

        if (localData !== null &&
          localData.id === vacancy.id &&
          !isTwoWeeksPassed(localData.dataTime)
        ) {
          clearFormData();
          setAlreadySentDialog(true);
        } else {
          localStorage.saveObjectLocalData(vacancy.id, { ...formData, ...vacancy });
          setSentCvDialog(true);
        }
      } else {
        clearFormData();
        setSentCvDialog(true);
      }
    }
  };

  return (
    <form className={style.send_cv_form} onSubmit={handleSubmit}>
      {title != null && (
        <div className={style.title}>
          <h1>Отклик на вакансию<br />{title}</h1>
          <button type="button" onClick={closeAllDialogs} aria-label="Закрыть">
            <img src={close} alt="Close dialog" />
          </button>
        </div>
      )}

      <div className={style.name}>
        <div>
          <label htmlFor="dialog_first_name"><span>*</span> Имя</label>
          <input
            className={errors.errorFirstName ? style.invalid : ""}
            id="dialog_first_name"
            type="text"
            placeholder="Иван"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dialog_last_name"><span>*</span> Фамилия</label>
          <input
            className={errors.errorLastName ? style.invalid : ""}
            id="dialog_last_name"
            type="text"
            placeholder="Иванов"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={style.phone}>
        <label htmlFor="dialog_phone"><span>*</span> Номер телефона</label>
        <input
          className={errors.errorPhone ? style.invalid : ""}
          id="dialog_phone"
          type="tel"
          placeholder="+7 (999) 999-99-99"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className={style.email}>
        <label htmlFor="dialog_email"><span>*</span> Почта</label>
        <input
          className={errors.errorEmail ? style.invalid : ""}
          id="dialog_email"
          type="text"
          placeholder="ivanovivan@mail.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className={style.resume}>
        <label htmlFor="dialog_cv"><span>*</span> Ссылка на резюме или файл (pdf/doc)</label>
        <input
          className={errors.errorUrlCv ? style.invalid : ""}
          id="dialog_cv"
          type="text"
          placeholder="ссылка на резюме"
          name="urlCv"
          value={formData.urlCv}
          onChange={handleChange}
        />
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