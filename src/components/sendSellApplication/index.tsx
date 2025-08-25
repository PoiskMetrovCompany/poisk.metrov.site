"use client"
import React, { FC } from "react"
import styles from "./sendApplication.module.scss"
import ActionButton from "../ui/buttons/ActionButton"
import FormSendSellApp from "./sendSellApplicationComponents/rightSide"
import ImageSell from "./sendSellApplicationComponents/imageSection"
import ListSection from "./sendSellApplicationComponents/listSection"


const SendSellApplication: FC = () => {
  return (
    <div>
      <ImageSell/>
      <ListSection/>
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
