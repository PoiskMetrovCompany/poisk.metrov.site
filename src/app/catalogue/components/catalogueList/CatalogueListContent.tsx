import React, { useEffect } from "react"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"
import { useFilters } from "@/contexts/FiltersContext"
import { useStickyState } from "@/hooks/useStickyState"
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
  const { selectedPropertyType, setSelectedPropertyType } = useFilters()
  const { isLaptop } = useCatalogueSorting()

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

  return (
    <div className={styles.catalogue}>
      <CatalogueHeader
        selectedPropertyType={selectedPropertyType}
        setSelectedPropertyType={setSelectedPropertyType}
      />

      <CatalogueFiltersSection
        isSticky={isSticky}
        isVisible={isVisible}
        elementRef={elementRef}
        onShowFilters={handleShowFilters}
        onApplyFilters={handleApplyFiltersWithClose}
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

      <CatalogueResultsHeader
        filtersData={filtersData}
        selectedPropertyType={selectedPropertyType}
        selectedSorting={selectedSorting}
        isLaptop={isLaptop}
        onSortingChange={handleSorting}
      />

      <CatalogueCardsContainer
        selectedSorting={selectedSorting}
        selectedPropertyType={selectedPropertyType}
      >
        {isLoadingFilters
          ? renderSkeletons(selectedSorting)
          : renderCards(filtersData, selectedPropertyType, selectedSorting)}
      </CatalogueCardsContainer>

      <CataloguePagination
        isLoadingFilters={isLoadingFilters}
        filtersData={filtersData}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <CatalogueCardsContainer
        selectedSorting={selectedSorting}
        selectedPropertyType={selectedPropertyType}
      >
        {renderAdditionalComponents(selectedSorting)}
      </CatalogueCardsContainer>
    </div>
  )
}
