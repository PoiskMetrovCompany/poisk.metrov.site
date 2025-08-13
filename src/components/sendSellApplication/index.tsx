"use client"
import React, {FC} from "react";
import styles from "./sendApplication.module.scss"
import FormSendSellApp from "./rightSide";


const SendSellApplication:FC = () => {
  return(
    <div className={styles.sendSellApp}>
        <div className={styles.sendSellApp__container}>
            <div className={styles.sendSellApp__leftSide}>
              <div className={styles.sendSellApp__header}>
                Оставьте заявку
              </div>
            </div>
            <div className={styles.sendSellApp__rightSide}>
                <FormSendSellApp
                  
                />
            </div>
        </div>
    </div>
  )
}

export default SendSellApplication