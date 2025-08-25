import React from "react"
import styles from "./where.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconImage from "@/components/ui/IconImage"

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
      <IconImage
        className={styles.where__map}
        iconLink="/images/about/map.svg"
        alt="map"
      />
    </div>
  )
}

export default Where
