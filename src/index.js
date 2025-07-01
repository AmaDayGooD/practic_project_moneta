const tab_btn_container = document.querySelector("#tab");
const btn_about_company = document.querySelector("#btn-about-company");
const btn_vacancies = document.querySelector("#btn-vacancies");

const about_company = document.querySelector("#tab-about-company");
const vacancies = document.querySelector("#tab-vacancies");
const selected_vacancy = document.querySelector("#selected_vacancy");

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

function getVacancies() {
  const url = "https://learn-9fc9-git-main-imsokolovivs-projects.vercel.app/api/vacancies/list ";
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
      renderListVacancies(data.data);
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

      li.innerHTML = `
        <img src="src/assets/icons/ic_back_office_vacancies.svg" alt="Техническое">
        <h2>${vacancy.title}</h2>
        <div>
          <p>${vacancy.salary.from} - ${vacancy.salary.to}${setCurrency(vacancy.salary.currency)}</p>
          <button class="details-btn">Подробнее</button>
        </div>
      `;

      const button = li.querySelector(".details-btn");
      button.addEventListener("click", () => {
        goToVacancy(vacancy);
      });

      container.appendChild(li);
    }
  });
}

function goToVacancy(vacancy) {
  hideAll();
  tab_btn_container.classList.add("hidden");
  selected_vacancy.classList.add("active");
  fillInfoVacancy(vacancy);
  fillExpectations(vacancy);
  fillOffer(vacancy);
  fillDescription(vacancy);
}

function fillInfoVacancy(vacancy) {
  const container = document.querySelector(".info_vacancy");
  container.innerHTML = ``;
  const ul = document.createElement("ul");
  const salary = document.createElement("li");
  const experience = document.createElement("li");

  salary.innerHTML = `
  <strong>Заработная плата: </strong><span>от ${vacancy.salary.from} до ${vacancy.salary.to} ${setCurrency(vacancy.salary.currency)} за месяц ${vacancy.salary.gross ? ", на руки" : ""}</span>`;

  experience.innerHTML = `
    <strong>Опыт работы: </strong><span>${setExperience(vacancy.experience)}</span>
`;

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

document.addEventListener("DOMContentLoaded", function() {
  addTemplateForm("form-send-cv");
});

function onClickRespond() {
  const dialog = document.querySelector("#send_cv");
  addTemplateForm("send_cv");
  if (dialog) dialog.showModal();
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  for (let [key, value] of formData.entries()) {
    console.log(key, ":", value);
  }

  openSendModal();
}

function addTemplateForm(id_container) {
  const template = document.getElementById("template_vacancy");
  const container = document.getElementById(id_container);
  if (template && container) {
    container.innerHTML = "";
    const clone = document.importNode(template.content, true);
    if (id_container === "form-send-cv") {
      const title = clone.querySelector(".title");
      if (title) title.remove();
    }
    container.appendChild(clone);

    const form = container.querySelector("form");
    if (form && !form._handlerSet) {
      form.addEventListener("submit", function(e) {
        handleSubmit(e);
      });
      form._handlerSet = true;
    }
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

function openSendModal() {
  const dialog = document.querySelector("#sent_cv");
  dialog.showModal();
}

function openAlreadySentModal() {
  const dialog = document.querySelector("#already_sent_cv");
  dialog.showModal();
}

window.onClickBtnVacancy = onClickBtnVacancy;
window.onClickBtnAboutCompany = onClickBtnAboutCompany;
window.goToListVacancies = goToListVacancies;

window.onClickRespond = onClickRespond;
window.closeAllDialogs = closeAllDialogs;
window.openSendModal = openSendModal;
window.openAlreadySentModal = openAlreadySentModal;
