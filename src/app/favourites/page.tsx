"use client"

import React, { useState } from "react"

import styles from "./favourites.module.scss"

import FavouritesWrapper from "./components/favouritesWrapper"

const FavouritesPage = () => {
  const [showMap, setShowMap] = useState(false)

  return (
    <div
      className={`${styles.favourites} ${showMap ? styles.favourites_map : ""}`}
    >
      <FavouritesWrapper onMapChange={setShowMap} />
    </div>
  )
}

export default FavouritesPage
