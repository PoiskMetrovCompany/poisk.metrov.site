"use client";
import React, { FC } from "react";
import styles from "./socialLink.module.scss";

interface SocialLinkProps {
  name: string;
  href: string;
  icon: string;
}

const SocialLink: FC<SocialLinkProps> = ({ name, href, icon }) => {
  return (
    <a 
      href={href}
      className={styles.socialLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Перейти в ${name}`}
    >
      <span className={`${styles.socialLink__icon} ${styles[`socialLink__icon--${icon}`]}`}>
        {/* Icon will be added via CSS or icon component */}
      </span>
      <span className={styles.socialLink__text}>
        {name}
      </span>
    </a>
  );
};

export default SocialLink;