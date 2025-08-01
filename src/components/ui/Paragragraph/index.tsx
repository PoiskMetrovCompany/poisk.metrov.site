import React from "react"
import styles from "./paragraph.module.scss"
import clsx from "clsx"

const Paragraph = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <p className={clsx(styles.paragraph, className)}>{children}</p>
}

export default Paragraph
