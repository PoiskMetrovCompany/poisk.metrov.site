import { useEffect, useRef } from "react"

import { useFiltersStore } from "@/stores/useFiltersStore"
import { hasActiveFiltersInUrl } from "@/utils/urlParams"

export const useInitialFiltersFromUrl = () => {
  const { loadFromUrl } = useFiltersStore()
  const isInitialized = useRef(false)

  useEffect(() => {
    // Загружаем фильтры из URL только один раз при инициализации
    if (!isInitialized.current) {
      // Всегда загружаем из URL, даже если нет активных фильтров
      // Это обеспечит правильную синхронизацию типа недвижимости
      loadFromUrl()
      isInitialized.current = true
    }
  }, [loadFromUrl])

  return null
}
