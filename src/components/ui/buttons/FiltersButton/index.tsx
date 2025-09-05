import React, { FC, useState } from "react"
import clsx from "clsx"
import styles from "./filtersButton.module.scss"
import IconImage from "../../IconImage"

interface FiltersButtonProps {
  text: string
  iconLink?: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

const FiltersButton: FC<FiltersButtonProps> = ({
  text,
  iconLink,
  isActive = false,
  onClick,
  className,
}) => {
  const [internalActive, setInternalActive] = useState(false)

  const active = isActive || internalActive

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      setInternalActive(!internalActive)
    }
  }

  return (
    <button
      className={clsx(
        styles.filtersButton,
        {
          [styles.filtersButton_active]: active,
        },
        className
      )}
      onClick={handleClick}
    >
      {iconLink && (
        <IconImage
          iconLink={iconLink}
          alt="icon"
          className={styles.filtersButton__icon}
        />
      )}
      {text}
    </button>
  )
}

export default FiltersButton
