import { useState, useEffect } from "react";
import type { FC } from "react";
import type { VacancyData, VacancyItem } from "@/src/types/Vacancy.ts";
import Loader from "@general_components/loader/Loader.tsx";
import style from "./ListVacancy.module.css";

import backOfficeVacancies from "/icons/back_office_vacancies.svg";
import technicalVacancies from "/icons/technical_vacancies.svg";
import { useStoreContext } from "@store/storeContext.ts";
import setCurrency from "@utils/setCurrency.tsx";
import Button from "@general_components/button/Button.tsx";

const VACANCIES_PER_PAGE = 9;

const ListVacancy: FC = () => {
  const [vacancies, setVacancies] = useState<VacancyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchVacancies = async (pageNum: number) => {
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
    } catch (e) {
      throw new Error(`Ошибка получения вакансий ${e}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies(page);
  }, []);

  const { setSelectedVacancy, setActiveTab } = useStoreContext();

  const handleDetailClick = (vacancy: VacancyItem) => {
    setSelectedVacancy(vacancy);
    setActiveTab("selectedVacancy");
  };

  return (
    <>
      <ul className={style.list_vacancies}>
        {vacancies.map((vacancy: VacancyItem) => (
          <li className={style.vacancies_item} key={vacancy.id}>
            <img src={vacancy.department === 'backoffice' ? backOfficeVacancies : technicalVacancies} alt={vacancy.department} />
            <h2>{vacancy.title}</h2>
            <div>
              <p>{vacancy.salary.from} - {vacancy.salary.to} {setCurrency(vacancy.salary.currency)}</p>
              <Button className={style.details_btn} onClick={() => handleDetailClick(vacancy)} text={"Подробнее"}></Button>
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