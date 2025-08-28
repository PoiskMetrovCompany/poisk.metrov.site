import React, { FC } from "react"
import Image from "next/image"
import styles from "./rightSide.module.scss"
import clsx from "clsx"
interface GetCatalogueImageProps {
  className?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

const GetCatalogueImage: FC<GetCatalogueImageProps> = ({ 
  className,
  src = "/images/getCatalogue.webp",
  alt = "Картинка",
  width = 400,
  height = 300
}) => {
  return (
    <div className={clsx(styles.rightSide, className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  )
}

export default GetCatalogueImage