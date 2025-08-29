"use client"

import React, { useEffect, useRef, useState } from "react"

import CatalogueFilters from "@/app/catalogue/components/catalogueFiltersNavbar"
import FiltersDialog from "@/app/catalogue/components/filters"
import { Map } from "@/components/map/map"
import { IPoint } from "@/components/map/variables/variables"
import { PointType } from "@/components/map/variables/variables"
import PropertyCard from "@/components/propertyCard"

import styles from "./fullMap.module.scss"

import PointTypes from "../pointTypes"

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
  image: "/images/buildingCarousel/buidingExpandImg.webp",
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
const FullMap = () => {
  const [activePointId, setActivePointId] = useState<number | null>(null)
  const [activePoints, setActivePoints] = useState<PointType[]>([
    PointType.IN_SALE,
    PointType.ANNOUNCEMENTS,
  ])
  const [showFilters, setShowFilters] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Блокировка скролла при показе карточки
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

  // Обработчик клика по внешней области
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
      <div className={styles.fullMap__filtersNavbar}>
        <CatalogueFilters
          isMap
          isSticky
          onShowFilters={() => setShowFilters(true)}
          onApplyFilters={() => setShowFilters(false)}
        />
      </div>
      <FiltersDialog open={showFilters} onOpenChange={setShowFilters} />
      <PointTypes
        activePoints={activePoints}
        handlePointClick={handlePointClick}
      />

      {activePointId ? (
        <div className={styles.fullMap__overlay} onClick={handleOutsideClick}>
          <div className={styles.fullMap__propertyCard} ref={cardRef}>
            <PropertyCard isMap property={card} />
          </div>
        </div>
      ) : null}

      <Map
        className={styles.location__map}
        points={points}
        activePointId={activePointId}
        onActivePointChange={(id) => setActivePointId(id)}
        activePoints={activePoints}
      />
    </div>
  )
}

export default FullMap
