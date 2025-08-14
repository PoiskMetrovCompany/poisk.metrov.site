"use client"

import React from "react"
import { IFavouriteView } from "@/types/Favourites"
import styles from "./favouritesActions.module.scss"
import TypeSwitcher from "./typeSwitcher"
import RequestsWrapper from "./requestsWrapper"

interface IFavouritesActionsProps {
  selectedView: IFavouriteView
  setSelectedView: (view: IFavouriteView) => void
}

const FavouritesActions = ({
  selectedView,
  setSelectedView,
}: IFavouritesActionsProps) => {
  return (
    <div className={styles.favouritesActions}>
      <TypeSwitcher
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      <RequestsWrapper />
    </div>
  )
}

export default FavouritesActions
