import React from "react"
import Image from "next/image"
import styles from "./iconImage.module.scss"
import clsx from "clsx"

interface IconImageProps {
  className?: string
  iconLink: string
  alt: string
  imageClassName?: string
  loading?: "lazy" | "eager"
}

const IconImage = ({
  iconLink,
  alt,
  className,
  imageClassName,
  loading,
}: IconImageProps) => {
  return (
    <div className={clsx(styles.iconImage, className)}>
      <Image
        src={iconLink}
        alt={alt}
        fill
        className={imageClassName}
        loading={loading}
      />
    </div>
  )
}

export default IconImage
