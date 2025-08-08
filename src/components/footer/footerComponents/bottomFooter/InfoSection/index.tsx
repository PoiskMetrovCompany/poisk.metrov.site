"use client";
import React, { FC } from "react";
import styles from "./infoSection.module.scss";
import Contacts from "./contactsSection";
import Address from "./AddressSection";
import Social from "./SocialSection";
import TelegramPromo from "./telegramPromo";

const InfoSection: FC = () => {
  return (
    <section className={styles.infoSection}>
      <div className={styles.infoSection__container}>
        <Contacts />
        <Address />
        <Social />
        <TelegramPromo />
      </div>
    </section>
  );
};

export default InfoSection;