import React from "react"

import styles from "./documents.module.scss"

import Skeleton from "@/components/ui/skeleton"

const DocumentsSkeleton = () => {
  return (
    <div className={styles.documents}>
      <div className={styles.documents__header}>
        <Skeleton height="40px" width="400px" border="8px" />
      </div>
      <div className={styles.documents__content}>
        {/* Скелетон для 6 документов */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.documents__content__item}>
            <Skeleton
              height="64px"
              width="64px"
              border="8px"
              className={styles.documents__content__item__icon}
            />
            <Skeleton
              height="24px"
              width="300px"
              border="4px"
              className={styles.documents__content__item__text}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentsSkeleton
