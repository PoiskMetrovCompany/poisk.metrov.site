import React from "react"
import styles from "./request.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"

interface IRequestProps {
  title: string
  description?: string
  buttonText: string
  onClick?: () => void
}

const Request = ({
  title,
  description,
  buttonText,
  onClick,
}: IRequestProps) => {
  return (
    <div className={styles.request}>
      <div className={styles.request__content}>
        <span className={styles.request__content__title}>{title}</span>
        <span className={styles.request__content__description}>
          {description}
        </span>
      </div>
      <ActionButton className={styles.request__button} onClick={onClick}>
        {buttonText}
      </ActionButton>
    </div>
  )
}

export default Request
