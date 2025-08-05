"use client";
import React, { FC } from "react";
import styles from "../header.module.css";

interface ILogoProps {
  src?: string;
  alt?: string;
  href?: string;
}

const Logo: FC<ILogoProps> = ({
  src = "/images/logo.png",
  alt = "Логотип компании Поиск Метров",
  href = "/"
}) => {
  return (
    <div className={styles.logo}>
      <a href={href} className={styles["logo__link"]}>
        <img src={src} alt={alt} className={styles["logo__image"]} />
      </a>
    </div>
  );
};

export default Logo;