import clsx from "clsx"
import Image from "next/image"
import styles from "./ActionButton.module.scss"

interface ActionButtonProps {
  children: React.ReactNode
  className?: string
  svgClassName?: string
  onClick?: () => void
  type?:
    | "primary"
    | "secondary"
    | "outline"
    | "beige"
    | "outline-white"
    | "gray"
    | "whatsapp"
    | "telegram"
    | "disabled"
  size?: "small" | "medium" | "large" | "tiny"
  svgSrc?: string
  svgAlt?: string
  buttonWidth?: number
  svgWidth?: number
  svgHeight?: number
  svgDiscolored?: boolean
  disabled?: boolean
}

const ActionButton = ({
  children,
  className,
  svgClassName,
  onClick,
  type = "primary",
  size = "small",
  svgSrc,
  svgAlt = "",
  buttonWidth,
  svgWidth = 16,
  svgHeight = 16,
  svgDiscolored = false,
  disabled = false,
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
          [styles.actionButton_outline_white]: type === "outline-white",
          [styles.actionButton_gray]: type === "gray",
          [styles.actionButton_disabled]: type === "disabled",
          [styles.actionButton_whatsap]: type === "whatsapp",
          [styles.actionButton_telegram]: type === "telegram",
        },
        {
          [styles.actionButton_small]: size === "small",
          [styles.actionButton_medium]: size === "medium",
          [styles.actionButton_large]: size === "large",
          [styles.actionButton_tiny]: size === "tiny",
        },
        className
      )}
      onClick={onClick}
      style={buttonWidth ? { width: `${buttonWidth}px` } : undefined}
      disabled={disabled}
    >
      {children}
      {svgSrc && (
        <Image
          src={svgSrc}
          alt={svgAlt}
          width={svgWidth}
          height={svgHeight}
          className={clsx(styles.actionButton_svg, svgClassName, {
            [styles.actionButton_svg_discolored]: svgDiscolored,
          })}
        />
      )}
    </button>
  )
}

export default ActionButton
