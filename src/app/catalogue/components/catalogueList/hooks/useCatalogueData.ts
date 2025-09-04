import { useQueryClient } from "@tanstack/react-query"

import { useCallback, useEffect, useMemo, useState } from "react"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"
import { useFiltersStore } from "@/stores/useFiltersStore"
import { FiltersRequest, FiltersResponse } from "@/types/api/filters"
import { useApiQuery } from "@/utils/hooks/use-api"
import {
  createFiltersUrl,
  mapFiltersFormToApi,
} from "@/utils/mappers/filtersMapper"

type SortType = "cards" | "list"

export const useCatalogueData = (
  activeFilters: FiltersRequest | null,
  setActiveFilters: (filters: FiltersRequest | null) => void
) => {
  const [selectedSorting, setSelectedSorting] = useState<SortType>("cards")
  const [currentPage, setCurrentPage] = useState(1)
  const { filtersData: storeFiltersData, isLoadedFromUrl } = useFiltersStore()
  const queryClient = useQueryClient()

  // Сбрасываем кэш при монтировании компонента
  useEffect(() => {
    // Удаляем все кэшированные запросы фильтров при переходе на страницу
    queryClient.removeQueries({ queryKey: ["filters"] })
  }, [queryClient])

  // Устанавливаем начальные фильтры при первой загрузке или изменении типа недвижимости
  useEffect(() => {
    // Ждем загрузки данных из URL и устанавливаем фильтры
    if (
      isLoadedFromUrl &&
      (!activeFilters ||
        activeFilters.entity_type !==
          (storeFiltersData.propertyType === "Квартира" ? "Квартиры" : "ЖК"))
    ) {
      // Создаем фильтры на основе текущих данных store
      const filtersParams = mapFiltersFormToApi(
        storeFiltersData as FiltersFormData,
        storeFiltersData.propertyType
      )
      setActiveFilters(filtersParams)
    }
  }, [
    activeFilters,
    setActiveFilters,
    storeFiltersData.propertyType,
    storeFiltersData,
    isLoadedFromUrl,
  ])

  // Запрос фильтров
  const {
    data: filtersData,
    isLoading: isLoadingFilters,
    error: errorFilters,
  } = useApiQuery<FiltersResponse>(
    ["filters", activeFilters ? JSON.stringify(activeFilters) : "no-filters"],
    activeFilters ? createFiltersUrl("/filters", activeFilters) : "",
    {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      // enabled: !!activeFilters,
    }
  )

  const handleSorting = useCallback((sort: SortType) => {
    setSelectedSorting(sort)
  }, [])

  const handleApplyFilters = useCallback(
    (formData: FiltersFormData) => {
      console.log("Применение фильтров:", formData)

      // Преобразуем данные формы в параметры API
      const filtersParams = mapFiltersFormToApi(
        formData,
        storeFiltersData.propertyType
      )
      console.log("Параметры API фильтров:", filtersParams)

      // Сохраняем активные фильтры
      setActiveFilters(filtersParams)

      // URL уже обновляется автоматически через store
    },
    [storeFiltersData.propertyType, setActiveFilters]
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  // Логирование результата запроса фильтров
  useEffect(() => {
    if (filtersData) {
      console.log("Результат запроса фильтров:", filtersData)
    }
    if (errorFilters) {
      console.error("Ошибка запроса фильтров:", errorFilters)
    }
  }, [filtersData, errorFilters])

  return {
    selectedSorting,
    currentPage,
    filtersData,
    isLoadingFilters,
    errorFilters,
    handleSorting,
    handleApplyFilters,
    handlePageChange,
  }
}
