import clsx from "clsx"
import styles from "./ActionButton.module.scss"

interface ActionButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "primary" | "secondary" | "outline" | "beige"
  size?: "small" | "medium" | "tiny"
}

const ActionButton = ({
  children,
  className,
  onClick,
  type = "primary",
  size = "small",
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
          [styles.actionButton_tiny]: size === "tiny",
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ActionButton
