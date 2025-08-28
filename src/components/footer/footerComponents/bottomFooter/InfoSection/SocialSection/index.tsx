"use client";
import React, { FC } from "react";
import styles from "./social.module.scss";
import SocialLink from "@/components/ui/socialLink";

const Social: FC = () => {
  const socialLinksData = [
    {
      name: "Telegram",
      href: "https://t.me/your_channel",
      icon: "telegram"
    },
    {
      name: "WhatsApp", 
      href: "https://wa.me/79994484695",
      icon: "whatsapp"
    },
    {
      name: "Instagram",
      href: "https://instagram.com/your_account",
      icon: "instagram"
    }
  ];

  return (
    <div className={styles.social}>
      <h3 className={styles.social__title}>
        СОЦИАЛЬНЫЕ СЕТИ
      </h3>
      <ul className={styles.social__list}>
        {socialLinksData.map((link) => (
          <li key={link.name} className={styles.social__item}>
            <SocialLink 
              name={link.name}
              href={link.href}
              icon={link.icon}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Social;