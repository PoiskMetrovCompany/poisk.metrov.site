import { useForm } from "@tanstack/react-form"

import { useState } from "react"

import { useRouter } from "next/navigation"

import { updateUrlParams } from "@/utils/urlParams"

export interface FilterValues {
  houseType: string
  roomCount: string
  priceRange: [number | null, number | null]
  searchValue: string
}

export const useFilters = () => {
  const [isFormValid, setIsFormValid] = useState(true)
  const [currentValues, setCurrentValues] = useState<FilterValues>({
    houseType: "",
    roomCount: "",
    priceRange: [null, null],
    searchValue: "",
  })
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      houseType: "",
      roomCount: "",
      priceRange: [null, null] as [number | null, number | null],
      searchValue: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Фильтры применены:", value)
    },
  })

  // Функция для перехода на каталог с фильтрами
  const navigateToCatalogue = () => {
    // Создаем URL параметры
    const urlParams = new URLSearchParams()

    // Добавляем тип недвижимости
    const propertyType = currentValues.houseType || "Жилой комплекс"
    urlParams.set("propertyType", propertyType)

    // Добавляем комнаты
    if (currentValues.roomCount) {
      urlParams.set("rooms", currentValues.roomCount)
    }

    // Добавляем цену
    if (currentValues.priceRange[0] !== null) {
      urlParams.set("priceMin", currentValues.priceRange[0].toString())
    }
    if (currentValues.priceRange[1] !== null) {
      urlParams.set("priceMax", currentValues.priceRange[1].toString())
    }

    // Добавляем район
    if (currentValues.searchValue) {
      urlParams.set("district", currentValues.searchValue)
    }

    // Создаем URL с параметрами
    const catalogueUrl = `/catalogue?${urlParams.toString()}`

    console.log("Локальные значения фильтров:", currentValues)
    console.log("Созданный URL:", catalogueUrl)

    // Переходим на страницу каталога с параметрами
    router.push(catalogueUrl)
  }

  const updateCurrentValues = (updates: Partial<FilterValues>) => {
    setCurrentValues((prev) => ({ ...prev, ...updates }))
  }

  const handlePriceChange = (range: [number | null, number | null]) => {
    console.log("Изменение цены:", range)
    form.setFieldValue("priceRange", range)
    updateCurrentValues({ priceRange: range })
    console.log("Диапазон цен изменен:", range)
  }

  const handleSearchChange = (value: string) => {
    console.log("Изменение поиска:", value)
    form.setFieldValue("searchValue", value)
    updateCurrentValues({ searchValue: value })
    console.log("Поисковый запрос:", value)
  }

  const handleHouseTypeChange = (selectedType: string) => {
    console.log("Изменение типа жилья:", selectedType)
    form.setFieldValue("houseType", selectedType)
    updateCurrentValues({ houseType: selectedType })
    console.log("Выбранный тип жилья:", selectedType)
  }

  const handleRoomCountChange = (selectedCount: string) => {
    console.log("Изменение количества комнат:", selectedCount)
    form.setFieldValue("roomCount", selectedCount)
    updateCurrentValues({ roomCount: selectedCount })
    console.log("Выбранное количество комнат:", selectedCount)
  }

  const removeHouseType = () => {
    form.setFieldValue("houseType", "")
    updateCurrentValues({ houseType: "" })
  }

  const removeRoomCount = () => {
    form.setFieldValue("roomCount", "")
    updateCurrentValues({ roomCount: "" })
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
      houseType: "",
      roomCount: "",
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
      currentValues.houseType !== "" ||
      currentValues.roomCount !== "" ||
      currentValues.priceRange[0] !== null ||
      currentValues.priceRange[1] !== null ||
      currentValues.searchValue !== ""
    )
  }

  const getActiveFiltersCount = (): number => {
    let count = 0

    if (currentValues.houseType !== "") count += 1
    if (currentValues.roomCount !== "") count += 1
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
    navigateToCatalogue,
  }
}
