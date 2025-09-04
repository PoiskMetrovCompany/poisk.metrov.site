import { useCallback } from "react"

import { useScreenSize } from "@/utils/hooks/use-screen-size"

export const useCatalogueSorting = () => {
  const { isLaptop } = useScreenSize(0)

  const handleSorting = useCallback((sort: "cards" | "list") => {
    // Логика сортировки будет передана из родительского компонента
  }, [])

  // Автоматически переключаемся на карточки на мобильных устройствах
  const getDefaultSorting = useCallback(() => {
    return isLaptop ? "cards" : "cards"
  }, [isLaptop])

  return {
    isLaptop,
    getDefaultSorting,
  }
}
