"use client";
import React, { FC } from "react";
import styles from "./footer.module.scss";
import TopFooter from "./footerComponents/topFooter/TopFooter";
import BottomFooter from "./footerComponents/bottomFooter";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <TopFooter />
      <BottomFooter />
    </footer>
  );
};

export default Footer;