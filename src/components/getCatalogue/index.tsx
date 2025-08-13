import React, { FC } from "react"
import styles from "./getCatalogue.module.scss"
import GetCatalogueForm from "./getCatalogueForm"
import GetCatalogueImage from "./getCatalogueImage"

const GetCatalogue: FC = () => {
  return (
    <div className={styles.getCatalogue}>
      <GetCatalogueForm />
      <GetCatalogueImage />
    </div>
  )
}

export default GetCatalogue
export { GetCatalogueForm, GetCatalogueImage }