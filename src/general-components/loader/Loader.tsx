import type { FC } from "react";
import style from "./Loader.module.css";

const Loader: FC = () => {
  return (
    <div className={style.loader}></div>
  );
};

export default Loader;