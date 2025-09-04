"use client"

import React from "react"
import { IFavouriteView } from "@/types/Favourites"
import styles from "./favouritesActions.module.scss"
import TypeSwitcher from "./typeSwitcher"
import RequestsWrapper from "./requestsWrapper"

interface IFavouritesActionsProps {
  selectedView: IFavouriteView
  setSelectedView: (view: IFavouriteView) => void
  flatCount: number
  complexCount: number
}

const FavouritesActions = ({
  selectedView,
  setSelectedView,
  flatCount,
  complexCount,
}: IFavouritesActionsProps) => {
  return (
    <div className={styles.favouritesActions}>
      <TypeSwitcher
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        flatCount={flatCount}
        complexCount={complexCount}
      />
      <RequestsWrapper isHiddenMobile={true} />
    </div>
  )
}

export default FavouritesActions
