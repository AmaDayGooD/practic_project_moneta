import IMask from "imask";

import backofficeIcon from './assets/icons/ic_back_office_vacancies.svg?url';
import technicalIcon from "./assets/icons/ic_technical_vacancies.svg";

const tab_btn_container = document.querySelector("#tab");
const btn_about_company = document.querySelector("#btn-about-company");
const btn_vacancies = document.querySelector("#btn-vacancies");

const about_company = document.querySelector("#tab-about-company");
const vacancies = document.querySelector("#tab-vacancies");
const selected_vacancy = document.querySelector("#selected_vacancy");

const show_more_btn = document.getElementById("show_more_btn");

let chosen_vacancy = {};
let allVacancies = [];

function onClickBurgerMenu() {
  const menu = document.getElementById("dropdown_menu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

window.addEventListener("resize", function() {
  const menu = document.getElementById("dropdown_menu");
  if (window.innerWidth < 960 && menu.style.display === "block") {
    menu.style.display = "none";
  }
});

document.addEventListener("click", function(event) {
  const burger = document.getElementById("burger_menu");
  const menu = document.getElementById("dropdown_menu");

  if (!burger.contains(event.target) && !menu.contains(event.target)) {
    menu.style.display = "none";
  }
});

function onClickBtnAboutCompany() {
  hideAll();
  about_company.classList.add("active");
  btn_about_company.classList.add("active");
}

function onClickBtnVacancy() {
  hideAll();
  btn_vacancies.classList.add("active");
  vacancies.classList.add("active");

  getVacancies();
}

function hideAll() {
  about_company.classList.remove("active");
  vacancies.classList.remove("active");
  btn_about_company.classList.remove("active");
  btn_vacancies.classList.remove("active");
  selected_vacancy.classList.remove("active");
}

let currentPage = 1;
const itemsPerPage = 9;
let totalVacancies = 0;

show_more_btn.addEventListener("click", ()=>loadMoreVacancies())

function getVacancies(page = 1) {
  const url = `https://learn-9fc9-git-main-imsokolovivs-projects.vercel.app/api/vacancies/list?page=${page}&limit=${itemsPerPage}`;
  const loader = document.getElementById("loader");
  const list = document.getElementById("vacancies-list");

  loader.style.display = "block";

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки вакансий ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      loader.style.display = "none";
      totalVacancies = data.total;
      const newVacancies = data.data;

      if (page === 1) {
        allVacancies = newVacancies;
        renderListVacancies(allVacancies);
      } else {
        renderListVacancies(newVacancies);
      }

      if (allVacancies.length >= totalVacancies || newVacancies.length < itemsPerPage) {
        show_more_btn.style.display = "none";
      } else {
        show_more_btn.style.display = "block";
      }

    })
    .catch(error => {
      loader.style.display = "none";
      console.error("Ошибка:", error);
      list.innerHTML = "<li>Не удалось загрузить вакансии</li>";
    });
}

function renderListVacancies(vacancies) {
  const container = document.getElementById("vacanciesList");

  vacancies.forEach(vacancy => {
    const existingItem = document.querySelector(`[data-id="${vacancy.id}"]`);

    if (!existingItem) {
      const li = document.createElement("li");
      li.className = "vacancies-item";
      li.setAttribute("data-id", vacancy.id);

      const image = vacancy.department === "backoffice" ? backofficeIcon : technicalIcon;

      const imageAlt = vacancy.department === "backoffice" ? "Бэк-офис" : "Техническое";

      li.innerHTML = `
        <img src=${image} alt=${imageAlt}>
        <h2>${vacancy.title}</h2>
        <div>
          <p>${vacancy.salary.from} - ${vacancy.salary.to}${setCurrency(vacancy.salary.currency)}</p>
          <button class="details-btn">Подробнее</button>
        </div>
      `;

      const button = li.querySelector(".details-btn");
      button.addEventListener("click", () => {
        chosen_vacancy = vacancy;
        goToVacancy(vacancy);
      });

      container.appendChild(li);
    }
  });
}

function loadMoreVacancies() {
  currentPage++;
  getVacancies(currentPage);
}

document.addEventListener("DOMContentLoaded", () => {
  getVacancies(1);
});

function filterVacancies(category) {
  let filtered;
  if (category === 'all') {
    filtered = allVacancies;
  } else if (category === 'developer') {
    filtered = allVacancies.filter(v => v.department === 'developer');
  } else if (category === 'backoffice') {
    filtered = allVacancies.filter(v => v.department === 'backoffice');
  }
  document.getElementById("vacanciesList").innerHTML = "";
  renderListVacancies(filtered);
}

function selectTypeVacancy(button) {
  document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
  const category = button.getAttribute("data-category");
  filterVacancies(category);
}

