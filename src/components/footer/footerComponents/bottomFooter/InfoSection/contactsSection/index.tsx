"use client";
import React, { FC } from "react";
import styles from "./contacts.module.scss";

const Contacts: FC = () => {
  return (
    <div className={styles.contacts}>
      <a 
        href="tel:+79994484695" 
        className={styles.contacts__phone}
      >
        +7 (999) 448-46-95
      </a>
      <a 
        href="mailto:poisk-metrov@yandex.ru" 
        className={styles.contacts__email}
      >
        poisk-metrov@yandex.ru
      </a>
    </div>
  );
};

export default Contacts;