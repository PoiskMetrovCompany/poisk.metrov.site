import React from "react"

import NotFound from "@/components/notFound"
import { FiltersResponse } from "@/types/api/filters"

interface CatalogueNotFoundProps {
  isLoadingFilters: boolean
  filtersData: FiltersResponse | null | undefined
}

export const CatalogueNotFound: React.FC<CatalogueNotFoundProps> = ({
  isLoadingFilters,
  filtersData,
}) => {
  if (
    !isLoadingFilters &&
    (!filtersData?.data || filtersData.data.length === 0)
  ) {
    return (
      <NotFound
        title="Подходящих вариантов нет"
        description="Измените фильтры или подпишитесь на поиск — так вы не пропустите подходящие предложения"
        buttonText="Сохранить поиск"
      />
    )
  }

  return null
}
