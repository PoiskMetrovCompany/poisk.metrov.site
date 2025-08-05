import React from "react"
import Image from "next/image"
import styles from "./iconImage.module.scss"
import clsx from "clsx"

interface IconImageProps {
  className?: string
  iconLink: string
  alt: string
}

const IconImage = ({ iconLink, alt, className }: IconImageProps) => {
  return (
    <div className={clsx(styles.iconImage, className)}>
      <Image src={iconLink} alt={alt} fill />
    </div>
  )
}

export default IconImage
