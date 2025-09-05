"use client";
import React, { FC } from "react";
import styles from "./telegramPromo.module.scss";
import Image from "next/image";
const TelegramPromo: FC = () => {
  return (
    <div className={styles.telegramPromo}>
      <div className={styles.divider}></div>
      <h3 className={styles.telegramPromo__title}>
        Подпишитесь на наш Telegram-канал
      </h3>
      <p className={styles.telegramPromo__description}>
        и будьте в курсе событий и полезных новостей!
      </p>
      <a 
        href="https://t.me/your_channel" 
        className={styles.telegramPromo__button}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.telegramPromo__buttonIcon}>
            <Image
              src={"./images/icons/telegram.svg"}
              alt="Значок мессенджера телеграмм"
              width={22}
              height={24}
            />
        </span>
      </a>
    </div>
  );
};

export default TelegramPromo;