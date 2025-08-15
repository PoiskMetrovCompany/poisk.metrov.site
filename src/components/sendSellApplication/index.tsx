"use client"
import React, { FC } from "react"
import styles from "./sendApplication.module.scss"
import ActionButton from "../ui/buttons/ActionButton"
import FormSendSellApp from "./rightSide"

const SendSellApplication: FC = () => {
  return (
    <div>
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
      <div className={styles.sendSellApp}>
        <div className={styles.sendSellApp__container}>
          <div className={styles.sendSellApp__leftSide}>
            <div className={styles.sendSellApp__header}>Оставьте заявку</div>
          </div>
          <div className={styles.sendSellApp__rightSide}>
            <FormSendSellApp />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendSellApplication
