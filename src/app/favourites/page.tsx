import React from "react"

import FavouritesWrapper from "./components/favouritesWrapper"
import styles from "./favourites.module.scss"

const FavouritesPage = () => {
  return (
    <div className={styles.favourites}>
      <FavouritesWrapper />
    </div>
  )
}

export default FavouritesPage
