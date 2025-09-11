"use client"

import React, { FC } from "react"

import Image from "next/image"

import styles from "./telegramPromo.module.scss"

import IconImage from "@/components/ui/IconImage"

const TelegramPromo: FC = () => {
  return (
    <div className={styles.telegramPromo}>
      <div className={styles.divider}></div>
      <div className={styles.telegramPromo__content}>
        <div className={styles.telegramPromo__content__text}>
          <h3 className={styles.telegramPromo__title}>
            Подпишитесь на наш Telegram-канал
          </h3>
          <p className={styles.telegramPromo__description}>
            и будьте в курсе событий и полезных новостей!
          </p>
        </div>
        <a
          href="https://t.me/your_channel"
          className={styles.telegramPromo__button}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconImage
            className={styles.telegramPromo__button__icon}
            iconLink={"./images/icons/telegram.svg"}
            alt="Значок мессенджера телеграмм"
            // width={22}
            // height={24}
          />
        </a>
      </div>
    </div>
  )
}

export default TelegramPromo
