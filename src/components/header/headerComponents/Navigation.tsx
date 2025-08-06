"use client";
import React, { FC } from "react";
import styles from "../header.module.scss";

interface INavItem {
  text: string;
  href: string;
}

const Navigation: FC = () => {
  const navItems: INavItem[] = [
    { text: "Каталог недвижимости", href: "/catalog" },
    { text: "Продать", href: "/sell" },
    { text: "Ипотека", href: "/mortgage" }
  ];

  return (
    <nav className={styles.navigation}>
      <ul className={styles["navigation__list"]}>
        {navItems.map((item, index) => (
          <li key={index} className={styles["navigation__item"]}>
            <button className={styles["navigation__button"]} type="button">
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;