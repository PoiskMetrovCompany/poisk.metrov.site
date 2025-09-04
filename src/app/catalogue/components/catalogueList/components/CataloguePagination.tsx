import clsx from "clsx"

import React from "react"

import Pagination from "@/components/pagination"
import { FiltersResponse } from "@/types/api/filters"

interface CataloguePaginationProps {
  isLoadingFilters: boolean
  filtersData: FiltersResponse | null | undefined
  currentPage: number
  onPageChange: (page: number) => void
}

const PER_PAGE = "4"

export const CataloguePagination: React.FC<CataloguePaginationProps> = ({
  isLoadingFilters,
  filtersData,
  currentPage,
  onPageChange,
}) => {
  if (isLoadingFilters || !filtersData?.data || filtersData.data.length === 0) {
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
