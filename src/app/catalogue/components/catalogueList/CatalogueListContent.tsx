import React, { useEffect, useMemo } from "react"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"
import { useInitialFiltersFromUrl } from "@/hooks/useInitialFiltersFromUrl"
import { useStickyState } from "@/hooks/useStickyState"
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
  useCatalogueSorting,
} from "./hooks"

interface CatalogueListContentProps {
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  activeFilters: FiltersRequest | null
  setActiveFilters: (filters: FiltersRequest | null) => void
}

export const CatalogueListContent: React.FC<CatalogueListContentProps> = ({
  showFilters,
  setShowFilters,
  activeFilters,
  setActiveFilters,
}) => {
  const { isSticky, isVisible, elementRef } = useStickyState()
  const { filtersData: storeFiltersData } = useFiltersStore()
  const { isLaptop } = useCatalogueSorting()

  // Синхронизация с URL
  useUrlSync()
  useUrlChangeListener()
  useInitialFiltersFromUrl()

  const {
    selectedSorting,
    currentPage,
    filtersData,
    isLoadingFilters,
    handleSorting,
    handleApplyFilters,
    handlePageChange,
  } = useCatalogueData(activeFilters, setActiveFilters)

  const { renderSkeletons } = useCatalogueSkeletons()
  const { renderCards } = useCatalogueCards()
  const { renderAdditionalComponents } = useCatalogueAdditionalComponents()

  // Автоматически переключаемся на карточки на мобильных устройствах
  useEffect(() => {
    if (!isLaptop) {
      handleSorting("cards")
    }
  }, [isLaptop, handleSorting])

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
            onSortingChange={handleSorting}
          />

          <CatalogueCardsContainer
            selectedSorting={selectedSorting}
            selectedPropertyType={storeFiltersData.propertyType}
          >
            {isLoadingFilters
              ? renderSkeletons(selectedSorting)
              : renderCards(
                  filtersData,
                  storeFiltersData.propertyType,
                  selectedSorting
                )}
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
