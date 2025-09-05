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
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
}

const IconImage = ({
  iconLink,
  alt,
  className,
  imageClassName,
  loading,
  objectFit,
}: IconImageProps) => {
  return (
    <div className={clsx(styles.iconImage, className)}>
      <Image
        src={iconLink}
        alt={alt}
        fill
        className={imageClassName}
        loading={loading}
        objectFit={objectFit}
      />
    </div>
  )
}

export default IconImage
