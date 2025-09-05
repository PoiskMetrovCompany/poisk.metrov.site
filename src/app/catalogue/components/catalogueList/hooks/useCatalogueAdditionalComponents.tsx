import React, { useCallback, useMemo } from "react"

import Download from "@/app/components/download"
import Selection from "@/components/apartmentSelection"

import styles from "../catalogueList.module.scss"

type SortType = "cards" | "list"

export const useCatalogueAdditionalComponents = () => {
  // Мемоизируем классы для компонентов
  const downloadClasses = useMemo(
    () => `${styles.catalogue__cards__fullWidth} ${styles.mt_getCatalogue}`,
    []
  )

  const selectionClasses = useMemo(() => styles.catalogue__cards__fullWidth, [])

  // Мемоизируем создание компонента Download
  const createDownloadComponent = useCallback(
    (selectedSorting: SortType) => (
      <div
        key="get-catalogue"
        className={
          selectedSorting === "cards" ? downloadClasses : styles.mt_getCatalogue
        }
      >
        <Download />
      </div>
    ),
    [downloadClasses]
  )

  // Мемоизируем создание компонента Selection
  const createSelectionComponent = useCallback(
    (selectedSorting: SortType) => (
      <div
        key="selection"
        className={selectedSorting === "cards" ? selectionClasses : undefined}
      >
        <Selection />
      </div>
    ),
    [selectionClasses]
  )

  const renderAdditionalComponents = useCallback(
    (selectedSorting: SortType): React.ReactNode[] => {
      return [
        createDownloadComponent(selectedSorting),
        createSelectionComponent(selectedSorting),
      ]
    },
    [createDownloadComponent, createSelectionComponent]
  )

  return {
    renderAdditionalComponents,
  }
}
