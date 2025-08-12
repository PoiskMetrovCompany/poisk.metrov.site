import React from "react"
import styles from "./details.module.scss"
import DetailsHeader from "./components/header"
import Estate from "./components/estate"
import FlatList from "./components/flatList"
import AboutObject from "./components/aboutObject"
import AboutComplex from "./components/aboutComplex"
import Location from "./components/location"
import ConstructionProgress from "./components/constructionProgress"
import { MapProvider } from "@/providers/map-provider"
import AboutObjectSmall from "./components/aboutObjectSmall"
import Documents from "./components/documents"

const DetailsPage = () => {
  return (
    <div className={styles.details}>
      <DetailsHeader />
      <Estate />
      <FlatList />
      <AboutObject />
      <AboutComplex />
      <MapProvider>
        <Location />
      </MapProvider>
      {/* <AboutObjectSmall /> */}
      {/* <ConstructionProgress /> */}
      {/* <Documents /> */}
    </div>
  )
}

export default DetailsPage
