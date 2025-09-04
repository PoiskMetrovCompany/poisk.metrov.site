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
  const { selectedPropertyType } = useFiltersStore()

  // Создаем начальные фильтры для автоматического запроса
  const initialFilters = useMemo(
    () => ({
      entity_type: selectedPropertyType === "Квартира" ? "Квартиры" : "ЖК",
    }),
    [selectedPropertyType]
  )

  // Устанавливаем начальные фильтры при первой загрузке
  useEffect(() => {
    if (!activeFilters) {
      setActiveFilters(initialFilters)
    }
  }, [activeFilters, initialFilters, setActiveFilters])

  // Обновляем фильтры при изменении типа недвижимости
  useEffect(() => {
    if (activeFilters) {
      // Сохраняем текущие фильтры, но обновляем entity_type
      const updatedFilters = {
        ...activeFilters,
        entity_type: selectedPropertyType === "Квартира" ? "Квартиры" : "ЖК",
      }
      setActiveFilters(updatedFilters)
    } else {
      setActiveFilters(initialFilters)
    }
  }, [selectedPropertyType, setActiveFilters, initialFilters])

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
      const filtersParams = mapFiltersFormToApi(formData, selectedPropertyType)
      console.log("Параметры API фильтров:", filtersParams)

      // Сохраняем активные фильтры
      setActiveFilters(filtersParams)
    },
    [selectedPropertyType, setActiveFilters]
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
