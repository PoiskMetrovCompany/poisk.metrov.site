import React from "react"
import styles from "./requestsWrapper.module.scss"
import Request from "../request"
import SelectLayout from "../selectLayout"

const RequestsWrapper = () => {
  return (
    <div className={styles.requestsWrapper}>
      <SelectLayout />
      <Request
        title="Оставьте заявку и наш брокер поможет вам с выбором"
        buttonText="Оставить заявку"
      />
      <Request
        title="Скачайте свой каталог с избранным"
        description="Каталог с вашим избранным доступен для скачивания с формате pdf после регистрации"
        buttonText="Скачать"
      />
    </div>
  )
}

export default RequestsWrapper
