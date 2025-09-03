import React from "react"

import styles from "./aboutComplex.module.scss"

import Skeleton from "@/components/ui/skeleton"

const AboutComplexSkeleton = () => {
  return (
    <div className={styles.aboutComplex}>
      <div className={styles.aboutComplex__header}>
        <Skeleton height="40px" width="200px" border="8px" />
      </div>
      <div className={styles.aboutComplex__content}>
        <div className={styles.aboutComplex__content__text}>
          <Skeleton height="27px" width="100%" border="4px" />
          <div style={{ marginTop: "8px" }}>
            <Skeleton height="27px" width="90%" border="4px" />
          </div>
          <div style={{ marginTop: "8px" }}>
            <Skeleton height="27px" width="75%" border="4px" />
          </div>
        </div>

        <Skeleton height="27px" width="120px" border="4px" />
      </div>
    </div>
  )
}

export default AboutComplexSkeleton
