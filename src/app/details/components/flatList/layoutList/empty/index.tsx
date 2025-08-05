import React from "react"
import styles from "./empty.module.scss"
import Image from "next/image"

const EmptyList = () => {
  return (
    <div className={styles.emptyList}>
      <div className={styles.emptyList__icon}>
        <Image src="/images/empty-box.svg" alt="empty-list" fill />
      </div>

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
