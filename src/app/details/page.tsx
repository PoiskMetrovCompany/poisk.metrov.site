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
  const yandexApiUrl = `https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&lang=ru_RU`

  return (
    <div className={styles.details}>
      <DetailsHeader />
      <Estate />
      <FlatList />
      <AboutObject />
      {/* <AboutComplex /> */}
      {/* <MapProvider apiUrl={yandexApiUrl}>
        <Location />
      </MapProvider> */}
      {/* <AboutObjectSmall /> */}
      {/* <ConstructionProgress /> */}
      {/* <Documents /> */}
    </div>
  )
}

export default DetailsPage
