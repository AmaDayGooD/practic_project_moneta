import { useState, useEffect } from "react";
import type { FC } from "react";
import type { VacancyData, VacancyItem } from "../../../../../types/Vacancy";
import Loader from "../../../../../general-components/loader/Loader.tsx";
import style from "./ListVacancy.module.css";

import backOfficeVacancies from "/icons/back_office_vacancies.svg";
import Button from "../../../../../general-components/button/Button.tsx";

const VACANCIES_PER_PAGE = 9;

const ListVacancy: FC = () => {
  const [vacancies, setVacancies] = useState<VacancyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchVacancies = async (pageNum: number) => {
    console.log("Load vacancies: " + pageNum);
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://learn-9fc9-git-main-imsokolovivs-projects.vercel.app/api/vacancies/list?limit=${VACANCIES_PER_PAGE}&page=${pageNum}`,
      );

      if (!response.ok) {
        throw new Error("Ошибка загрузки вакансий");
      }

      const data: VacancyData = await response.json();

      if (!data.data || data.data.length === 0 || pageNum >= data.totalPages) {
        setHasMore(false);
      }

      setVacancies((prev) => {
        const existingIds = new Set(prev.map((v) => v.id));
        const newVacancies = data.data.filter((vacancy) => !existingIds.has(vacancy.id));
        return [...prev, ...newVacancies];
      });

      if (hasMore) {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError((err as Error).message || "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies(page);
  }, []);

  const setCurrency: (currency: string) => string = (currency) => {
    const currencies: Record<string, string> = {
      RUB: "₽",
      USD: "$",
      EUR: "€",
    };
    return currencies[currency] || "";
  };

  return (
    <>
      <ul className={style.list_vacancies}>
        {vacancies.map((vacancy) => (
          <li className={style.vacancies_item} key={vacancy.id}>
            <img src={backOfficeVacancies} alt="Техническое" />
            <h2>{vacancy.title}</h2>
            <div>
              <p>{vacancy.salary.from} - {vacancy.salary.to} {setCurrency(vacancy.salary.currency)}</p>
              <button className="details-btn">Подробнее</button>
            </div>
          </li>
        ))}
      </ul>

      {loading && <Loader />}

      {!loading && hasMore && (
        <div className={style.btn_wrapper}>
          <Button onClick={() => fetchVacancies(page)} className={style.btn_more} text={"Загрузить ещё"} />
        </div>
      )}
    </>
  );
};

export default ListVacancy;