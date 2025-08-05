"use client";
import React, { FC } from "react";
import styles from "./header.module.scss";
import TopBar from "./headerComponents/TopBar";
import MainBar from "./headerComponents/MainBar";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <TopBar />
      <MainBar />
    </header>
  );
};
export default Header;