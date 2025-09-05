import React, { FC } from "react"

import { ResidentialComplexDataResponse } from "@/types/api/complex"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "./flatList.module.scss"

import Filter from "./filter"
import LayoutList from "./layoutList"

import Heading2 from "@/components/ui/heading2"
import Skeleton from "@/components/ui/skeleton"

interface FlatListProps {
  complexKey: string
}

const FlatList: FC<FlatListProps> = ({ complexKey }) => {
  const FULL_API_URL = `http://localhost:1080/api/v1/residential-complex/read?key=${complexKey}&includes=Apartment&filter=apartments.room`
  const {
    data: flatListData,
    isLoading,
    error,
  } = useApiQuery<ResidentialComplexDataResponse>(
    ["residential-complex-flats", complexKey],
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

        <Filter />
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
