import clsx from "clsx"

import Image from "next/image"

import styles from "./arrowButton.module.scss"

interface ArrowButtonProps {
  onClick?: () => void
  className?: string
  disabled?: boolean
  size?: "small" | "medium" | "large"
  absolute?: boolean
  loading?: boolean
}

const ArrowButton = ({
  onClick,
  className,
  disabled = false,
  size = "medium",
  absolute = false,
  loading = false,
}: ArrowButtonProps) => {
  return (
    <button
      className={clsx(
        styles.arrowButton,
        {
          [styles.arrowButton_small]: size === "small",
          [styles.arrowButton_medium]: size === "medium",
          [styles.arrowButton_large]: size === "large",
          [styles.arrowButton_absolute]: absolute,
          [styles.arrowButton_loading]: loading,
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <Image
        src="/images/icons/header/nextArrow.svg"
        alt="Arrow"
        width={24}
        height={24}
        className={styles.arrowButton__icon}
      />
    </button>
  )
}

export default ArrowButton
