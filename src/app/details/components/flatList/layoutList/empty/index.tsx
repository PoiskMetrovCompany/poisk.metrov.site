import React from "react"
import styles from "./empty.module.scss"
import IconImage from "@/components/ui/IconImage"

const EmptyList = () => {
  return (
    <div className={styles.emptyList}>
      <IconImage
        iconLink="/images/icons/empty-box.svg"
        alt="empty-list"
        className={styles.emptyList__icon}
      />

      <div className={styles.emptyList__content}>
        <h2 className={styles.emptyList__content__title}>
          Подходящих вариантов нет
        </h2>
        <p className={styles.emptyList__content__description}>
          Измените фильтры, чтобы изучить другие предложения в этом ЖК
        </p>
      </div>
    </div>
  )
}

export default EmptyList
