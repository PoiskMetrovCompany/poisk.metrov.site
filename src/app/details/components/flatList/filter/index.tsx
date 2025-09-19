"use client"

import React, { useEffect, useState } from "react"

import styles from "./filter.module.scss"

import Dropdown from "@/components/ui/inputs/dropdown"
import Range from "@/components/ui/inputs/range"

interface FilterProps {
  complexKey: string
  filters: {
    price?: [number, number]
    area?: [number, number]
    "kitchen-area"?: [number, number]
    floor?: [number, number]
    "built-year"?: string
    corpus?: string
    finishing?: string
    bathroom?: string
    "payment-method"?: string
    apartments?: string
  }
  onFiltersChange: (filters: FilterProps["filters"]) => void
}

interface FilterData {
  floors: {
    list: number[]
    count: number
  }
  apartment_area: {
    min: number
    max: number
  }
  kitchen_area: {
    min: number
    max: number
  }
  finishing: {
    list: string[]
    count: number
  }
  price: {
    min: number
    max: number
  }
}

const Filter: React.FC<FilterProps> = ({
  complexKey,
  filters,
  onFiltersChange,
}) => {
  const [filterData, setFilterData] = useState<FilterData | null>(null)

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        const response = await fetch(
          `${apiUrl}/residential-complex/read?key=06f57f4a-83c2-11f0-a013-10f60a82b815&includes=Apartment&filter=apartments.filters`
        )

        if (response.ok) {
          const data = await response.json()
          // Извлекаем данные фильтров из includes[0].attributes
          const filtersData = data.attributes?.includes?.[0]?.attributes
          if (filtersData) {
            setFilterData(filtersData)
            console.log("Filter data loaded:", filtersData)
          } else {
            console.error("No filter data found in response")
          }
        } else {
          console.error("Failed to fetch filter data:", response.status)
        }
      } catch (error) {
        console.error("Error fetching filter data:", error)
      }
    }

    fetchFilterData()
  }, [complexKey])

  // Создаем options для отделки
  const finishingOptions =
    filterData?.finishing?.list?.map((finish: string) => ({
      label: finish,
      value: finish,
    })) || []

  const handleRangeChange = (key: string) => (value: [number, number]) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const handleDropdownChange = (key: string) => (value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    })
  }

  return (
    <div className={styles.filter}>
      <Range
        min={filterData?.price?.min || 0}
        max={filterData?.price?.max || 100}
        step={100000}
        title="Стоимость, млн ₽"
        value={filters.price}
        onValueChange={handleRangeChange("price")}
      />
      <Range
        min={
          filterData?.apartment_area?.min
            ? Math.ceil(filterData.apartment_area.min)
            : 0
        }
        max={
          filterData?.apartment_area?.max
            ? Math.ceil(filterData.apartment_area.max)
            : 100
        }
        step={0.1}
        title="Площадь м²"
        value={filters.area}
        onValueChange={handleRangeChange("area")}
      />
      <Range
        min={
          filterData?.kitchen_area?.min
            ? Math.ceil(filterData.kitchen_area.min)
            : 0
        }
        max={
          filterData?.kitchen_area?.max
            ? Math.ceil(filterData.kitchen_area.max)
            : 100
        }
        step={0.1}
        title="Площадь кухни м²"
        value={filters["kitchen-area"]}
        onValueChange={handleRangeChange("kitchen-area")}
      />
      <Range
        min={filterData?.floors?.list ? Math.min(...filterData.floors.list) : 1}
        max={
          filterData?.floors?.list ? Math.max(...filterData.floors.list) : 17
        }
        step={1}
        title="Этаж"
        value={filters.floor}
        onValueChange={handleRangeChange("floor")}
      />

      {/* Срок сдачи - пока оставляем статичным */}
      <Dropdown
        items={[{ label: "Срок сдачи", value: "1" }]}
        placeholder="Срок сдачи"
        value={filters["built-year"] || ""}
        onChange={handleDropdownChange("built-year")}
      />

      {/* Корпус - пока оставляем статичным */}
      <Dropdown
        items={[{ label: "Корпус", value: "1" }]}
        placeholder="Корпус"
        value={filters.corpus || ""}
        onChange={handleDropdownChange("corpus")}
      />

      {/* Отделка - используем данные из API */}
      <Dropdown
        items={finishingOptions}
        placeholder="Отделка"
        value={filters.finishing || ""}
        onChange={handleDropdownChange("finishing")}
      />

      {/* Санузел - пока оставляем статичным */}
      <Dropdown
        items={[{ label: "Санузел", value: "1" }]}
        placeholder="Санузел"
        value={filters.bathroom || ""}
        onChange={handleDropdownChange("bathroom")}
      />

      {/* Способы оплаты - пока оставляем статичным */}
      <Dropdown
        items={[{ label: "Способы оплаты", value: "1" }]}
        placeholder="Способы оплаты"
        value={filters["payment-method"] || ""}
        onChange={handleDropdownChange("payment-method")}
      />

      {/* Апартаменты - пока оставляем статичным */}
      <Dropdown
        items={[{ label: "Апартаменты", value: "1" }]}
        placeholder="Апартаменты"
        value={filters.apartments || ""}
        onChange={handleDropdownChange("apartments")}
      />
    </div>
  )
}

export default Filter
