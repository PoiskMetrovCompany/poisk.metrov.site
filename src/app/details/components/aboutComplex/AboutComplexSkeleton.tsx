"use client"

import React from "react"

import styles from "./aboutComplex.module.scss"

import Skeleton from "@/components/ui/skeleton"

const AboutComplexSkeleton = () => {
  return (
    <div className={styles.aboutComplex}>
      <div className={styles.aboutComplex__header}>
        <Skeleton height="48px" border="8px" />
      </div>
      <div className={styles.aboutComplex__content}>
        <p className={styles.aboutComplex__content__text}>
          <Skeleton height="24px" width="100%" border="4px" />
        </p>

        <div className={styles.aboutComplex__content__link}>
          <Skeleton height="40px" width="100%" border="4px" />
        </div>
      </div>
    </div>
  )
}

export default AboutComplexSkeleton
