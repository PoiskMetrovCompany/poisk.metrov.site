import React, { useCallback, useEffect, useMemo } from "react"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"
import { useInitialFiltersFromUrl } from "@/hooks/useInitialFiltersFromUrl"
import { useUrlChangeListener } from "@/hooks/useUrlChangeListener"
import { useUrlSync } from "@/hooks/useUrlSync"
import { useFiltersStore } from "@/stores/useFiltersStore"
import { FiltersRequest } from "@/types/api/filters"

import styles from "./catalogueList.module.scss"

import FiltersDialog from "../filters"
import {
  CatalogueCardsContainer,
  CatalogueFiltersSection,
  CatalogueHeader,
  CatalogueNotFound,
  CataloguePagination,
  CatalogueResultsHeader,
} from "./components"
import {
  useCatalogueAdditionalComponents,
  useCatalogueCards,
  useCatalogueData,
  useCatalogueSkeletons,
} from "./hooks"

interface CatalogueListContentProps {
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  activeFilters: FiltersRequest | null
  setActiveFilters: (filters: FiltersRequest | null) => void
  selectedSorting: "cards" | "list"
  setSelectedSorting: (sorting: "cards" | "list") => void
  currentPage: number
  elementRef: React.RefObject<HTMLDivElement>
  isSticky: boolean
  isVisible: boolean
  isLaptop: boolean
}

export const CatalogueListContent: React.FC<CatalogueListContentProps> = ({
  showFilters,
  setShowFilters,
  activeFilters,
  setActiveFilters,
  selectedSorting,
  setSelectedSorting,
  currentPage,
  elementRef,
  isSticky,
  isVisible,
  isLaptop,
}) => {
  const { filtersData: storeFiltersData } = useFiltersStore()

  // Синхронизация с URL
  useUrlSync()
  useUrlChangeListener()
  useInitialFiltersFromUrl()

  const {
    filtersData,
    isLoadingFilters,
    handleApplyFilters,
    handlePageChange,
  } = useCatalogueData(activeFilters, setActiveFilters)

  const { renderSkeletons } = useCatalogueSkeletons()
  const { renderCards } = useCatalogueCards()
  const { renderAdditionalComponents } = useCatalogueAdditionalComponents()

  // Мемоизируем функцию для переключения сортировки
  const handleSortingCallback = useCallback(
    (sorting: "cards" | "list") => {
      setSelectedSorting(sorting)
    },
    [setSelectedSorting]
  )

  // Автоматически переключаемся на карточки на мобильных устройствах
  useEffect(() => {
    if (!isLaptop) {
      handleSortingCallback("cards")
    }
  }, [isLaptop, handleSortingCallback])

  const handleShowFilters = () => {
    setShowFilters(true)
  }

  const handleApplyFiltersWithClose = (formData: FiltersFormData) => {
    handleApplyFilters(formData)
    setShowFilters(false)
  }

  // Мемоизируем условие для показа блоков
  const shouldShowBlocks = useMemo(() => {
    return !(
      !isLoadingFilters &&
      (!filtersData?.data || filtersData.data.length === 0)
    )
  }, [isLoadingFilters, filtersData?.data])

  return (
    <div className={styles.catalogue}>
      <CatalogueHeader
        selectedPropertyType={storeFiltersData.propertyType}
        setSelectedPropertyType={(type) => {
          // Обновляем propertyType в фильтрах
          const { setFiltersData } = useFiltersStore.getState()
          setFiltersData({
            ...storeFiltersData,
            propertyType: type,
          })
        }}
      />

      <CatalogueFiltersSection
        isSticky={isSticky}
        isVisible={isVisible}
        elementRef={elementRef}
        onShowFilters={handleShowFilters}
        onApplyFilters={handleApplyFiltersWithClose}
        isLoadingFilters={isLoadingFilters}
      />

      <FiltersDialog
        open={showFilters}
        onOpenChange={setShowFilters}
        onApplyFilters={handleApplyFiltersWithClose}
      />

      <CatalogueNotFound
        isLoadingFilters={isLoadingFilters}
        filtersData={filtersData}
      />

      {/* Показываем блоки только если нет ошибки "не найдено" */}
      {shouldShowBlocks && (
        <>
          <CatalogueResultsHeader
            filtersData={filtersData}
            selectedPropertyType={storeFiltersData.propertyType}
            selectedSorting={selectedSorting}
            isLaptop={isLaptop}
            onSortingChange={handleSortingCallback}
          />

          <CatalogueCardsContainer
            selectedSorting={selectedSorting}
            selectedPropertyType={storeFiltersData.propertyType}
          >
            {isLoadingFilters
              ? renderSkeletons(selectedSorting)
              : renderCards(filtersData, selectedSorting)}
          </CatalogueCardsContainer>

          <CataloguePagination
            isLoadingFilters={isLoadingFilters}
            filtersData={filtersData}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

          <CatalogueCardsContainer
            selectedSorting={selectedSorting}
            selectedPropertyType={storeFiltersData.propertyType}
          >
            {renderAdditionalComponents(selectedSorting)}
          </CatalogueCardsContainer>
        </>
      )}
    </div>
  )
}
