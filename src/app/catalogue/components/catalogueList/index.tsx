"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import clsx from "clsx"

import { FiltersRequest } from "@/types/api/filters"

import { CatalogueListContent } from "./CatalogueListContent"

import Download from "@/app/components/download"
import Selection from "@/components/apartmentSelection"
import FlatLayoutCard from "@/components/flatLayoutCard"
import GetYourDreamFlat from "@/components/getYourDreamFlat"
import NotFound from "@/components/notFound"
import Pagination from "@/components/pagination"
import PropertyCard from "@/components/propertyCard"
import PropertyCardSkeleton from "@/components/propertyCard/PropertyCardSkeleton"
import PropertyCardList from "@/components/propertyCardList"
import PropertyCardListSkeleton from "@/components/propertyCardList/PropertyCardListSkeleton"
import { useStickyState } from "@/hooks/useStickyState"
import { IProperty } from "@/types/PropertyCard"
import { ApartmentSelectionResponse } from "@/types/api/apartment"
import { IApartment } from "@/types/api/complex"
import {
  IResidentialComplex,
  ResidentialComplexDataResponse,
} from "@/types/api/complex"
import { useApiQuery } from "@/utils/hooks/use-api"
import { useScreenSize } from "@/utils/hooks/use-screen-size"
import { mapResidentialComplexesToProperties } from "@/utils/mappers/propertyMapper"

import styles from "./catalogueList.module.scss"

import CatalogueFilters from "../catalogueFiltersNavbar"
import FiltersDialog from "../filters"

import IconImage from "@/components/ui/IconImage"
import Heading2 from "@/components/ui/heading2"
import Heading3 from "@/components/ui/heading3"
import PropertyTypeSelect from "@/components/ui/inputs/select/PropertyTypeSelect"

type SortType = "cards" | "list"
const CITY = "novosibirsk"
const PER_PAGE = "4"