function goToVacancy(vacancy) {
  hideAll();
  tab_btn_container.classList.add("hidden");
  selected_vacancy.classList.add("active");
  fillTitleVacancy(vacancy.title);
  fillInfoVacancy(vacancy);
  fillExpectations(vacancy);
  fillOffer(vacancy);
  fillDescription(vacancy);
}

function fillTitleVacancy(title) {
  const titleElement = document.querySelector(".name_vacancy");
  titleElement.textContent = title;
}

function fillInfoVacancy(vacancy) {
  const container = document.querySelector(".info_vacancy");
  container.innerHTML = ``;
  const ul = document.createElement("ul");
  const salary = document.createElement("li");
  const experience = document.createElement("li");
  const timeJob = document.createElement("li");
  const workTime = document.createElement("li");

  salary.innerHTML = `
  <strong>Заработная плата: </strong><span>от ${vacancy.salary.from} до ${vacancy.salary.to} ${setCurrency(vacancy.salary.currency)} за месяц ${vacancy.salary.gross ? ", на руки" : ""}</span>`;

  experience.innerHTML = `
    <strong>Опыт работы: </strong><span>${setExperience(vacancy.experience)}</span>`;

  timeJob.innerHTML = vacancy.work_employment
    ? `<strong>${setEmployment(vacancy.work_employment)}</strong>`
    : "";

  workTime.innerHTML = vacancy.work_schedule
    ? `<strong>График: </strong><span>${vacancy.work_schedule}</span>`
    : "";

  ul.appendChild(salary);
  ul.appendChild(experience);

  container.appendChild(ul);
}

function fillExpectations() {
  const container = document.querySelector(".requirements_vacancy");
  container.innerHTML = ``;
  const h2 = document.createElement("h2");
  const ul = document.createElement("ul");
  const li = document.createElement("li");

  h2.innerText = `Ожидания от кандидата`;

  li.innerText = `Знание и понимание принципов работы сетевых протоколов (модель OSI)`;

  ul.appendChild(li);

  container.appendChild(h2);
  container.appendChild(ul);
}

function fillOffer() {
  const container = document.querySelector(".offer");
  container.innerHTML = ``;
  const h2 = document.createElement("h2");
  const ul = document.createElement("ul");
  const li = document.createElement("li");

  h2.innerText = `Мы предлагаем:`;

  li.innerText = `Работу в аккредитованной IТ-компании`;

  ul.appendChild(li);

  container.appendChild(h2);
  container.appendChild(ul);
}

function fillDescription(vacancy) {
  const container = document.querySelector(".description_vacancy");
  container.innerHTML = ``;
  const p = document.createElement("p");

  p.innerText = `${vacancy.description ? "" : "У нас современный офис с парковкой и всем необходимым для комфортной работы и отдыха в самом сердце Йошкар-Олы. Рядом набережная с прекрасными видами, кучей кафешек, театрами, музеями и быстрой доступностью из любой точки города."}`;

  container.appendChild(p);
}

function goToListVacancies() {
  hideAll();
  tab_btn_container.classList.remove("hidden");
  btn_vacancies.classList.add("active");
  vacancies.classList.add("active");
}

function setCurrency(currency) {
  const currencies = {
    RUB: "₽",
    USD: "$",
    EUR: "€",
  };
  return currencies[currency] || "";
}

function setExperience(experience) {
  const experiences = {
    NO_WORK_EXPERIENCE: "без опыта",
    WORK_EXPERIENCE_FROM_1_YEAR_TO_3_YEAR: "1 - 3 года",
    WORK_EXPERIENCE_FROM_3_YEAR_TO_6_YEAR: "3 - 6 лет",
    WORK_EXPERIENCE_MORE_THAN_6_YEAR: "более 6 лет",
  };
  return experiences[experience] || "";
}

function setEmployment(employment) {
  return employment === "fulltime" ? "Полная занятость" : "Частичная занятость";
}

document.addEventListener("DOMContentLoaded", function() {
  addTemplateForm("container_send_cv");
});

function onClickRespond() {
  const dialog = document.querySelector("#send_cv");
  addTemplateForm("send_cv");
  if (dialog) dialog.showModal();
}

function handleSubmit(event, id_container, loadedFile) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const isLoadedFile = loadedFile !== null;

  validateForm(formData, form, id_container, isLoadedFile);
}

