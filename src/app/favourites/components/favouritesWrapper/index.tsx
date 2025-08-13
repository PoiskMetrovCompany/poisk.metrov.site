"use client"

import React, { useState } from "react"
import styles from "./favouritesWrapper.module.scss"
import FavouritesList from "../favouritesList"
import FavouritesActions from "../favouritesActions"
import { IFavouriteView } from "@/types/Favourites"

const FavouritesWrapper = () => {
  const [selectedView, setSelectedView] = useState<IFavouriteView>("layouts")
  return (
    <div className={styles.favouritesWrapper}>
      <FavouritesActions
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      <FavouritesList selectedView={selectedView} />
    </div>
  )
}

export default FavouritesWrapper
