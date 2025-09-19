"use client"

import React, { useEffect, useRef, useState } from "react"

import CatalogueFiltersMap from "@/app/catalogue/components/catalogueFiltersNavbar/catalogueFiltersNavbarMap"
import FiltersDialog from "@/app/catalogue/components/filters"
import { Map } from "@/components/map/map"
import { IPoint } from "@/components/map/variables/variables"
import { PointType } from "@/components/map/variables/variables"
import PropertyCard from "@/components/propertyCard"
import { Coordinate } from "@/types/Coordintes"
import { IProperty } from "@/types/PropertyCard"

import styles from "./fullMap.module.scss"

import { extractImageFromMeta } from "../../../../utils/lib/metaUtils"
import PointTypes from "../pointTypes"

import ActionButton from "@/components/ui/buttons/ActionButton"

const transformApiDataToCard = (
  complexId: number,
  complexesData: any,
  apartmentsData?: any
): IProperty => {
  if (!complexesData || complexesData.length === 0) {
    return {
      id: 1,
      title: "Нет данных",
      price: "",
      subtitle: "",
      badge: { developer: "", period: "" },
      metro: "",
      driveTime: "",
      specifications: [],
      description: [],
      image: "/images/buildingCarousel/buidingExpandImg.webp", // Fallback для случая без данных
      metroType: "on_foot" as const,
    }
  }

  const complex = complexesData.find((c: any) => c.id === complexId)
  if (!complex) {
    return {
      id: complexId,
      title: "Комплекс не найден",
      price: "",
      subtitle: "",
      badge: { developer: "", period: "" },
      metro: "",
      driveTime: "",
      specifications: [],
      description: [],
      image: "/images/buildingCarousel/buidingExpandImg.webp", // Fallback для случая, когда комплекс не найден
      metroType: "on_foot" as const,
    }
  }

  const complexApartments =
    apartmentsData?.filter((apt: any) => apt.complex_id === complexId) || []

  let minPrice = Infinity
  let maxPrice = 0
  if (complexApartments.length > 0) {
    complexApartments.forEach((apartment: any) => {
      if (apartment.price) {
        minPrice = Math.min(minPrice, apartment.price)
        maxPrice = Math.max(maxPrice, apartment.price)
      }
    })
  }

  const priceRange =
    minPrice !== Infinity && maxPrice !== 0
      ? `от ${Math.round(minPrice / 1000000)} млн ₽`
      : ""

  const roomStats: { [key: number]: { count: number; minPrice: number } } = {}
  if (complexApartments.length > 0) {
    complexApartments.forEach((apartment: any) => {
      const rooms = apartment.room_count || 0
      if (!roomStats[rooms]) {
        roomStats[rooms] = { count: 0, minPrice: Infinity }
      }
      roomStats[rooms].count++
      if (apartment.price) {
        roomStats[rooms].minPrice = Math.min(
          roomStats[rooms].minPrice,
          apartment.price
        )
      }
    })
  }

  const specifications = Object.entries(roomStats)
    .map(([rooms, stats]) => {
      const roomText =
        rooms === "0"
          ? "Студии"
          : rooms === "1"
            ? "1-комн. кв"
            : rooms === "2"
              ? "2-комн. кв"
              : rooms === "3"
                ? "3-комн. кв"
                : `${rooms}+ комн. кв`
      return {
        type: roomText,
        price:
          stats.minPrice !== Infinity
            ? `от ${Math.round(stats.minPrice / 1000000)} млн ₽`
            : "",
      }
    })
    .slice(0, 5)

  return {
    id: complex.id,
    title: complex.name || "Название не указано",
    price: priceRange,
    subtitle: complex.description
      ? complex.description.substring(0, 80) + "..."
      : "",
    badge: {
      developer: complex.builder || "Застройщик не указан",
      period: "Сроки не указаны",
    },
    metro: complex.metro_station || "Метро не указано",
    driveTime: `${complex.metro_time || 0} минут`,
    specifications: specifications,
    description: [
      { type: "Недвижимость", status: "Жилая" },
      {
        type: "Квартир",
        status: complexApartments.length.toString(),
      },
      { type: "Парковка", status: complex.parking || "Не указано" },
    ],
    image: extractImageFromMeta(
      complex.meta,
      "/images/buildingCarousel/buidingExpandImg.webp"
    ),
    linkKey: complex.key,
    metroType:
      complex.metro_type === "by_transport" ? "by_transport" : "on_foot",
  }
}

