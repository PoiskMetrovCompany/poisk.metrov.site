"use client";
import React, { FC } from "react";
import styles from "../header.module.css";
import Logo from "./Logo";
import LocationSelector from "./LocationSelector";

interface ITopBarLink {
  text: string;
  href: string;
}

const TopBar: FC = () => {
  const links: ITopBarLink[] = [
    { text: "О компании", href: "/about" },
    { text: "Партнерам", href: "/partners" },
    { text: "Офисы", href: "/offices" },
  ];

  return (
    <div id = "1" className={styles["top-bar"]}>
      <div className={styles["top-bar__container"]}>
        <div className={styles["top-bar__left"]}>
          <LocationSelector />
        </div>
        <div className={styles["top-bar__right"]}>
          <nav className={styles["top-bar__nav"]}>
            <ul className={styles["top-bar__list"]}>
              {links.map((link, index) => (
                <li key={index} className={styles["top-bar__item"]}>
                  <a href={link.href} className={styles["top-bar__link"]}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopBar;