import React from "react"
import * as Switch from "@radix-ui/react-switch"
import styles from "./switch.module.scss"

interface ISwitchProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  label?: string
}

const SwitchComponent = ({
  id = "switch",
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
  label,
}: ISwitchProps) => {
  return (
    <div className={`${styles.switch} ${className || ""}`}>
      <Switch.Root
        className={styles.switch__button}
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      >
        <Switch.Thumb className={styles.switch__button__thumb} />
      </Switch.Root>
      {label && <span className={styles.switch__text}>{label}</span>}
    </div>
  )
}

export default SwitchComponent
