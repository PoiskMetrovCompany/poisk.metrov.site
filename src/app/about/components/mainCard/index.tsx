import React from "react"
import styles from "./mainCard.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconImage from "@/components/ui/IconImage"

const MainCard = () => {
  return (
    <div className={styles.mainCard}>
      <div className={styles.mainCard__card}>
        <div className={styles.mainCard__card__text}>
          <div className={styles.mainCard__card__text__heading}>
            <div className={styles.mainCard__card__text__heading__title}>
              <IconImage iconLink="/images/header/logo.webp" alt="about" />
              <h2 className={styles.mainCard__card__title__text}>
                Поиск Метров
              </h2>
            </div>
            <div className={styles.mainCard__card__text__heading__text}>
              бесплатный сервис бронирования новостроек
            </div>
          </div>
          <p className={styles.mainCard__card__text__description}>
            Мы помогаем найти квартиру в Москве, которая подходит вам по цене и
            параметрам.
          </p>
        </div>
        <ActionButton>Оставить заявку</ActionButton>
      </div>
    </div>
  )
}

export default MainCard
