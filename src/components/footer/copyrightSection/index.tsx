"use client"

import React, { FC } from "react"

import Link from "next/link"

import styles from "./copyrightSection.module.scss"

const CopyrightSection: FC = () => {
  return (
    <section className={styles.copyrightSection}>
      <div className={styles.copyrightSection__container}>
        <p className={styles.copyrightSection__text}>
          © 2023 Поиск метров. Все права защищены.
        </p>
        <Link href="/privacyPolicy" className={styles.copyrightSection__link}>
          Политика обработки персональных данных
        </Link>
      </div>
    </section>
  )
}

export default CopyrightSection
