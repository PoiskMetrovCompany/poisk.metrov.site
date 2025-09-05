import React, { memo, useMemo } from "react"

import NotFound from "@/components/notFound"
import { FiltersResponse } from "@/types/api/filters"

interface CatalogueNotFoundProps {
  isLoadingFilters: boolean
  filtersData: FiltersResponse | null | undefined
}

export const CatalogueNotFound: React.FC<CatalogueNotFoundProps> = memo(
  ({ isLoadingFilters, filtersData }) => {
    // Мемоизируем условие отображения
    const shouldShowNotFound = useMemo(
      () =>
        !isLoadingFilters &&
        (!filtersData?.data || filtersData.data.length === 0),
      [isLoadingFilters, filtersData?.data]
    )

    // Не показываем блок во время загрузки
    if (isLoadingFilters) {
      return null
    }

    if (shouldShowNotFound) {
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
)

CatalogueNotFound.displayName = "CatalogueNotFound"
