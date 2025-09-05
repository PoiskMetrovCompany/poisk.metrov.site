import React from "react"
import styles from "./bulletList.module.scss"
import clsx from "clsx"

const BulletList = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <ul className={clsx(styles.bulletList, className)}>{children}</ul>
}

export default BulletList