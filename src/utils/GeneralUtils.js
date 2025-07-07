export function setCurrency(currency) {
  const currencies = {
    RUB: "₽",
    USD: "$",
    EUR: "€",
  };
  return currencies[currency] || "";
}

export function setExperience(experience) {
  const experiences = {
    NO_WORK_EXPERIENCE: "без опыта",
    WORK_EXPERIENCE_FROM_1_YEAR_TO_3_YEAR: "1 - 3 года",
    WORK_EXPERIENCE_FROM_3_YEAR_TO_6_YEAR: "3 - 6 лет",
    WORK_EXPERIENCE_MORE_THAN_6_YEAR: "более 6 лет",
  };
  return experiences[experience] || "";
}

export function isTwoWeeksPassed(dateString) {
  const diffMs = new Date() - new Date(dateString);
  const twoWeeksInMs = 1000 * 60 * 60 * 24 * 14;
  return diffMs >= twoWeeksInMs;
}

