import React from "react"
import styles from "./numberedList.module.scss"
import clsx from "clsx"

interface NumberedListProps {
  children: React.ReactNode
  className?: string
  start?: number
}

const NumberedList = ({
  children,
  className,
  start,
}: NumberedListProps) => {
  return (
    <ol 
      className={clsx(styles.numberedList, className)}
      start={start}
    >
      {children}
    </ol>
  )
}

export default NumberedList