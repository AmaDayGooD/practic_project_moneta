type JobExperience =
  "NO_WORK_EXPERIENCE"
  | "WORK_EXPERIENCE_FROM_1_YEAR_TO_3_YEAR"
  | "WORK_EXPERIENCE_FROM_3_YEAR_TO_6_YEAR"
  | "WORK_EXPERIENCE_MORE_THAN_6_YEAR";

type Salary = {
  from: number;
  to: number;
  currency: string;
  gross: boolean;
};

export type VacancyItem = {
  id: string;
  title: string;
  priority: number;
  salary: Salary;
  location: string;
  experience: JobExperience;
  published: string;
  url: string;
};

export type VacancyData = {
  "page": number;
  "limit": number;
  "total": string;
  "totalPages": number;
  "data": VacancyItem[];
};