"use client";
import React, { FC } from "react";
import styles from "../header.module.css";
import Navigation from "./Navigation";
import ContactInfo from "./ContactInfo";
import UserActions from "./UserActions";
import Logo from "./Logo";

const MainBar: FC = () => {
  return (
    <div className={styles["main-bar"]}>
      <div className={styles["main-bar__container"]}>
        <div className={styles["main-bar__left"]}>
          <Logo />
          <Navigation />
        </div>
        <div className={styles["main-bar__right"]}>
          <ContactInfo />
          <UserActions />
        </div>
      </div>
    </div>
  );
};

export default MainBar;