const CatalogueList = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FiltersRequest | null>(null)
  const [selectedSorting, setSelectedSorting] = useState<SortType>("cards")
  const [selectedPropertyType, setSelectedPropertyType] = useState("Жилой комплекс")
  const [currentPage, setCurrentPage] = useState(1)
  const { isLaptop } = useScreenSize(0)
  const { isSticky, isVisible, elementRef } = useStickyState()

  const handleSorting = (sort: SortType) => {
    setSelectedSorting(sort)
  }

  const handleShowFilters = () => {
    setShowFilters(true)
  }

  const applyFilters = () => {
    console.log("Фильтры применены")
    setShowFilters(false)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (!isLaptop) setSelectedSorting("cards")
  }, [isLaptop])

  // Always define URLs regardless of selectedPropertyType
  const RESIDENTIAL_COMPLEX_API_URL = useMemo(
    () =>
      `http://localhost:1080/api/v1/residential-complex/?city=${CITY}&page=${currentPage}&per_page=${PER_PAGE}`,
    [currentPage]
  )

  const APARTMENTS_API_URL = useMemo(
    () =>
      `http://localhost:1080/api/v1/apartments/selections?city_code=${CITY}`,
    []
  )

  // Always call hooks, but control execution with enabled
  const {
    data: catalogueResidentialComplexes,
    isLoading: isLoadingComplexes,
    error: errorComplexes,
  } = useApiQuery<ResidentialComplexDataResponse>(
    ["residential-complex", CITY, currentPage.toString(), PER_PAGE],
    RESIDENTIAL_COMPLEX_API_URL,
    {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      enabled: selectedPropertyType === "Жилой комплекс",
    }
  )

  const {
    data: catalogueApartments,
    isLoading: isLoadingApartments,
    error: errorApartments,
  } = useApiQuery<ApartmentSelectionResponse>(
    ["apartments-selections", CITY, selectedPropertyType],
    APARTMENTS_API_URL,
    {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      enabled: selectedPropertyType === "Квартира",
    }
  )

  const isLoading =
    selectedPropertyType === "Жилой комплекс"
      ? isLoadingComplexes
      : isLoadingApartments

  // Check if data is empty to show NotFound component
  const isEmpty = useMemo(() => {
    if (isLoading) return false
    
    if (selectedPropertyType === "Жилой комплекс") {
      const complexes = Array.isArray(catalogueResidentialComplexes)
        ? catalogueResidentialComplexes
        : catalogueResidentialComplexes?.attributes || []
      return complexes.length === 0
    } else if (selectedPropertyType === "Квартира") {
      const apartments = Array.isArray(catalogueApartments)
        ? catalogueApartments
        : catalogueApartments?.attributes || []
      return apartments.length === 0
    }
    
    return false
  }, [isLoading, selectedPropertyType, catalogueResidentialComplexes, catalogueApartments])

  const renderSkeletons = useCallback((): React.ReactNode[] => {
    const result: React.ReactNode[] = []
    const skeletonCount = 4

    for (let i = 0; i < skeletonCount; i++) {
      if (selectedSorting === "cards") {
        result.push(<PropertyCardSkeleton key={`skeleton-${i}`} />)
      } else {
        result.push(<PropertyCardListSkeleton key={`skeleton-${i}`} />)
      }
    }

    return result
  }, [selectedSorting])

  const renderCards = useCallback((): React.ReactNode[] => {
    const result: React.ReactNode[] = []

    if (selectedPropertyType === "Жилой комплекс") {
      const complexes = Array.isArray(catalogueResidentialComplexes)
        ? catalogueResidentialComplexes
        : catalogueResidentialComplexes?.attributes || []

      const properties = mapResidentialComplexesToProperties(
        complexes as IResidentialComplex[]
      )

      properties.forEach((property, index) => {
        if (selectedSorting === "cards") {
          result.push(<PropertyCard key={property.id} property={property} />)
        } else {
          result.push(
            <PropertyCardList key={property.id} property={property} />
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
      })
    } else if (selectedPropertyType === "Квартира") {
      const apartments = Array.isArray(catalogueApartments)
        ? catalogueApartments
        : catalogueApartments?.attributes || []

      ;(apartments as IApartment[]).forEach((apartment, index) => {
        if (selectedSorting === "cards") {
          result.push(
            <FlatLayoutCard key={apartment.id} apartment={apartment} />
          )
        } else {
          result.push(
            <FlatLayoutCard key={apartment.id} apartment={apartment} />
          )
        }
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
      })
    }

    return result
  }, [
    selectedPropertyType,
    selectedSorting,
    catalogueResidentialComplexes,
    catalogueApartments,
  ])

  const renderAdditionalComponents = useCallback((): React.ReactNode[] => {
    const result: React.ReactNode[] = []

    result.push(
      <div
        key="get-catalogue"
        className={clsx(
          selectedSorting === "cards"
            ? styles.catalogue__cards__fullWidth
            : undefined,
          styles.mt_getCatalogue
        )}
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
  }, [selectedSorting])

  if (isEmpty) {
    return (
      <NotFound
        title="Подходящих вариантов нет"
        description="Измените фильтры или подпишитесь на поиск — так вы не пропустите подходящие предложения"
        buttonText="Сохранить поиск"
      />
    )
  }

  return (
    <CatalogueListContent
      showFilters={showFilters}
      setShowFilters={setShowFilters}
      activeFilters={activeFilters}
      setActiveFilters={setActiveFilters}
      selectedSorting={selectedSorting}
      selectedPropertyType={selectedPropertyType}
      currentPage={currentPage}
      isLoading={isLoading}
      onSortingChange={handleSorting}
      onShowFilters={handleShowFilters}
      onPageChange={handlePageChange}
      onApplyFilters={applyFilters}
      renderSkeletons={renderSkeletons}
      renderCards={renderCards}
      renderAdditionalComponents={renderAdditionalComponents}
      elementRef={elementRef}
      isSticky={isSticky}
      isVisible={isVisible}
      isLaptop={isLaptop}
    />
  )
}

export default CatalogueList