import { useQueryClient } from "@tanstack/react-query"

import { useCallback, useEffect, useMemo, useState } from "react"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"
import { useFiltersStore } from "@/stores/useFiltersStore"
import {
  ApartmentFiltersResponse,
  ComplexFiltersResponse,
  FiltersRequest,
  FiltersResponse,
  isApartmentResponse,
  isComplexResponse,
} from "@/types/api/filters"
import { useApiQuery } from "@/utils/hooks/use-api"
import {
  createFiltersUrl,
  mapFiltersFormToApi,
} from "@/utils/mappers/filtersMapper"
import { hasActiveFiltersInUrl } from "@/utils/urlParams"

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
      // Проверяем, есть ли активные фильтры в URL
      const hasActiveFilters = hasActiveFiltersInUrl()

      if (hasActiveFilters) {
        // Создаем фильтры на основе текущих данных store
        const filtersParams = mapFiltersFormToApi(
          storeFiltersData as FiltersFormData,
          storeFiltersData.propertyType
        )
        setActiveFilters(filtersParams)
      } else {
        // Если нет активных фильтров, создаем базовые фильтры для типа недвижимости
        const baseFilters = mapFiltersFormToApi(
          storeFiltersData as FiltersFormData,
          storeFiltersData.propertyType
        )
        setActiveFilters(baseFilters)
      }
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

  // Определяем тип данных и типизированные данные в одном месте
  const { isApartmentData, isComplexData, apartmentData, complexData } =
    useMemo(() => {
      if (!filtersData) {
        return {
          isApartmentData: false,
          isComplexData: false,
          apartmentData: null,
          complexData: null,
        }
      }

      const isApartment = isApartmentResponse(filtersData)
      const isComplex = isComplexResponse(filtersData)

      return {
        isApartmentData: isApartment,
        isComplexData: isComplex,
        apartmentData: isApartment
          ? (filtersData as ApartmentFiltersResponse)
          : null,
        complexData: isComplex ? (filtersData as ComplexFiltersResponse) : null,
      }
    }, [filtersData])

  const handleSorting = useCallback((sort: SortType) => {
    setSelectedSorting(sort)
  }, [])

  const handleApplyFilters = useCallback(
    (formData: FiltersFormData) => {
      // Преобразуем данные формы в параметры API
      const filtersParams = mapFiltersFormToApi(
        formData,
        storeFiltersData.propertyType
      )

      // Сохраняем активные фильтры
      setActiveFilters(filtersParams)

      // URL уже обновляется автоматически через store
    },
    [storeFiltersData.propertyType, setActiveFilters]
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  // Логирование ошибок запроса фильтров
  useEffect(() => {
    if (errorFilters) {
      console.error("Ошибка запроса фильтров:", errorFilters)
    }
  }, [errorFilters])

  return {
    selectedSorting,
    currentPage,
    filtersData,
    apartmentData,
    complexData,
    isApartmentData,
    isComplexData,
    isLoadingFilters,
    errorFilters,
    handleSorting,
    handleApplyFilters,
    handlePageChange,
  }
}
