"use client"

import React, { useState } from "react"
import { IFavouriteView } from "@/types/Favourites"
import styles from "./favouritesList.module.scss"
import NotFound from "@/components/notFound"

interface IFavouritesListProps {
  selectedView: IFavouriteView
}

const FavoutiresList = ({ selectedView }: IFavouritesListProps) => {
  const [isEmpty, setIsEmpty] = useState(true)

  if (isEmpty) {
    return (
      <NotFound
        title="У вас еще нет избранного"
        description="Чтобы добавить квартиры или ЖК в избранное, перейдите в каталог"
        buttonText="Перейти в каталог"
        className={styles.notFound}
      />
    )
  }

  return <div className={styles.favouritesList}>FavoutiresList</div>
}

export default FavoutiresList
