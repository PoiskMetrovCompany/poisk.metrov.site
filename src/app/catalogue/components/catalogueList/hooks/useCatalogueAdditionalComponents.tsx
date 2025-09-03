import React, { useCallback } from "react"

import Download from "@/app/components/download"
import Selection from "@/components/apartmentSelection"

import styles from "../catalogueList.module.scss"

type SortType = "cards" | "list"

export const useCatalogueAdditionalComponents = () => {
  const renderAdditionalComponents = useCallback(
    (selectedSorting: SortType): React.ReactNode[] => {
      const result: React.ReactNode[] = []

      result.push(
        <div
          key="get-catalogue"
          className={
            selectedSorting === "cards"
              ? `${styles.catalogue__cards__fullWidth} ${styles.mt_getCatalogue}`
              : styles.mt_getCatalogue
          }
        >
          <Download />
        </div>
      )

      result.push(
        <div
          key="selection"
          className={
            selectedSorting === "cards"
              ? styles.catalogue__cards__fullWidth
              : undefined
          }
        >
          <Selection />
        </div>
      )

      return result
    },
    []
  )

  return {
    renderAdditionalComponents,
  }
}
