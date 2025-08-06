import React from "react"
import styles from "./heading.module.scss"
import clsx from "clsx"

const Heading2 = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <h2 className={clsx(styles.heading2, className)}>{children}</h2>
}

export default Heading2
