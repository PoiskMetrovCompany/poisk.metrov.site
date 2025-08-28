import React from "react"
import styles from "./LK.module.scss"
import Image from "next/image"
import LeftFormLK from "@/components/LKComponents/LKForm/LeftFomLK"
import GetCatalogue from "@/components/getCatalogue"

const LK = () => {
  return (
    <div className={styles.LK}>
      <div className={styles.LK__container}>
        <div className={styles.LK__container__header}>Настройки профиля</div>
        <div className={styles.LK__container__formSection}>
          <LeftFormLK />
          <Image
            src={"/images/LKImage.webp"}
            alt="Настройки профиля"
            width={570}
            height={480}
          />
        </div>
        <div className={styles.LK__container__getCatalogue}>
          <GetCatalogue />
        </div>
      </div>
    </div>
  )
}

export default LK
