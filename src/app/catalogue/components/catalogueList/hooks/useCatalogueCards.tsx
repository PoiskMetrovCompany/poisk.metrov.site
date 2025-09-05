import React, { useCallback, useMemo } from "react"

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

type SortType = "cards" | "list"

// Типы для данных из фильтров
interface FilterItem {
  id?: string | number
  key?: string
  name?: string
  code?: string
  address?: string
  latitude?: number
  longitude?: number
  parking?: string
  elevator?: string | null
  floors?: number | null
  primary_ceiling_height?: number | null
  metro_station?: string
  metro_time?: number
  created_at?: string
  updated_at?: string
  // Поля для квартир
  complex_id?: number | null
  complex_key?: string
  apartment_number?: string
  floor?: number
  room_count?: number
  price?: number
  area?: number
  living_space?: number
  ceiling_height?: number
  renovation?: string
  balcony?: string
  bathroom_unit?: string
  residential_complex?: unknown | null
  [key: string]: unknown
}

export const useCatalogueCards = () => {
  // Мемоизируем создание объекта property для комплексов
  const createComplexProperty = useCallback(
    (itemData: ComplexItem, index: number): IProperty => ({
      id: Number(itemData.id) || index,
      title: itemData.name || "Жилой комплекс",
      subtitle: itemData.code || "",
      price: "Цена не указана", // У комплексов нет поля price
      image: "/images/temporary/house.png",
      badge: {
        developer: "Застройщик",
        period: "2024",
      },
      metro: itemData.metro_station || "",
      driveTime: itemData.metro_time ? `${itemData.metro_time} мин` : "",
      metroType: "on_foot",
      specifications: [
        { type: "Студии", price: "от 5,6 млн ₽" },
        { type: "1-комн. кв", price: "от 7,1 млн ₽" },
        { type: "2-комн. кв", price: "от 8,5 млн ₽" },
        { type: "3-комн. кв", price: "от 10,8 млн ₽" },
        { type: "4+ комн. кв", price: "от 14,9 млн ₽" },
      ],
      description: [
        {
          type: "Высота потолков",
          status: itemData.primary_ceiling_height
            ? `${itemData.primary_ceiling_height} м`
            : "Не указано",
        },
      ],
      linkKey: itemData.key,
    }),
    []
  )

  // Мемоизируем создание объекта property для квартир
  const createApartmentProperty = useCallback(
    (itemData: ApartmentItem, index: number): IProperty => ({
      id: Number(itemData.id) || index,
      title: `Квартира ${itemData.apartment_number || index}`,
      subtitle: "Адрес не указан", // У квартир нет поля address
      // subtitle: itemData.complex_key || "Адрес не указан", // У квартир нет поля address
      price:
        typeof itemData.price === "number"
          ? `${itemData.price.toLocaleString()} ₽`
          : "Цена не указана",
      image: "/images/temporary/flat.png",
      badge: {
        developer: "Жилой комплекс",
        period: "2024",
      },
      metro: "",
      driveTime: "",
      metroType: "on_foot",
      specifications: [
        { type: "Студии", price: "от 5,6 млн ₽" },
        { type: "1-комн. кв", price: "от 7,1 млн ₽" },
        { type: "2-комн. кв", price: "от 8,5 млн ₽" },
        { type: "3-комн. кв", price: "от 10,8 млн ₽" },
        { type: "4+ комн. кв", price: "от 14,9 млн ₽" },
      ],
      description: [
        {
          type: "Этаж",
          status: itemData.floor ? `${itemData.floor}` : "Не указано",
        },
        {
          type: "Площадь",
          status: itemData.area ? `${itemData.area} м²` : "Не указано",
        },
        {
          type: "Комнат",
          status: itemData.room_count ? `${itemData.room_count}` : "Не указано",
        },
        {
          type: "Отделка",
          status: itemData.renovation || "Не указано",
        },
      ],
      linkKey: itemData.key,
    }),
    []
  )

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
    (
      data: ComplexItem[],
      selectedSorting: SortType,
      selectedPropertyType: string
    ): React.ReactNode[] => {
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
    [createComplexProperty, renderComplexCard, renderDreamFlatBlock]
  )

  const renderApartmentCards = useCallback(
    (
      data: ApartmentItem[],
      selectedSorting: SortType,
      selectedPropertyType: string
    ): React.ReactNode[] => {
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
    [createApartmentProperty, renderApartmentCard, renderDreamFlatBlock]
  )

  const renderCards = useCallback(
    (
      filtersData: FiltersResponse | null | undefined,
      selectedPropertyType: string,
      selectedSorting: SortType
    ): React.ReactNode[] => {
      if (!filtersData?.data) {
        return []
      }

      // Используем type guards для определения типа данных
      if (isComplexResponse(filtersData)) {
        return renderComplexCards(
          filtersData.data,
          selectedSorting,
          selectedPropertyType
        )
      } else if (isApartmentResponse(filtersData)) {
        return renderApartmentCards(
          filtersData.data,
          selectedSorting,
          selectedPropertyType
        )
      }

      return []
    },
    [renderComplexCards, renderApartmentCards]
  )

  return {
    renderCards,
  }
}
