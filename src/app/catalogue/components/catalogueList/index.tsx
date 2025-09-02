"use client"

import clsx from "clsx"

import React, { useCallback, useEffect, useMemo, useState } from "react"

import Download from "@/app/components/download"
import Selection from "@/components/apartmentSelection"

import FlatLayoutCard from "@/components/flatLayoutCard"

import GetCatalogue from "@/components/getCatalogue"


import Download from "@/app/components/download"




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
import { ResidentialComplexDataResponse } from "@/types/api/complex"
import { useApiQuery } from "@/utils/hooks/use-api"
import { useScreenSize } from "@/utils/hooks/use-screen-size"
import { mapResidentialComplexesToProperties } from "@/utils/mappers/propertyMapper"

import styles from "./catalogueList.module.scss"

import CatalogueFilters from "../catalogueFiltersNavbar"
import FiltersDialog from "../filters"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import Heading2 from "@/components/ui/heading2"
import Heading3 from "@/components/ui/heading3"
import PropertyTypeSelect from "@/components/ui/inputs/select/PropertyTypeSelect"
import RangeSlider from "@/components/ui/rangeSlider"

type SortType = "cards" | "list"
const CITY = "novosibirsk"
const PER_PAGE = "4"

const CatalogueList = () => {
  const [isEmpty, setIsEmpty] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSorting, setSelectedSorting] = useState<SortType>("cards")
  const [selectedPropertyType, setSelectedPropertyType] =
    useState("Жилой комплекс")
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

  if (isEmpty) {
    return (
      <NotFound
        title="Подходящих вариантов нет"
        description="Измените фильтры или подпишитесь на поиск — так вы не пропустите подходящие предложения"
        buttonText="Сохранить поиск"
      />
    )
  }

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
  const error =
    selectedPropertyType === "Жилой комплекс" ? errorComplexes : errorApartments

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

      const properties = mapResidentialComplexesToProperties(complexes)

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

      apartments.forEach((apartment, index) => {
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

  return (
    <div className={styles.catalogue}>
      <div className={styles.catalogue__choose}>
        <div className={styles.catalogue__choose__livingSet}>
          <Heading2>
            Подобрать{" "}
            <PropertyTypeSelect
              defaultValue={selectedPropertyType}
              onValueChange={setSelectedPropertyType}
              placeholder="Выберите тип недвижимости"
              className="inlineSelect"
            />
          </Heading2>
        </div>

        <div className={styles.catalogue__choose__favorite}>
          <IconImage
            iconLink="/images/icons/heartOrange.svg"
            alt="Сохранить поиск"
            className={styles.catalogue__choose__favorite__icon}
          />
          Сохранить поиск
        </div>
      </div>

      <div
        ref={elementRef}
        className={clsx(
          styles.catalogue__filtersNavbar,
          isSticky && styles.catalogue__filtersNavbar_sticky,
          !isVisible && styles.catalogue__filtersNavbar_hidden
        )}
      >
        <CatalogueFilters
          isSticky={isSticky}
          onShowFilters={handleShowFilters}
          onApplyFilters={applyFilters}
        />
        {/* <div className={styles.catalogue__filtersNavbar__buttonsMobile}>
          <ActionButton
            type="primary"
            onClick={applyFilters}
            className={styles.catalogue__filtersNavbar__buttonsMobile__button}
            size="medium"
          >
            Показать <span>12166 квартир</span>
          </ActionButton>
          <ActionButton
            type="secondary"
            onClick={handleShowFilters}
            className={
              styles.catalogue__filtersNavbar__buttonsMobile__button__filter
            }
            size="medium"
            svgSrc="/images/icons/filters-orange.svg"
            svgAlt="Показать фильтры"
            svgWidth={26}
            svgHeight={26}
            svgClassName={styles.filterSvg}
          >
            <span className={styles.textFiltersMobile}>Все фильтры</span>
          </ActionButton>
        </div> */}
      </div>

      <FiltersDialog open={showFilters} onOpenChange={setShowFilters} />

      <div className={styles.catalogue__header}>
        <Heading3>Найдено 102 ЖК из 182</Heading3>
        {isLaptop && (
          <div className={styles.catalogue__header__buttons}>
            <button
              className={clsx(
                styles.catalogue__header__buttons__button,
                selectedSorting === "cards" &&
                  styles.catalogue__header__buttons__button_active
              )}
              onClick={() => handleSorting("cards")}
            >
              <IconImage
                iconLink={
                  selectedSorting === "cards"
                    ? "/images/icons/sort-cards-colored.svg"
                    : "/images/icons/sort-cards.svg"
                }
                alt="cards"
                className={styles.catalogue__header__buttons__button__icon}
              />
              <span>Карточки</span>
            </button>
            <button
              className={clsx(
                styles.catalogue__header__buttons__button,
                selectedSorting === "list" &&
                  styles.catalogue__header__buttons__button_active
              )}
              onClick={() => handleSorting("list")}
            >
              <IconImage
                iconLink={
                  selectedSorting === "list"
                    ? "/images/icons/sort-list-colored.svg"
                    : "/images/icons/sort-list.svg"
                }
                alt="list"
                className={styles.catalogue__header__buttons__button__icon}
              />
              <span>Список</span>
            </button>
          </div>
        )}
      </div>
      <div
        className={clsx(
          styles.catalogue__cards,
          selectedSorting === "cards" &&
            selectedPropertyType === "Жилой комплекс" &&
            styles.catalogue__cards_cards,
          selectedSorting === "cards" &&
            selectedPropertyType === "Квартира" &&
            styles.catalogue__cards_apartments,
          selectedSorting === "list" && styles.catalogue__cards_list
        )}
      >
        {isLoading ? renderSkeletons() : renderCards()}
      </div>

      {!isLoading && !isEmpty && (
        <Pagination
          totalPages={25}
          currentPage={currentPage}
          itemsPerPage={parseInt(PER_PAGE)}
          onPageChange={handlePageChange}
        />
      )}

      <div
        className={clsx(
          styles.catalogue__cards,
          selectedSorting === "cards" &&
            selectedPropertyType === "Жилой комплекс" &&
            styles.catalogue__cards_cards,
          selectedSorting === "cards" &&
            selectedPropertyType === "Квартира" &&
            styles.catalogue__cards_apartments,
          selectedSorting === "list" && styles.catalogue__cards_list
        )}
      >
        {renderAdditionalComponents()}
      </div>
    </div>
  )
}

export default CatalogueList
