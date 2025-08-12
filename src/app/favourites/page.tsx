import React from "react"
import styles from "./favourites.module.scss"
import H1 from "@/components/ui/heading1"
import FavouritesWrapper from "./components/favouritesWrapper"

const FavouritesPage = () => {
  return (
    <div className={styles.favourites}>
      <div className={styles.favourites__header}>
        <H1>Избранное</H1>
      </div>
      <FavouritesWrapper />
    </div>
  )
}

export default FavouritesPage
