"use client"

import React from "react"

import { IFavouriteView } from "@/types/Favourites"

import styles from "./favouritesActions.module.scss"

import RequestsWrapper from "./requestsWrapper"
import TypeSwitcher from "./typeSwitcher"

interface IFavouritesActionsProps {
  selectedView: IFavouriteView
  setSelectedView: (view: IFavouriteView) => void
  flatCount: number
  complexCount: number
  isComparison?: boolean
  comparisonFlatCount?: number
  comparisonComplexCount?: number
}

const FavouritesActions = ({
  selectedView,
  setSelectedView,
  flatCount,
  complexCount,
  isComparison = false,
  comparisonFlatCount = 0,
  comparisonComplexCount = 0,
}: IFavouritesActionsProps) => {
  return (
    <div className={styles.favouritesActions}>
      <TypeSwitcher
        selectedView={selectedView}
        setSelectedView={setSelectedView}
        flatCount={flatCount}
        complexCount={complexCount}
        isComparison={isComparison}
        comparisonFlatCount={comparisonFlatCount}
        comparisonComplexCount={comparisonComplexCount}
      />
      <RequestsWrapper isHiddenMobile={true} />
    </div>
  )
}

export default FavouritesActions
