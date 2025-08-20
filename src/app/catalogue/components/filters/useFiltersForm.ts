import { useForm } from "@tanstack/react-form"
import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { FiltersFormData, INITIAL_RANGES } from "./types"

export const useFiltersForm = () => {
  // Состояния для показа/скрытия выпадающих списков
  const [showOptions, setShowOptions] = useState<Record<string, boolean>>({
    district: false,
    builder: false,
    livingEstate: false,
    street: false,
    metro: false,
  })

  // Состояния для мультивыбора
  const [multiSelectValues, setMultiSelectValues] = useState({
    // Квартира
    rooms: [] as string[],
    floorOptions: [] as string[],
    layout: [] as string[],
    finish: [] as string[],
    bathroom: [] as string[],
    apartments: "",
    features: [] as string[],
    ceilingHeight: [] as string[],

    // Жилой комплекс
    buildingType: [] as string[],
    builder: [] as string[],
    completionDate: [] as string[],
    metroDistance: [] as string[],
    elevator: [] as string[],
    parking: [] as string[],
    security: [] as string[],

    // Покупка
    paymentMethod: [] as string[],
    mortgageType: [] as string[],
    installmentPeriod: [] as string[],
    downPayment: [] as string[],
    mortgagePrograms: [] as string[],
  })

  // Рефы для селектов
  const districtRef = useRef<HTMLDivElement>(null)
  const builderRef = useRef<HTMLDivElement>(null)
  const livingEstateRef = useRef<HTMLDivElement>(null)
  const streetRef = useRef<HTMLDivElement>(null)
  const metroRef = useRef<HTMLDivElement>(null)

  const refs = useMemo(
    () => ({
      district: districtRef,
      builder: builderRef,
      livingEstate: livingEstateRef,
      street: streetRef,
      metro: metroRef,
    }),
    []
  )

  // Инициализация формы с @tanstack/react-form
  const form = useForm({
    defaultValues: {
      // Селекты
      district: "",
      builder: "",
      livingEstate: "",
      street: "",
      metro: "",

      // Диапазоны
      priceMin: INITIAL_RANGES.price.min,
      priceMax: INITIAL_RANGES.price.max,
      floorMin: INITIAL_RANGES.floor.min,
      floorMax: INITIAL_RANGES.floor.max,
      flatAreaMin: INITIAL_RANGES.flatArea.min,
      flatAreaMax: INITIAL_RANGES.flatArea.max,
      livingAreaMin: INITIAL_RANGES.livingArea.min,
      livingAreaMax: INITIAL_RANGES.livingArea.max,
      floorsInBuildingMin: INITIAL_RANGES.floorsInBuilding.min,
      floorsInBuildingMax: INITIAL_RANGES.floorsInBuilding.max,
    },
    onSubmit: async ({ value }) => {
      console.log("Применяем фильтры:", { ...value, ...multiSelectValues })
      return { status: "success" }
    },
  })

  // Функция сброса фильтров
  const resetFilters = () => {
    form.reset()
    setMultiSelectValues({
      rooms: [],
      floorOptions: [],
      layout: [],
      finish: [],
      bathroom: [],
      apartments: "",
      features: [],
      ceilingHeight: [],
      buildingType: [],
      builder: [],
      completionDate: [],
      metroDistance: [],
      elevator: [],
      parking: [],
      security: [],
      paymentMethod: [],
      mortgageType: [],
      installmentPeriod: [],
      downPayment: [],
      mortgagePrograms: [],
    })
    closeAllSelects()
  }

  // Функция закрытия всех выпадающих списков
  const closeAllSelects = useCallback(() => {
    setShowOptions({
      district: false,
      builder: false,
      livingEstate: false,
      street: false,
      metro: false,
    })
  }, [])

  // Универсальный обработчик для переключения выпадающих списков
  const handleSelectToggle = (field: keyof typeof showOptions) => {
    closeAllSelects()
    setShowOptions((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  // Универсальный обработчик для выбора значений в селектах
  const handleSelectChange = (
    field: "district" | "builder" | "livingEstate" | "street" | "metro",
    value: string
  ) => {
    form.setFieldValue(field, value)
    setShowOptions((prev) => ({
      ...prev,
      [field]: false,
    }))
  }

  // Универсальный обработчик для диапазонов
  const handleRangeChange = useCallback(
    (
      field: "price" | "floor" | "flatArea" | "livingArea" | "floorsInBuilding",
      range: [number, number]
    ) => {
      const [min, max] = range
      const minField = `${field}Min` as
        | "priceMin"
        | "floorMin"
        | "flatAreaMin"
        | "livingAreaMin"
        | "floorsInBuildingMin"
      const maxField = `${field}Max` as
        | "priceMax"
        | "floorMax"
        | "flatAreaMax"
        | "livingAreaMax"
        | "floorsInBuildingMax"

      // Устанавливаем значения напрямую
      form.setFieldValue(minField, min)
      form.setFieldValue(maxField, max)
    },
    [form]
  )

  // Универсальный обработчик для мультивыбора (кнопки фильтров)
  const handleMultiSelect = useCallback(
    (
      field:
        | "rooms"
        | "floorOptions"
        | "layout"
        | "finish"
        | "bathroom"
        | "features"
        | "ceilingHeight"
        | "buildingType"
        | "builder"
        | "completionDate"
        | "metroDistance"
        | "elevator"
        | "parking"
        | "security"
        | "paymentMethod"
        | "mortgageType"
        | "installmentPeriod"
        | "downPayment"
        | "mortgagePrograms",
      value: string
    ) => {
      setMultiSelectValues((prev) => {
        const currentValues = prev[field] || []
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value]
        return { ...prev, [field]: newValues }
      })
    },
    []
  )

  // Обработчик для апартаментов (взаимоисключающий выбор)
  const handleApartmentsSelect = useCallback((apartments: string) => {
    setMultiSelectValues((prev) => ({
      ...prev,
      apartments: prev.apartments === apartments ? "" : apartments,
    }))
  }, [])

  // Effect для закрытия селектов при клике вне их
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const shouldClose = Object.values(refs).every(
        (ref) => !ref.current?.contains(target)
      )

      if (shouldClose) {
        closeAllSelects()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [refs, closeAllSelects])

  return {
    form,
    formData: { ...form.state.values, ...multiSelectValues },

    // Состояния показа опций селектов
    showOptions,

    // Рефы
    refs,

    // Функции
    resetFilters,
    closeAllSelects,

    // Универсальные обработчики
    handleSelectToggle,
    handleSelectChange,
    handleRangeChange,
    handleMultiSelect,
    handleApartmentsSelect,
  }
}
