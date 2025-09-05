import React, { FC } from "react"
import styles from "./imageSection.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"


const ImageSell = () => {
  return (
    <div className={styles.sendSellApp__container__image}>
      <div className={styles.sendSellApp__container__image__text}>
        Хотите продать свою недвижимость?
      </div>
      <div className={styles.sendSellApp__container__image__button}>
        <ActionButton
          type="primary"
          size="medium"
          className={styles.sendSellApp__container__image__button__send}
        >
          Оставить заявку
        </ActionButton>
      </div>
    </div>
  )
}
export default ImageSell
