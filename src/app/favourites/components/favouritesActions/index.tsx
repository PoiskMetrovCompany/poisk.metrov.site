"use client"

import React from "react"
import { IFavouriteView } from "@/types/Favourites"
import styles from "./favouritesActions.module.scss"
import TypeSwitcher from "./typeSwitcher"
import SelectLayout from "./selectLayout"
import Request from "./request"

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
      <SelectLayout />
      <Request
        title="Оставьте заявку и наш брокер поможет вам с выбором"
        buttonText="Оставить заявку"
      />
      <Request
        title="Скачайте свой каталог с избранным"
        description="Каталог с вашим избранным доступен для скачивания с формате pdf после регистрации"
        buttonText="Скачать"
      />
    </div>
  )
}

export default FavouritesActions
