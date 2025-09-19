import React, { FC, useCallback, useEffect, useState } from "react"

import { IInclude, ResidentialComplexDataResponse } from "@/types/api/complex"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "./flatList.module.scss"

import Filter from "./filter/index"
import LayoutList from "./layoutList"

import Heading2 from "@/components/ui/heading2"
import Skeleton from "@/components/ui/skeleton"

interface Filters {
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

interface FlatListProps {
  complexKey: string
}

const FlatList: FC<FlatListProps> = ({ complexKey }) => {
  const [filters, setFilters] = useState<Filters>({})
  const [debouncedFilters, setDebouncedFilters] = useState<Filters>({})

  const buildApiUrl = useCallback((complexKey: string, filters: Filters) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/residential-complex/read?key=${complexKey}&includes=Apartment&filter=apartments.room`

    const filterParams: string[] = []

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          if (value[0] !== undefined && value[1] !== undefined) {
            filterParams.push(`${key}=${value[0]},${value[1]}`)
          }
        } else {
          filterParams.push(`${key}=${value}`)
        }
      }
    })

    if (filterParams.length > 0) {
      url += `&${filterParams.join("&")}`
    } else {
      url += "&filter=apartments.room"
    }

    return url
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters)
    }, 1000)

    return () => clearTimeout(timer)
  }, [filters])

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters)
  }, [])

  const FULL_API_URL = buildApiUrl(complexKey, debouncedFilters)

  const {
    data: flatListData,
    isLoading,
    error,
  } = useApiQuery<ResidentialComplexDataResponse>(
    ["residential-complex-flats", complexKey, JSON.stringify(debouncedFilters)],
    FULL_API_URL,
    {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  )

  if (isLoading) {
    return (
      <div className={styles.flatList}>
        <div className={styles.flatList__top}>
          <Heading2>Квартиры и цены</Heading2>
          <Skeleton height="160px" width="100%" border="4px" />
        </div>
        <Skeleton height="180px" width="100%" border="4px" />
      </div>
    )
  }
  if (error || !flatListData) {
    return (
      <div className={styles.flatList}>
        <div className={styles.flatList__top}>
          <Heading2>
            Квартиры и цены --- Произошла ошибка, обновите страницу
          </Heading2>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.flatList}>
      <div className={styles.flatList__top}>
        <Heading2>Квартиры и цены</Heading2>

        <Filter
          complexKey={complexKey}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      </div>

      <LayoutList
        apartmentTypes={
          (() => {
            const apartmentInclude = flatListData?.attributes?.includes?.find(
              (include: any) => include.type === "apartment"
            )
            const attributes = apartmentInclude?.attributes
            if (Array.isArray(attributes)) {
              return attributes[0] || {}
            }
            return attributes || {}
          })() as Record<string, any>
        }
      />
    </div>
  )
}

export default FlatList
