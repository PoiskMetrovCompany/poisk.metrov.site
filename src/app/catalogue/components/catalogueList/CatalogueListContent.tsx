import React, { useCallback, useEffect, useMemo, useState } from "react"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"
import FlatLayoutCard from "@/components/flatLayoutCard"
import GetYourDreamFlat from "@/components/getYourDreamFlat"
import PropertyCard from "@/components/propertyCard"
import PropertyCardList from "@/components/propertyCardList"
import { useInitialFiltersFromUrl } from "@/hooks/useInitialFiltersFromUrl"
import { useUrlChangeListener } from "@/hooks/useUrlChangeListener"
import { useUrlSync } from "@/hooks/useUrlSync"
import { useFiltersStore } from "@/stores/useFiltersStore"
import { ApartmentSelectionResponse } from "@/types/api/apartment"
import {
  IResidentialComplex,
  ResidentialComplexDataResponse,
} from "@/types/api/complex"
import { FiltersRequest } from "@/types/api/filters"
import { mapResidentialComplexesToProperties } from "@/utils/mappers/propertyMapper"

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
  // Данные из API
  catalogueResidentialComplexes:
    | ResidentialComplexDataResponse
    | IResidentialComplex[]
    | null
    | undefined
  catalogueApartments: ApartmentSelectionResponse | null | undefined
  isLoadingComplexes: boolean
  isLoadingApartments: boolean
  selectedPropertyType: string
  onPageChange: (page: number) => void
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
  catalogueResidentialComplexes,
  catalogueApartments,
  isLoadingComplexes,
  isLoadingApartments,
  selectedPropertyType,
  onPageChange,
}) => {
  const { filtersData: storeFiltersData } = useFiltersStore()

  // Синхронизация с URL
  useUrlSync()
  useUrlChangeListener()
  useInitialFiltersFromUrl()

  // Определяем данные в зависимости от типа недвижимости
  const isLoadingFilters =
    selectedPropertyType === "Жилой комплекс"
      ? isLoadingComplexes
      : isLoadingApartments

  // Функция для применения фильтров
  const handleApplyFilters = (formData: FiltersFormData) => {
    // TODO: реализовать логику применения фильтров для переданных данных
    console.log("Применяем фильтры:", formData)
  }

  const { renderSkeletons } = useCatalogueSkeletons()
  const { renderCards } = useCatalogueCards()
  const { renderAdditionalComponents } = useCatalogueAdditionalComponents()

  // Преобразуем данные для отображения
  const getDisplayData = useCallback((): any[] => {
    if (selectedPropertyType === "Жилой комплекс") {
      if (!catalogueResidentialComplexes) return []

      const complexes = Array.isArray(catalogueResidentialComplexes)
        ? catalogueResidentialComplexes
        : catalogueResidentialComplexes?.attributes || []

      return mapResidentialComplexesToProperties(
        complexes as IResidentialComplex[]
      )
    } else if (selectedPropertyType === "Квартира") {
      if (!catalogueApartments) return []

      const apartments = Array.isArray(catalogueApartments)
        ? catalogueApartments
        : catalogueApartments?.attributes || []


      return apartments as any[]
    }

    return []
  }, [selectedPropertyType, catalogueResidentialComplexes, catalogueApartments])


  const renderCardsFromData = useCallback(
    (displayData: any[], sorting: "cards" | "list") => {
      if (!displayData || displayData.length === 0) return []

      const result: React.ReactNode[] = []

      displayData.forEach((item, index) => {

        if (selectedPropertyType === "Жилой комплекс") {
          if (sorting === "cards") {
            result.push(<PropertyCard key={item.id || index} property={item} />)
          } else {
            result.push(
              <PropertyCardList key={item.id || index} property={item} />
            )
          }


          if (index === 1) {
            result.push(
              <div
                key="dream-flat-in-cards"
                className={
                  selectedSorting === "cards"
                    ? styles.catalogue__cards__fullWidth
                    : undefined
                }
              >
                <GetYourDreamFlat />
              </div>
            )
          }
        } else {

          result.push(
            <FlatLayoutCard key={item.id || index} apartment={item} />
          )


          if (index === 3) {
            result.push(
              <div
                key="dream-flat-in-cards"
                className={
                  selectedSorting === "cards"
                    ? styles.catalogue__cards__fullWidth
                    : undefined
                }
              >
                <GetYourDreamFlat />
              </div>
            )
          }
        }
      })

      return result
    },
    [selectedPropertyType, selectedSorting]
  )

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
    const displayData = getDisplayData()
    return !(!isLoadingFilters && (!displayData || displayData.length === 0))
  }, [isLoadingFilters, getDisplayData])

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
        filtersData={{
          data: getDisplayData(),
          total: getDisplayData().length,
          page: currentPage,
          per_page: 10,
          success: true,
        }}
      />

      {shouldShowBlocks && (
        <>
          <CatalogueResultsHeader
            filtersData={{
              data: getDisplayData(),
              total: getDisplayData().length,
              page: currentPage,
              per_page: 10,
              success: true,
            }}
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
              : renderCardsFromData(getDisplayData(), selectedSorting)}
          </CatalogueCardsContainer>

          <CataloguePagination
            isLoadingFilters={isLoadingFilters}
            filtersData={{
              data: getDisplayData(),
              total: getDisplayData().length,
              page: currentPage,
              per_page: 10,
              success: true,
            }}
            currentPage={currentPage}
            onPageChange={onPageChange}
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
