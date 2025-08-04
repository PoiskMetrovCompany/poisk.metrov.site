import React from "react"
import styles from "./IconButton.module.scss"
import Image from "next/image"
import clsx from "clsx"

const IconButton = ({
  iconLink,
  onClick,
  className,
}: {
  iconLink: string
  onClick?: () => void
  className?: string
}) => {
  return (
    <button className={clsx(styles.iconButton, className)} onClick={onClick}>
      <Image src={iconLink} alt="icon" width={32} height={32} />
    </button>
  )
}

export default IconButton
