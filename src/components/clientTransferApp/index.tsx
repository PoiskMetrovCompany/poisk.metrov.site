"use client"
import React, { FC } from "react"
import styles from "./clientTransferApp.module.scss"
import ClientTranferForm from "./rightSide"

const ClientTransferApp: FC = () => {
  return (
    <div className={styles.sendSellApp}>
      <div className={styles.sendSellApp__container}>
        <div className={styles.sendSellApp__leftSide}>
          <div className={styles.sendSellApp__header}>
            Оформите заявку на передачу клиента
          </div>
          <div className={styles.sendSellApp__description}>
            Заполните все необходимые данные и мы свяжемся с вами для уточнения
            деталей
          </div>
        </div>
        <div className={styles.sendSellApp__rightSide}>
          <ClientTranferForm />
        </div>
      </div>
    </div>
  )
}

export default ClientTransferApp
