import React from "react"
import styles from "./heading.module.scss"
import clsx from "clsx"

const Heading3 = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <h3 className={clsx(styles.heading2, className)}>{children}</h3>
}

export default Heading3
