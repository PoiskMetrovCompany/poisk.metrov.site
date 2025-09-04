import React, { useCallback } from "react"
import PropertyCardSkeleton from "@/components/propertyCard/PropertyCardSkeleton"
import PropertyCardListSkeleton from "@/components/propertyCardList/PropertyCardListSkeleton"

type SortType = "cards" | "list"

export const useCatalogueSkeletons = () => {
  const renderSkeletons = useCallback((selectedSorting: SortType): React.ReactNode[] => {
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
  }, [])

  return {
    renderSkeletons,
  }
}
