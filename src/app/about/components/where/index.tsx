import React from "react"

import styles from "./where.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"

const Where = () => {
  return (
    <div className={styles.where}>
      <div className={styles.where__info}>
        <div className={styles.where__info__text}>
          <h2 className={styles.where__info__text__title}>Где мы работаем</h2>
          <p className={styles.where__info__text__description}>
            Наши офисы расположены <br /> в <b>Новосибирске</b> и{" "}
            <b>Санкт-Петербурге</b>
          </p>
          <p className={styles.where__info__text__description}>
            Мы знаем особенности рынка недвижимости в каждом городе и всегда
            готовы предложить именно то, что подходит вам больше всего
          </p>
        </div>
        <ActionButton className={styles.where__info__button}>
          Получить консультацию
        </ActionButton>
      </div>
      <div className={styles.where__map} />
    </div>
  )
}

export default Where
