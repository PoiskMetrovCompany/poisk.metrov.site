"use client";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../header.module.scss";

interface ILogoProps {
  src?: string;
  alt?: string;
  href?: string;
}

const Logo: FC<ILogoProps> = ({
  src = "/images/logo.webp",
  alt = "Логотип компании Поиск Метров",
  href = "/"
}) => {
  return (
    <div className={styles.logo}>
      <Link href={href} className={styles.logo__link}>
        <Image
          src={src}
          alt={alt}
          width={56}
          height={56}
          className={styles.logo__image}
        />
      </Link>
    </div>
  );
};

export default Logo;