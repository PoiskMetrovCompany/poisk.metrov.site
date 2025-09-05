import React from "react"
import Link from "next/link"
import styles from "./link.module.scss"
import clsx from "clsx"

const CustomLink = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode
  href: string
  className?: string
}) => {
  return (
    <Link href={href} className={clsx(styles.link, className)}>
      {children}
    </Link>
  )
}

export default CustomLink
