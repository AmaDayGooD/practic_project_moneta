type ExperienceKey =
  | "NO_WORK_EXPERIENCE"
  | "WORK_EXPERIENCE_FROM_1_YEAR_TO_3_YEAR"
  | "WORK_EXPERIENCE_FROM_3_YEAR_TO_6_YEAR"
  | "WORK_EXPERIENCE_MORE_THAN_6_YEAR";

const experienceLabels: Record<ExperienceKey, string> = {
  NO_WORK_EXPERIENCE: "без опыта",
  WORK_EXPERIENCE_FROM_1_YEAR_TO_3_YEAR: "1 - 3 года",
  WORK_EXPERIENCE_FROM_3_YEAR_TO_6_YEAR: "3 - 6 лет",
  WORK_EXPERIENCE_MORE_THAN_6_YEAR: "более 6 лет",
};

function setExperience(experience?: string): string {
  return experienceLabels[experience as ExperienceKey] || "";
}

export default setExperience;