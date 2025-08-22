"use client"

import React, { useState } from "react"
import styles from "./favouritesWrapper.module.scss"
import FavouritesList from "../favouritesList"
import FavouritesActions from "../favouritesActions"
import { IFavouriteView } from "@/types/Favourites"
import RequestsWrapper from "../favouritesActions/requestsWrapper"
import Comparison from "../comparison"

const FavouritesWrapper = () => {
  const [isComparison, setIsComparison] = useState(false)
  const [selectedView, setSelectedView] = useState<IFavouriteView>("layouts")
  return (
    <div className={styles.favouritesWrapper}>
      <FavouritesActions
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />

      {isComparison ? (
        <Comparison selectedView={selectedView} />
      ) : (
        <FavouritesList
          selectedView={selectedView}
          setIsComparison={setIsComparison}
        />
      )}

      <RequestsWrapper isHiddenDesktop />
    </div>
  )
}

export default FavouritesWrapper
