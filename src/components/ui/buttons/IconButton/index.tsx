import React from "react"
import styles from "./IconButton.module.scss"
import Image from "next/image"
import clsx from "clsx"

type IconButtonProps = {
  iconLink: string
  onClick?: () => void
  className?: string
  iconClassName?: string
  size?: "sm" | "md" | "lg" | "tiny"
  type?: "primary" | "secondary"
  alt?: string
}

const IconButton: React.FC<IconButtonProps> = ({
  iconLink,
  onClick,
  className,
  iconClassName,
  size = "md",
  type = "primary",
  alt,
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
      })}
      onClick={onClick}
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
