import { useForm } from "@tanstack/react-form"
import { useState } from "react"

export interface FilterValues {
  houseTypes: string[]
  roomCounts: string[]
  priceRange: [number | null, number | null]
  searchValue: string
}

export const useFilters = () => {
  const [isFormValid, setIsFormValid] = useState(true)
  const [currentValues, setCurrentValues] = useState<FilterValues>({
    houseTypes: [],
    roomCounts: [],
    priceRange: [null, null],
    searchValue: "",
  })

  const form = useForm({
    defaultValues: {
      houseTypes: [] as string[],
      roomCounts: [] as string[],
      priceRange: [null, null] as [number | null, number | null],
      searchValue: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Фильтры применены:", value)
    },
  })

  const updateCurrentValues = (updates: Partial<FilterValues>) => {
    setCurrentValues((prev) => ({ ...prev, ...updates }))
  }

  const handlePriceChange = (range: [number | null, number | null]) => {
    form.setFieldValue("priceRange", range)
    updateCurrentValues({ priceRange: range })
    console.log("Диапазон цен изменен:", range)
  }

  const handleSearchChange = (value: string) => {
    form.setFieldValue("searchValue", value)
    updateCurrentValues({ searchValue: value })
    console.log("Поисковый запрос:", value)
  }

  const handleHouseTypeChange = (selectedTypes: string[]) => {
    form.setFieldValue("houseTypes", selectedTypes)
    updateCurrentValues({ houseTypes: selectedTypes })
    console.log("Выбранные типы жилья:", selectedTypes)
  }

  const handleRoomCountChange = (selectedCounts: string[]) => {
    form.setFieldValue("roomCounts", selectedCounts)
    updateCurrentValues({ roomCounts: selectedCounts })
    console.log("Выбранное количество комнат:", selectedCounts)
  }

  const removeHouseType = (typeToRemove: string) => {
    const currentTypes = currentValues.houseTypes.filter(
      (type: string) => type !== typeToRemove
    )
    form.setFieldValue("houseTypes", currentTypes)
    updateCurrentValues({ houseTypes: currentTypes })
  }

  const removeRoomCount = (countToRemove: string) => {
    const currentCounts = currentValues.roomCounts.filter(
      (count: string) => count !== countToRemove
    )
    form.setFieldValue("roomCounts", currentCounts)
    updateCurrentValues({ roomCounts: currentCounts })
  }

  const removePriceRange = () => {
    form.setFieldValue("priceRange", [null, null])
    updateCurrentValues({ priceRange: [null, null] })
  }

  const removeSearchValue = () => {
    form.setFieldValue("searchValue", "")
    updateCurrentValues({ searchValue: "" })
  }

  const clearAllFilters = () => {
    form.reset()
    setCurrentValues({
      houseTypes: [],
      roomCounts: [],
      priceRange: [null, null],
      searchValue: "",
    })
  }

  const formatPrice = (price: number): string => {
    if (price < 1000) {
      return `${price} ₽`
    } else if (price < 1000000) {
      return `${Math.floor(price / 1000)} тыс. ₽`
    } else {
      return `${(price / 1000000).toFixed(1)} млн. ₽`
    }
  }

  const getPriceDisplayText = (): string => {
    const [minPrice, maxPrice] = currentValues.priceRange

    if (minPrice !== null && maxPrice !== null) {
      return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
    }

    if (minPrice !== null) {
      return `от ${formatPrice(minPrice)}`
    }

    if (maxPrice !== null) {
      return `до ${formatPrice(maxPrice)}`
    }

    return ""
  }

  const hasActiveFilters = (): boolean => {
    return (
      currentValues.houseTypes.length > 0 ||
      currentValues.roomCounts.length > 0 ||
      currentValues.priceRange[0] !== null ||
      currentValues.priceRange[1] !== null ||
      currentValues.searchValue !== ""
    )
  }

  const getActiveFiltersCount = (): number => {
    let count = 0

    if (currentValues.houseTypes.length > 0)
      count += currentValues.houseTypes.length
    if (currentValues.roomCounts.length > 0)
      count += currentValues.roomCounts.length
    if (
      currentValues.priceRange[0] !== null ||
      currentValues.priceRange[1] !== null
    )
      count += 1
    if (currentValues.searchValue !== "") count += 1

    return count
  }

  const getCurrentValues = (): FilterValues => {
    return currentValues
  }

  return {
    form,
    isFormValid,
    handlePriceChange,
    handleSearchChange,
    handleHouseTypeChange,
    handleRoomCountChange,
    removeHouseType,
    removeRoomCount,
    removePriceRange,
    removeSearchValue,
    clearAllFilters,
    getPriceDisplayText,
    hasActiveFilters,
    getActiveFiltersCount,
    getCurrentValues,
  }
}
