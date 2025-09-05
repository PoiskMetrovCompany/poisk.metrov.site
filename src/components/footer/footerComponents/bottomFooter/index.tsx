"use client";
import React, { FC } from "react";
import styles from "./bottomFooter.module.scss";
import InfoSection from "./InfoSection";
import CopyrightSection from "./copyrightSection";

const BottomFooter: FC = () => {
  return (
    <div className={styles.bottomFooter}>
      <InfoSection />
      <CopyrightSection />
    </div>
  );
};

export default BottomFooter;