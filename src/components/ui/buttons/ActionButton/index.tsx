import clsx from "clsx"
import Image from "next/image"
import styles from "./ActionButton.module.scss"

interface ActionButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "primary" | "secondary" | "outline" | "beige" | "whatsapp" | "telegram"
  size?: "small" | "medium" | "large"
  svgSrc?: string
  svgAlt?: string
  buttonWidth?: number
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
  buttonWidth,
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
          [styles.actionButton_whatsap]: type === "whatsapp",
          [styles.actionButton_telegram]: type === "telegram"
        },
        {
          [styles.actionButton_small]: size === "small",
          [styles.actionButton_medium]: size === "medium",
          [styles.actionButton_large]: size === "large",
        },
        className
      )}
      onClick={onClick}
      style={buttonWidth ? { width: `${buttonWidth}px` } : undefined}
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