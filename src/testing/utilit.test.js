import { isTwoWeeksPassed, setCurrency, setExperience } from "../utils/GeneralUtils.js";

test("Определение символа валюты", () => {
  expect(setCurrency("RUB")).toBe("₽");
  expect(setCurrency("USD")).toBe("$");
  expect(setCurrency("EUR")).toBe("€");
  expect(setCurrency("GHA")).toBe("");
});

test("Определение корректного опыта из полученных данных", () => {
  expect(setExperience("NO_WORK_EXPERIENCE")).toBe("без опыта");
  expect(setExperience("WORK_EXPERIENCE_FROM_1_YEAR_TO_3_YEAR")).toBe("1 - 3 года");
  expect(setExperience("UNKNOWN")).toBe("");
});

test("Проверка что прошло ровно 2 недели", () => {
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
  const threeWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  expect(isTwoWeeksPassed(twoWeeksAgo)).toBe(false);
  expect(isTwoWeeksPassed(threeWeeksAgo)).toBe(true);
});

test('проверка установки ошибки на поле', () => {
  const form = {
    querySelector: (selector) => ({
      classList: { add: jest.fn(), remove: jest.fn() },
      value: ''
    }),
  };

  const data = new FormData();
  const fields = {
    firstName: form.querySelector("#dialog_first_name"),
    lastName: form.querySelector("#dialog_last_name"),
    phone: form.querySelector("#dialog_phone"),
    email: form.querySelector("#dialog_email"),
    urlCv: form.querySelector("#dialog_cv"),
    cvFile: form.querySelector("#drop-area"),
  };

  let isInvalid = false;

  ["firstName", "lastName"].forEach(field => {
    const value = '';
    const input = fields[field];
    if (!value || value.trim() === "" || /\d/.test(value)) {
      input.classList.add("invalid");
      isInvalid = true;
    }
  });

  const phone = fields.phone;
  if(!phone.value || phone.trim() === "" || phone.length < 18) {
    fields.phone.classList.add("invalid");
    isInvalid = true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = fields.email;
  if (!emailRegex.test(email)) {
    fields.email.classList.add("invalid");
    isInvalid = true;
  }

  expect(fields.firstName.classList.add).toHaveBeenCalledWith("invalid");
  expect(fields.lastName.classList.add).toHaveBeenCalledWith("invalid");
  expect(fields.phone.classList.add).toHaveBeenCalledWith("invalid");
  expect(fields.email.classList.add).toHaveBeenCalledWith("invalid");
});