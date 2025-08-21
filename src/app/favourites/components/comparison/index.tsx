import React from "react"
import styles from "./comparison.module.scss"
import Heading2 from "@/components/ui/heading2"
import PropertyCardComparison from "@/components/PropertyCardComparison"

const Comparison = () => {
  return (
    <div className={styles.comparison}>
      <div className={styles.comparison__header}>
        <Heading2>Сравнение</Heading2>
      </div>
      <div className={styles.comparison__content}>
        <PropertyCardComparison />
      </div>
    </div>
  )
}

export default Comparison
