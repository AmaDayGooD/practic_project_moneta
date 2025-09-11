import type { FC } from "react";
import styles from "./Button.module.css"

type ButtonType = "normal" | "light";

type ButtonProps = {
  className?: string;
  text?: string;
  image?: string;
  onClick?: () => void;
  type?: ButtonType;
}

const Button: FC<ButtonProps> = ({className, text, image, onClick, type}) => {
  className = className ? className : type === 'light' ? `${styles.button} ${styles['button--light']}` : styles.button;

  return (
    <button className={className} onClick={onClick}>
      {text ? (
        text
      ) : image ? (
        <img src={image} alt="" />
      ) : null}
    </button>
  )
};

export default Button;