function validateForm(data, form, id_container, isLoadedFile) {
  const fields = {
    firstName: form.querySelector("#dialog_first_name"),
    lastName: form.querySelector("#dialog_last_name"),
    phone: form.querySelector("#dialog_phone"),
    email: form.querySelector("#dialog_email"),
    urlCv: form.querySelector("#dialog_cv"),
    cvFile: form.querySelector("#drop-area"),
  };

  const formValues = Object.fromEntries(data);
  let isInvalid = false;

  ["firstName", "lastName"].forEach(field => {
    const value = formValues[field];
    const input = fields[field];

    if (!value || value.trim() === "" || /\d/.test(value)) {
      input.classList.add("invalid");
      isInvalid = true;
      console.log("ERROR: ", value);
    }
  });

  const phone = formValues.phone;
  if (!phone || phone.trim() === "" || phone.length < 18) {
    fields.phone.classList.add("invalid");
    isInvalid = true;
  }

  const email = formValues.email;
  if (!email || email.trim() === "") {
    fields.email.classList.add("invalid");
    isInvalid = true;
  }

  if (!isLoadedFile) {
    const urlCv = formValues.urlCv;
    if (!urlCv || urlCv.trim() === "" || /\s/.test(urlCv)) {
      fields.urlCv.classList.add("invalid");
      fields.cvFile.classList.add("invalid");
      isInvalid = true;
    }
  }


  if (!isInvalid) {
    let localData = JSON.parse(getLocalData(chosen_vacancy.id));

    if (localData !== null && id_container === "send_cv" && localData.id === chosen_vacancy.id) {
      const isWithinTwoWeeks = !isTwoWeeksPassed(localData.dataTime);

      if (isWithinTwoWeeks) {
        if (localData.attempts >= 2) {
          openAlreadySentModal();
        } else {
          saveLocalData(chosen_vacancy.id, {
            ...localData,
            attempts: localData.attempts + 1,
          });
          openSendModal();
        }
      } else {
        saveLocalData(chosen_vacancy.id, {
          ...formValues,
          ...chosen_vacancy,
          attempts: 1,
        });
        openSendModal();
      }
    } else {
      saveLocalData(chosen_vacancy.id, {
        ...formValues,
        ...chosen_vacancy,
        attempts: 1,
      });
      openSendModal();
    }
  }
}

function isTwoWeeksPassed(dateString) {
  const diffMs = new Date() - new Date(dateString);
  const twoWeeksInMs = 1000 * 60 * 60 * 24 * 14;
  return diffMs >= twoWeeksInMs;
}

function addTemplateForm(id_container) {
  const template = document.getElementById("template_vacancy");
  const container = document.getElementById(id_container);
  if (template && container) {
    container.innerHTML = "";
    const clone = document.importNode(template.content, true);
    if (id_container === "container_send_cv") {
      const title = clone.querySelector(".title");
      if (title) title.remove();
    }
    container.appendChild(clone);

    const form = container.querySelector("form");
    if (form && !form._handlerSet) {
      const dropArea = form.querySelector("#drop-area");
      const cvText = form.querySelector("#cv-text");

      form.addEventListener("input", function(event) {
        const input = event.target;
        input.classList.remove("invalid");
        if (
          input.id === "dialog_first_name" ||
          input.id === "dialog_last_name"
        ) {
          input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
        }
      });

      IMask(form.querySelector("#dialog_phone"), { mask: "+7 (000) 000 00-00" });

      let uploadFile = null;

      loadFile(dropArea, cvText, function(file) {
        uploadFile = file;
      });

      form.addEventListener("submit", function(e) {
        handleSubmit(e, id_container, uploadFile);
      });
      form._handlerSet = true;
    }
  }
}

function loadFile(dropArea, cvText, onFileSelected) {
  const fileInput = document.querySelector("#cv_file_input");

  dropArea.addEventListener("click", () => {
    fileInput.click();
  });

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
  });

  dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      handleFile(file);
    }
  });


  function handleFile(file) {
    cvText.textContent = file.name;
    onFileSelected(file);
  }
}

function closeAllDialogs() {
  const dialogs = document.querySelectorAll("dialog");

  dialogs.forEach(dialog => {
    if (dialog.open) {
      dialog.close();
    }
  });
}

function saveLocalData(key, objectData) {
  objectData.dataTime = new Date();
  localStorage.setItem(key, JSON.stringify(objectData));
}

function getLocalData(key) {
  return localStorage.getItem(key);
}

function openSendModal() {
  const dialog = document.querySelector("#sent_cv");
  dialog.showModal();
}

function openAlreadySentModal() {
  const dialog = document.querySelector("#already_sent_cv");
  dialog.showModal();
}

window.selectTypeVacancy = selectTypeVacancy;
window.onClickBurgerMenu = onClickBurgerMenu;
window.onClickBtnVacancy = onClickBtnVacancy;
window.onClickBtnAboutCompany = onClickBtnAboutCompany;
window.goToListVacancies = goToListVacancies;

window.onClickRespond = onClickRespond;
window.closeAllDialogs = closeAllDialogs;
window.openSendModal = openSendModal;
window.openAlreadySentModal = openAlreadySentModal;
