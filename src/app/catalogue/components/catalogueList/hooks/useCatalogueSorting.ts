import { useCallback, useMemo } from "react"

import { useScreenSize } from "@/utils/hooks/use-screen-size"

export const useCatalogueSorting = () => {
  const { isLaptop } = useScreenSize(0)

  // Мемоизируем дефолтную сортировку
  const defaultSorting = useMemo(
    () => (isLaptop ? "cards" : "cards"),
    [isLaptop]
  )

  const handleSorting = useCallback((sort: "cards" | "list") => {
    // Логика сортировки будет передана из родительского компонента
  }, [])

  return {
    isLaptop,
    defaultSorting,
  }
}
