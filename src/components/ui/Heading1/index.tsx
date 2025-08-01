import React from "react"
import styles from "./heading.module.scss"
import clsx from "clsx"

const Heading1 = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <h1 className={clsx(styles.heading1, className)}>{children}</h1>
}

export default Heading1
