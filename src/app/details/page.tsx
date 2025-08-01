import React from "react"
import styles from "./details.module.scss"
import DetailsHeader from "./components/header"
import Estate from "./components/estate"

const DetailsPage = () => {
  return (
    <div className={styles.details}>
      <div className={styles.details__container}>
        <DetailsHeader />
        <Estate />
      </div>
    </div>
  )
}

export default DetailsPage
