import React from "react"

import { MapProvider } from "@/providers/map-provider"

import styles from "./page.module.scss"

import FullMap from "./components/fullMap"

const MapPage = () => {
  return (
    <div className={styles.mapPage}>
      <MapProvider>
        <FullMap />
      </MapProvider>
    </div>
  )
}

export default MapPage
