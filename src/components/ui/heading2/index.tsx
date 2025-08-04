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
  return <h1 className={clsx(styles.heading2, className)}>{children}</h1>
}

export default Heading2
