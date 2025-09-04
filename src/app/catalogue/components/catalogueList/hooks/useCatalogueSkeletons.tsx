import React, { useCallback, useMemo } from "react"

import PropertyCardSkeleton from "@/components/propertyCard/PropertyCardSkeleton"
import PropertyCardListSkeleton from "@/components/propertyCardList/PropertyCardListSkeleton"

type SortType = "cards" | "list"

export const useCatalogueSkeletons = () => {
  // Мемоизируем количество скелетонов
  const skeletonCount = useMemo(() => 4, [])

  // Мемоизируем создание скелетона карточки
  const createCardSkeleton = useCallback(
    (index: number) => <PropertyCardSkeleton key={`skeleton-${index}`} />,
    []
  )

  // Мемоизируем создание скелетона списка
  const createListSkeleton = useCallback(
    (index: number) => <PropertyCardListSkeleton key={`skeleton-${index}`} />,
    []
  )

  const renderSkeletons = useCallback(
    (selectedSorting: SortType): React.ReactNode[] => {
      const result: React.ReactNode[] = []

      for (let i = 0; i < skeletonCount; i++) {
        if (selectedSorting === "cards") {
          result.push(createCardSkeleton(i))
        } else {
          result.push(createListSkeleton(i))
        }
      }

      return result
    },
    [skeletonCount, createCardSkeleton, createListSkeleton]
  )

  return {
    renderSkeletons,
  }
}
