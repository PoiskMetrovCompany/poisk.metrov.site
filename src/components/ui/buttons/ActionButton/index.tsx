import clsx from "clsx"
import Image from "next/image"
import styles from "./ActionButton.module.scss"

interface ActionButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "primary" | "secondary" | "outline" | "beige" | "gray"
  size?: "small" | "medium" | "large" | "tiny"
  svgSrc?: string
  svgAlt?: string
  svgWidth?: number
  svgHeight?: number
  svgDiscolored?: boolean
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
  svgDiscolored = false,
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
          [styles.actionButton_gray]: type === "gray",
        },
        {
          [styles.actionButton_small]: size === "small",
          [styles.actionButton_medium]: size === "medium",
          [styles.actionButton_tiny]: size === "tiny",
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
          className={clsx(styles.actionButton_svg, {
            [styles.actionButton_svg_discolored]: svgDiscolored,
          })}
        />
      )}
    </button>
  )
}

export default ActionButton
