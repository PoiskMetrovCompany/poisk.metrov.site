import clsx from "clsx"

import React, { memo, useMemo } from "react"

import Pagination from "@/components/pagination"
import { FiltersResponse } from "@/types/api/filters"

interface CataloguePaginationProps {
  isLoadingFilters: boolean
  filtersData: FiltersResponse | null | undefined
  currentPage: number
  onPageChange: (page: number) => void
}

const PER_PAGE = "4"

export const CataloguePagination: React.FC<CataloguePaginationProps> = memo(
  ({ isLoadingFilters, filtersData, currentPage, onPageChange }) => {
    // Мемоизируем условие отображения
    const shouldShowPagination = useMemo(
      () =>
        !isLoadingFilters && filtersData?.data && filtersData.data.length > 0,
      [isLoadingFilters, filtersData?.data]
    )

    if (!shouldShowPagination) {
      return null
    }

    return (
      <Pagination
        totalPages={25}
        currentPage={currentPage}
        itemsPerPage={parseInt(PER_PAGE)}
        onPageChange={onPageChange}
      />
    )
  }
)

CataloguePagination.displayName = "CataloguePagination"
