"use client"

import React, { useState } from "react"

import { IFavouriteView } from "@/types/Favourites"

import styles from "./favouritesWrapper.module.scss"

import Comparison from "../comparison"
import FavouritesActions from "../favouritesActions"
import RequestsWrapper from "../favouritesActions/requestsWrapper"
import FavouritesList from "../favouritesList"

import Heading1 from "@/components/ui/heading1"

const FavouritesWrapper = () => {
  const [isComparison, setIsComparison] = useState(false)
  const [selectedView, setSelectedView] = useState<IFavouriteView>("layouts")

  return (
    <>
      <Heading1 className={styles.title}>
        {isComparison ? "Сравнение" : "Избранное"}
      </Heading1>

      <div className={styles.favouritesWrapper}>
        <FavouritesActions
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />

        {isComparison ? (
          <Comparison
            selectedView={selectedView}
            setIsComparison={setIsComparison}
          />
        ) : (
          <FavouritesList
            selectedView={selectedView}
            setIsComparison={setIsComparison}
          />
        )}

        <RequestsWrapper isHiddenDesktop />
      </div>
    </>
  )
}

export default FavouritesWrapper
