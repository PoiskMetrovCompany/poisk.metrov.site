import React from "react"
import styles from "./notFound.module.scss"
import IconImage from "@/components/ui/IconImage"
import clsx from "clsx"
import Button from "../ui/buttons/ActionButton"

interface INotFoundProps {
  className?: string
  title: string
  description: string
  buttonText?: string
  onClick?: () => void
}

const NotFound = ({
  className,
  title,
  description,
  buttonText,
  onClick,
}: INotFoundProps) => {
  return (
    <div className={clsx(styles.notFound, className)}>
      <IconImage
        iconLink="/images/icons/empty-box.svg"
        alt="empty-list"
        className={styles.notFound__icon}
      />

      <div className={styles.notFound__content}>
        <h1 className={styles.notFound__content__title}>{title}</h1>
        <p className={styles.notFound__content__description}>{description}</p>
      </div>
      {buttonText && (
        <Button className={styles.notFound__button} onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  )
}

export default NotFound
