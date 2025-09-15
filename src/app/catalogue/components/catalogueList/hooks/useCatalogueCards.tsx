import React, { useCallback } from "react"

import GetYourDreamFlat from "@/components/getYourDreamFlat"
import PropertyCard from "@/components/propertyCard"
import PropertyCardList from "@/components/propertyCardList"
import { IProperty } from "@/types/PropertyCard"
import {
  ApartmentItem,
  ComplexItem,
  FiltersResponse,
  isApartmentResponse,
  isComplexResponse,
} from "@/types/api/filters"

import styles from "../catalogueList.module.scss"

import { createApartmentProperty, createComplexProperty } from "../mappers"

type SortType = "cards" | "list"

export const useCatalogueCards = () => {
  // Мемоизируем рендер карточки комплекса
  const renderComplexCard = useCallback(
    (property: IProperty, selectedSorting: SortType) => {
      return selectedSorting === "cards" ? (
        <PropertyCard key={property.id} property={property} />
      ) : (
        <PropertyCardList key={property.id} property={property} />
      )
    },
    []
  )

  // Мемоизируем рендер карточки квартиры
  const renderApartmentCard = useCallback(
    (property: IProperty, selectedSorting: SortType) => {
      return selectedSorting === "cards" ? (
        <PropertyCard key={property.id} property={property} />
      ) : (
        <PropertyCardList key={property.id} property={property} />
      )
    },
    []
  )

  // Мемоизируем рендер блока GetYourDreamFlat
  const renderDreamFlatBlock = useCallback(
    (selectedSorting: SortType, index: number) => {
      return (
        <div
          key={`dream-flat-${index}`}
          className={
            selectedSorting === "cards"
              ? styles.catalogue__cards__fullWidth
              : undefined
          }
        >
          <GetYourDreamFlat />
        </div>
      )
    },
    []
  )

  const renderComplexCards = useCallback(
    (data: ComplexItem[], selectedSorting: SortType): React.ReactNode[] => {
      return data
        .map((item: ComplexItem, index: number) => {
          const property = createComplexProperty(item, index)
          const result: React.ReactNode[] = [
            renderComplexCard(property, selectedSorting),
          ]

          if (index === 1) {
            result.push(renderDreamFlatBlock(selectedSorting, index))
          }

          return result
        })
        .flat()
    },
    [renderComplexCard, renderDreamFlatBlock]
  )

  const renderApartmentCards = useCallback(
    (data: ApartmentItem[], selectedSorting: SortType): React.ReactNode[] => {
      return data
        .map((item: ApartmentItem, index: number) => {
          const property = createApartmentProperty(item, index)
          const result: React.ReactNode[] = [
            renderApartmentCard(property, selectedSorting),
          ]

          if (index === 3) {
            result.push(renderDreamFlatBlock(selectedSorting, index))
          }

          return result
        })
        .flat()
    },
    [renderApartmentCard, renderDreamFlatBlock]
  )

  const renderCards = useCallback(
    (
      filtersData: FiltersResponse | null | undefined,
      selectedSorting: SortType
    ): React.ReactNode[] => {
      if (!filtersData?.data) {
        return []
      }

      // Используем type guards для определения типа данных
      if (isComplexResponse(filtersData)) {
        return renderComplexCards(filtersData.data, selectedSorting)
      } else if (isApartmentResponse(filtersData)) {
        return renderApartmentCards(filtersData.data, selectedSorting)
      }

      return []
    },
    [renderComplexCards, renderApartmentCards]
  )

  return {
    renderCards,
  }
}
