"use client";
import React, { FC } from "react";
import styles from "../header.module.scss";
import Navigation from "./Navigation";
import ContactInfo from "./ContactInfo";
import UserActions from "./UserActions";
import Logo from "./Logo";

const MainBar: FC = () => {
  return (
    <div className={styles.main_bar}>
      <div className={styles.main_bar__container}>
        <div className={styles.main_bar__left}>
          <Logo />
          <Navigation />
        </div>
        <div className={styles.main_bar__right}>
          <ContactInfo />
          <UserActions />
        </div>
      </div>
    </div>
  );
};

export default MainBar;