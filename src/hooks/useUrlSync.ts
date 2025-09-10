import { useEffect, useRef } from "react"

import { useFiltersStore } from "@/stores/useFiltersStore"
import { updateUrlParams } from "@/utils/urlParams"

export const useUrlSync = () => {
  const { filtersData } = useFiltersStore()
  const prevFiltersRef = useRef<string>("")
  const prevPropertyTypeRef = useRef<string>("")
  const isInitializedRef = useRef(false)

  // Синхронизируем состояние с URL при изменении фильтров
  useEffect(() => {
    // Пропускаем первую инициализацию, чтобы не перезаписать URL
    if (!isInitializedRef.current) {
      isInitializedRef.current = true
      prevFiltersRef.current = JSON.stringify(filtersData)
      prevPropertyTypeRef.current = filtersData.propertyType
      return
    }

    const currentFiltersString = JSON.stringify(filtersData)
    const currentPropertyType = filtersData.propertyType

    // Обновляем URL только если фильтры действительно изменились
    if (
      currentFiltersString !== prevFiltersRef.current ||
      currentPropertyType !== prevPropertyTypeRef.current
    ) {
      updateUrlParams(filtersData, filtersData.propertyType)
      prevFiltersRef.current = currentFiltersString
      prevPropertyTypeRef.current = currentPropertyType
    }
  }, [filtersData])

  return null
}
