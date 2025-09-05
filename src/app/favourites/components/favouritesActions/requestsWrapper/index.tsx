import React from "react"
import styles from "./requestsWrapper.module.scss"
import Request from "../request"
import SelectLayout from "../selectLayout"
import clsx from "clsx"

interface IRequestsWrapperProps {
  isHiddenMobile?: boolean
  isHiddenDesktop?: boolean
}

const RequestsWrapper = ({
  isHiddenMobile,
  isHiddenDesktop,
}: IRequestsWrapperProps) => {
  return (
    <div
      className={clsx(styles.requestsWrapper, {
        [styles.requestsWrapper__hidden_mobile]: isHiddenMobile,
        [styles.requestsWrapper__hidden_desktop]: isHiddenDesktop,
      })}
    >
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
