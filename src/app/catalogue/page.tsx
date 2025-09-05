import React from "react"

import styles from "./catalogue.module.scss"

import CatalogueList from "./components/catalogueList"

const Catalogue = () => {
  return (
    <div className={styles.catalogue}>
      <CatalogueList />
      {/* <FiltersDebugPanel /> */}
    </div>
  )
}

export default Catalogue
