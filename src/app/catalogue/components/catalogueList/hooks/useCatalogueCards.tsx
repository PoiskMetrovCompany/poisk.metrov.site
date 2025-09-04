import React, { useCallback } from "react"

import GetYourDreamFlat from "@/components/getYourDreamFlat"
import PropertyCard from "@/components/propertyCard"
import PropertyCardList from "@/components/propertyCardList"
import { IProperty } from "@/types/PropertyCard"
import { IApartment } from "@/types/api/apartment"
import { FiltersResponse } from "@/types/api/filters"

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
  const renderComplexCards = useCallback(
    (
      data: unknown[],
      selectedSorting: SortType,
      selectedPropertyType: string
    ): React.ReactNode[] => {
      const result: React.ReactNode[] = []

      data.forEach((item: unknown, index: number) => {
        const itemData = item as FilterItem
        // Создаем объект property для совместимости с PropertyCard
        const property: IProperty = {
          id: Number(itemData.id) || index,
          title: itemData.name || "Жилой комплекс",
          subtitle: itemData.code || "",
          price:
            typeof itemData.price === "number"
              ? `${itemData.price.toLocaleString()} ₽`
              : "Цена не указана",
          image: "/images/temporary/house.png", // Мокаем изображение
          badge: {
            developer: "Застройщик", // Мокаем застройщика
            period: "2024", // Мокаем период
          },
          metro: itemData.metro_station || "",
          driveTime: itemData.metro_time ? `${itemData.metro_time} мин` : "",
          metroType: "on_foot", // Мокаем тип метро
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
        }

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

      return result
    },
    []
  )

  const renderApartmentCards = useCallback(
    (
      data: unknown[],
      selectedSorting: SortType,
      selectedPropertyType: string
    ): React.ReactNode[] => {
      const result: React.ReactNode[] = []

      data.forEach((item: unknown, index: number) => {
        const itemData = item as FilterItem
        // Создаем объект property для совместимости с PropertyCard
        const property: IProperty = {
          id: Number(itemData.id) || index,
          title: `Квартира ${itemData.apartment_number || index}`,
          subtitle: itemData.address || "Адрес не указан",
          price:
            typeof itemData.price === "number"
              ? `${itemData.price.toLocaleString()} ₽`
              : "Цена не указана",
          image: "/images/temporary/flat.png", // Мокаем изображение
          badge: {
            developer: "Жилой комплекс", // Мокаем застройщика
            period: "2024", // Мокаем период
          },
          metro: itemData.metro_station || "",
          driveTime: itemData.metro_time ? `${itemData.metro_time} мин` : "",
          metroType: "on_foot", // Мокаем тип метро
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
              status: itemData.room_count
                ? `${itemData.room_count}`
                : "Не указано",
            },
            {
              type: "Отделка",
              status: itemData.renovation || "Не указано",
            },
          ],
        }

        if (selectedSorting === "cards") {
          result.push(<PropertyCard key={property.id} property={property} />)
        } else {
          result.push(
            <PropertyCardList key={property.id} property={property} />
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

      return result
    },
    []
  )

  const renderCards = useCallback(
    (
      filtersData: FiltersResponse | null | undefined,
      selectedPropertyType: string,
      selectedSorting: SortType
    ): React.ReactNode[] => {
      const result: React.ReactNode[] = []

      if (!filtersData || !filtersData.data) {
        return result
      }

      const data = filtersData.data

      if (selectedPropertyType === "Жилой комплекс") {
        return renderComplexCards(data, selectedSorting, selectedPropertyType)
      } else if (selectedPropertyType === "Квартира") {
        return renderApartmentCards(data, selectedSorting, selectedPropertyType)
      }

      return result
    },
    [renderComplexCards, renderApartmentCards]
  )

  return {
    renderCards,
  }
}
