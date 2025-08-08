"use client";
import React, { FC } from "react";
import styles from "./topFooter.module.scss";
import ContactSection from "./ContactSection/ContactSection";

const TopFooter: FC = () => {
  return (
    <div className={styles.topFooter}>
      <div className={styles.topFooter__container}>
        <ContactSection />
      </div>
    </div>
  );
};

export default TopFooter;