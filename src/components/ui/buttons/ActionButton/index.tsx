import clsx from "clsx"
import styles from "./ActionButton.module.scss"

interface ActionButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "primary" | "secondary"
}

const ActionButton = ({
  children,
  className,
  onClick,
  type = "primary",
}: ActionButtonProps) => {
  return (
    <button
      className={clsx(styles.actionButton, className, {
        [styles.actionButton_primary]: type === "primary",
        [styles.actionButton_secondary]: type === "secondary",
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default ActionButton
