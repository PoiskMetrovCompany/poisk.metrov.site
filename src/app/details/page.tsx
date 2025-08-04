import React from "react"
import styles from "./details.module.scss"
import DetailsHeader from "./components/header"
import Estate from "./components/estate"
import FlatList from "./components/flatList"
import AboutObject from "./components/aboutObject"
import AboutComplex from "./components/aboutComplex"
import Location from "./components/location"
import ConstructionProgress from "./components/constructionProgress"

const DetailsPage = () => {
  return (
    <div className={styles.details}>
      <div className={styles.details__container}>
        <DetailsHeader />
        <Estate />
        <FlatList />
        <AboutObject />
        <AboutComplex />
        <Location />
        <ConstructionProgress />
      </div>
    </div>
  )
}

export default DetailsPage
