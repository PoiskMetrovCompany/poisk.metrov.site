"use client";
import React, { FC } from "react";
import styles from "./address.module.scss";

const Address: FC = () => {
  return (
    <div className={styles.address}>
      <h3 className={styles.address__title}>
        АДРЕС ОФИСА
      </h3>
      <address className={styles.address__content}>
        <p className={styles.address__city}>г. Новосибирск</p>
        <p className={styles.address__street}>Дуси Ковальчук, 276</p>
        <p className={styles.address__building}>(корпус 13)</p>
      </address>
    </div>
  );
};

export default Address;