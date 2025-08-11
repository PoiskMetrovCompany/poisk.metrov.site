import React from "react"
import { IFavouriteView } from "@/types/Favourites"
import styles from "./favouritesActions.module.scss"

interface IFavouritesActionsProps {
  selectedView: IFavouriteView
  setSelectedView: (view: IFavouriteView) => void
}

const FavouritesActions = ({
  selectedView,
  setSelectedView,
}: IFavouritesActionsProps) => {
  return <div className={styles.favouritesActions}>FavouritesActions</div>
}

export default FavouritesActions
