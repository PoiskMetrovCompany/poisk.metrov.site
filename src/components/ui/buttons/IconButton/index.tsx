import React from "react"
import styles from "./IconButton.module.scss"
import Image from "next/image"

const IconButton = ({
  iconLink,
  onClick,
}: {
  iconLink: string
  onClick?: () => void
}) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      <Image src={iconLink} alt="icon" width={32} height={32} />
    </button>
  )
}

export default IconButton