const card = {
  id: 1,
  title: "Европейский берег",
  price: "от 5.6 млн ₽",
  subtitle: "Микрорайон на набережной Оби",
  badge: { developer: "Брусника", period: "I – IV 2026" },
  metro: "Октябрьская",
  driveTime: "25 минут",
  specifications: [
    { type: "Студии", price: "от 5,6 млн ₽" },
    { type: "1-комн. кв", price: "от 7,1 млн ₽" },
    { type: "2-комн. кв", price: "от 8,5 млн ₽" },
    { type: "3-комн. кв", price: "от 10,8 млн ₽" },
    { type: "4+ комн. кв", price: "от 14,9 млн ₽" },
  ],
  description: [
    { type: "Срок сдачи", status: "Сдан — IV 2028" },
    { type: "Недвижимость", status: "Жилая" },
    { type: "Класс жилья", status: "Комфорт +" },
    { type: "Квартир", status: "8 402" },
  ],
  image: "/images/buildingCarousel/buidingExpandImg.webp", // Статическое изображение для демо
  linkKey: "demo-key",
  metroType: "on_foot" as const,
}

const points: IPoint[] = [
  {
    type: PointType.IN_SALE,
    coords: [82.91756165296852, 55.04713479491809],
    price: "12 млн",
    id: 1,
    priority: 1,
  },
  {
    type: PointType.IN_SALE,
    coords: [82.9013246842732, 55.05635673365576],
    price: "1 млн",
    id: 2,
    priority: 1,
  },
  {
    type: PointType.IN_SALE,
    coords: [82.89584209460779, 55.04670202608999],
    price: "12 млн",
    id: 12,
    priority: 0,
  },
  {
    type: PointType.ANNOUNCEMENTS,
    coords: [82.9238842670281, 55.06322956140834],
    id: 14,
  },
]

interface FullMapProps {
  hideFilters?: boolean
  coordinates?: Coordinate[]
  onShowFavourites?: () => void
  cardData?: {
    complexes?: any[]
    apartments?: any[]
  }
}

const FullMap: React.FC<FullMapProps> = ({
  hideFilters = false,
  coordinates = [],
  onShowFavourites,
  cardData,
}) => {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
  const [activePointId, setActivePointId] = useState<number | null>(null)
  const [activePoints, setActivePoints] = useState<PointType[]>([
    PointType.IN_SALE,
    PointType.ANNOUNCEMENTS,
    PointType.FAVOURITES,
  ])
  const [showFilters, setShowFilters] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      forceUpdate()
    }, 100)
    return () => clearTimeout(timer)
  }, [cardData?.complexes?.length])

  const favouritesPoints: IPoint[] =
    cardData?.complexes?.map((complex: any, index: number) => {
      const complexApartments =
        cardData.apartments?.filter(
          (apt: any) => apt.complex_id === complex.id
        ) || []
      let minPrice = Infinity
      if (complexApartments.length > 0) {
        complexApartments.forEach((apartment: any) => {
          if (apartment.price) {
            minPrice = Math.min(minPrice, apartment.price)
          }
        })
      }
      const priceText =
        minPrice !== Infinity
          ? `от ${Math.round(minPrice / 1000000)} млн ₽`
          : "Цена не указана"

      return {
        type: PointType.FAVOURITES,
        coords: [complex.longitude, complex.latitude],
        id: complex.id,
        priority: 1,
        price: priceText,
      }
    }) || []

  const allPoints: IPoint[] = hideFilters
    ? favouritesPoints
    : [...points, ...favouritesPoints]

  useEffect(() => {
    if (activePointId) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [activePointId])

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setActivePointId(null)
    }
  }

  const handlePointClick = (point: PointType) => {
    setActivePoints((prev) => {
      if (prev.includes(point)) {
        return prev.filter((p) => p !== point)
      }

      return [...prev, point]
    })
  }

  return (
    <div className={styles.fullMap}>
      {hideFilters && (
        <div className={styles.fullMap__favouritesButton}>
          <ActionButton
            onClick={onShowFavourites}
            className={styles.favouritesButton}
            type="secondary"
          >
            Показать избранное текстом
          </ActionButton>
        </div>
      )}
      {!hideFilters && (
        <div className={styles.fullMap__filtersNavbar}>
          <CatalogueFiltersMap
            onShowFilters={() => setShowFilters(true)}
            onApplyFilters={() => setShowFilters(false)}
          />
        </div>
      )}
      <FiltersDialog
        haveToSelectType
        isMap
        open={showFilters}
        onOpenChange={setShowFilters}
      />
      {!hideFilters && (
        <PointTypes
          activePoints={activePoints}
          handlePointClick={handlePointClick}
        />
      )}

      {activePointId ? (
        <div className={styles.fullMap__overlay} onClick={handleOutsideClick}>
          <div className={styles.fullMap__propertyCard} ref={cardRef}>
            <PropertyCard
              isMap
              property={
                cardData?.complexes && activePointId
                  ? transformApiDataToCard(
                      activePointId,
                      cardData.complexes,
                      cardData.apartments
                    )
                  : card
              }
            />
          </div>
        </div>
      ) : null}

      <Map
        mapClassName={styles.fullMap__map}
        points={allPoints}
        activePointId={activePointId}
        onActivePointChange={(id) => setActivePointId(id)}
        activePoints={activePoints}
      />
    </div>
  )
}

export default FullMap
