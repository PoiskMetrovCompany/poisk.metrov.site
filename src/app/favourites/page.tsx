import React from "react"
import styles from "./favourites.module.scss"
import Heading1 from "@/components/ui/heading1"
import FavouritesWrapper from "./components/favouritesWrapper"

const FavouritesPage = () => {
  return (
    <div className={styles.favourites}>
      <Heading1 className={styles.favourites__title}>Избранное</Heading1>

      <FavouritesWrapper />
    </div>
  )
}

export default FavouritesPage
