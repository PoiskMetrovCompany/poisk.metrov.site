"use client"

import React, { FC } from "react"

import styles from "./infoSection.module.scss"

import Address from "./AddressSection"
import Social from "./SocialSection"
import Contacts from "./contactsSection"
import TelegramPromo from "./telegramPromo"

const InfoSection: FC = () => {
  return (
    <section className={styles.infoSection}>
      <div className={styles.infoSection__container}>
        <Contacts />
        <div className={styles.infoSection__container__address}>
          <Address />
          <Social />
          <TelegramPromo
            className={styles.infoSection__container__telegramDesktop}
          />
        </div>
        <TelegramPromo
          className={styles.infoSection__container__telegramMobile}
        />
      </div>
    </section>
  )
}

export default InfoSection
