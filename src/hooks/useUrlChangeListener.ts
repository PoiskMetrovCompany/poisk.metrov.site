import { useEffect } from "react"

import { useFiltersStore } from "@/stores/useFiltersStore"
import { getCurrentUrlParams, parseFiltersFromUrl } from "@/utils/urlParams"

export const useUrlChangeListener = () => {
  const { loadFromUrl } = useFiltersStore()

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const handlePopState = () => {
      // При изменении URL (назад/вперед) загружаем фильтры из URL
      loadFromUrl()
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [loadFromUrl])

  return null
}
