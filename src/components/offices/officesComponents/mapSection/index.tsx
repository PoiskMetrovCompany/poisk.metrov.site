import React from "react"

import styles from "./mapSection.module.scss"

import LeftMapSection from "./mapSectionComponents/leftSide"
import RightMapSection from "./mapSectionComponents/rightSide"

const MapSection = () => {
  return (
    <div className={styles.Offices__mapSection}>
      <div className={styles.Offices__mapSection__container}>
        <div className={styles.Offices__mapSection__container__leftSide}>
          <LeftMapSection />
        </div>
        <RightMapSection />
      </div>
    </div>
  )
}

export default MapSection
