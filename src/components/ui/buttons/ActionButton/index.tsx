import clsx from "clsx"
import styles from "./ActionButton.module.scss"

interface ActionButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "primary" | "secondary" | "outline" | "beige"
}

const ActionButton = ({
  children,
  className,
  onClick,
  type = "primary",
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
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ActionButton
