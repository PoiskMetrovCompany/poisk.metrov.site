import clsx from "clsx"

import React from "react"

import Image from "next/image"

import styles from "./IconButton.module.scss"

type IconButtonProps = {
  iconLink: string
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  iconClassName?: string
  size?: "sm" | "md" | "lg" | "tiny"
  type?: "primary" | "secondary" | "orange" | "orange-light"
  alt?: string
  disabled?: boolean
}

const IconButton: React.FC<IconButtonProps> = ({
  iconLink,
  onClick,
  className,
  iconClassName,
  size = "md",
  type = "primary",
  alt,
  disabled = false,
}) => {
  return (
    <button
      className={clsx(styles.iconButton, className, {
        [styles.iconButton_sm]: size === "sm",
        [styles.iconButton_md]: size === "md",
        [styles.iconButton_lg]: size === "lg",
        [styles.iconButton_tiny]: size === "tiny",
        [styles.iconButton_primary]: type === "primary",
        [styles.iconButton_secondary]: type === "secondary",
        [styles.iconButton_orange]: type === "orange",
        [styles.iconButton_orangeLight]: type === "orange-light",
        [styles.iconButton_disabled]: disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={clsx(styles.iconButton__icon, iconClassName, {
          [styles.iconButton__icon_primary]: type === "primary",
          [styles.iconButton__icon_secondary]: type === "secondary",
        })}
      >
        <Image
          src={iconLink}
          alt={alt || "icon"}
          fill
          className={styles.iconButton__iconImage}
        />
      </div>
    </button>
  )
}

export default IconButton
