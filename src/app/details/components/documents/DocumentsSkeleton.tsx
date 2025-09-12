"use client"

import React from "react"

import styles from "./documents.module.scss"

import Skeleton from "@/components/ui/skeleton"

const DocumentsSkeleton = () => {
  return (
    <div className={styles.documents}>
      <div className={styles.documents__header}>
        <Skeleton height="48px" border="8px" />
      </div>
      <div className={styles.documents__content}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.documents__content__item}>
            <Skeleton
              width="32px"
              height="32px"
              border="4px"
              className={styles.documents__content__item__icon}
            />
            <div className={styles.documents__content__item__text}>
              <Skeleton height="20px" width="200px" border="4px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentsSkeleton
