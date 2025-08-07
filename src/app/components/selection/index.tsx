import React from "react"
import styles from "./selection.module.scss"
import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"

const Selection = () => {
  return (
    <div className={styles.selection}>
      <IconImage
        className={styles.selection__bg}
        iconLink="/images/backgrounds/selection.svg"
        alt="selection"
      />
      <div className={styles.selection__content}>
        <div className={styles.selection__content__text}>
          <h2 className={styles.selection__content__text__title}>
            Подберём квартиру по вашим критериям!
          </h2>
          <p className={styles.selection__content__text__description}>
            Заполните анкеты с параметрами недвижимости и получите
            индивидуальную подборку актуальных предложений
          </p>
        </div>
        <ActionButton
          size="medium"
          className={styles.selection__content__button}
        >
          Начать
        </ActionButton>
      </div>
    </div>
  )
}

export default Selection
