import clsx from "clsx"
import Image from "next/image"
import styles from "./ActionButton.module.scss"

interface ActionButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "primary" | "secondary" | "outline" | "beige"
  size?: "small" | "medium" | "large"
  svgSrc?: string
  svgAlt?: string
  svgWidth?: number
  svgHeight?: number
}

const ActionButton = ({
  children,
  className,
  onClick,
  type = "primary",
  size = "small",
  svgSrc,
  svgAlt = "",
  svgWidth = 16,
  svgHeight = 16,
}: ActionButtonProps) => {
  return (
    <button
      className={clsx(
        styles.actionButton,
        {
          [styles.actionButton_primary]: type === "primary",
          [styles.actionButton_secondary]: type === "secondary",
          [styles.actionButton_outline]: type === "outline",
          [styles.actionButton_beige]: type === "beige",
        },
        {
          [styles.actionButton_small]: size === "small",
          [styles.actionButton_medium]: size === "medium",
          [styles.actionButton_large]: size === "large",
        },
        className
      )}
      onClick={onClick}
    >
      {children}
      {svgSrc && (
        <Image
          src={svgSrc}
          alt={svgAlt}
          width={svgWidth}
          height={svgHeight}
          className={styles.actionButton_svg}
        />
      )}
    </button>
  )
}

export default ActionButton