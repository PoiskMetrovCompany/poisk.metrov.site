import { useForm } from "@tanstack/react-form"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { FiltersFormData, INITIAL_RANGES } from "./types"

// Типы для селектов
type SelectField = "district" | "builder" | "livingEstate" | "street" | "metro"

// Типы для диапазонов
type RangeField =
  | "price"
  | "floor"
  | "flatArea"
  | "livingArea"
  | "floorsInBuilding"

// Типы для мультивыбора
type MultiSelectField =
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
  | "mortgagePrograms"

// Интерфейс для состояния показа опций
interface ShowOptionsState {
  district: boolean
  builder: boolean
  livingEstate: boolean
  street: boolean
  metro: boolean
}

// Интерфейс для значений мультивыбора
interface MultiSelectValues {
  // Квартира
  propertyType: string
  rooms: string[]
  floorOptions: string[]
  layout: string[]
  finish: string[]
  bathroom: string[]
  apartments: string
  features: string[]
  ceilingHeight: string[]

  // Жилой комплекс
  buildingType: string[]
  builder: string[]
  completionDate: string[]
  metroDistance: string[]
  metroTransportType: string
  elevator: string[]
  parking: string[]
  security: string[]

  // Покупка
  paymentMethod: string[]
  mortgageType: string[]
  installmentPeriod: string[]
  downPayment: string[]
  mortgagePrograms: string[]
}

// Интерфейс для значений формы
interface FormValues {
  // Селекты
  district: string
  builder: string
  livingEstate: string
  street: string
  metro: string

  // Диапазоны
  priceMin: number | null
  priceMax: number | null
  floorMin: number | null
  floorMax: number | null
  flatAreaMin: number | null
  flatAreaMax: number | null
  livingAreaMin: number | null
  livingAreaMax: number | null
  floorsInBuildingMin: number | null
  floorsInBuildingMax: number | null
}

// Интерфейс для рефов
interface SelectRefs {
  district: React.RefObject<HTMLDivElement | null>
  builder: React.RefObject<HTMLDivElement | null>
  livingEstate: React.RefObject<HTMLDivElement | null>
  street: React.RefObject<HTMLDivElement | null>
  metro: React.RefObject<HTMLDivElement | null>
}

// Типизированная функция для установки значений полей формы
type FormFieldName = keyof FormValues

export const useFiltersForm = () => {
  // Состояния для показа/скрытия выпадающих списков
  const [showOptions, setShowOptions] = useState<ShowOptionsState>({
    district: false,
    builder: false,
    livingEstate: false,
    street: false,
    metro: false,
  })

  // Состояния для мультивыбора
  const [multiSelectValues, setMultiSelectValues] = useState<MultiSelectValues>(
    {
      // Квартира
      propertyType: "Квартира",
      rooms: [],
      floorOptions: [],
      layout: [],
      finish: [],
      bathroom: [],
      apartments: "",
      features: [],
      ceilingHeight: [],

      // Жилой комплекс
      buildingType: [],
      builder: [],
      completionDate: [],
      metroDistance: [],
      metroTransportType: "",
      elevator: [],
      parking: [],
      security: [],

      // Покупка
      paymentMethod: [],
      mortgageType: [],
      installmentPeriod: [],
      downPayment: [],
      mortgagePrograms: [],
    }
  )

  // Рефы для селектов
  const districtRef = useRef<HTMLDivElement>(null)
  const builderRef = useRef<HTMLDivElement>(null)
  const livingEstateRef = useRef<HTMLDivElement>(null)
  const streetRef = useRef<HTMLDivElement>(null)
  const metroRef = useRef<HTMLDivElement>(null)

  const refs: SelectRefs = useMemo(
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
      priceMin: null,
      priceMax: null,
      floorMin: null,
      floorMax: null,
      flatAreaMin: null,
      flatAreaMax: null,
      livingAreaMin: null,
      livingAreaMax: null,
      floorsInBuildingMin: null,
      floorsInBuildingMax: null,
    },
    onSubmit: async ({ value }) => {
      return { status: "success" }
    },
  })

  // Типизированные функции для установки значений полей формы
  const setStringFieldValue = useCallback(
    (
      fieldName: "district" | "builder" | "livingEstate" | "street" | "metro",
      value: string
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(form.setFieldValue as any)(fieldName, value)
    },
    [form]
  )

  const setNumberFieldValue = useCallback(
    (
      fieldName:
        | "priceMin"
        | "priceMax"
        | "floorMin"
        | "floorMax"
        | "flatAreaMin"
        | "flatAreaMax"
        | "livingAreaMin"
        | "livingAreaMax"
        | "floorsInBuildingMin"
        | "floorsInBuildingMax",
      value: number | null
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(form.setFieldValue as any)(fieldName, value)
    },
    [form]
  )

  // Функция сброса фильтров
  const resetFilters = () => {
    form.reset()
    setMultiSelectValues({
      propertyType: "",
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
      metroTransportType: "",
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
  const handleSelectToggle = (field: SelectField) => {
    closeAllSelects()
    setShowOptions((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  // Универсальный обработчик для выбора значений в селектах
  const handleSelectChange = (field: SelectField, value: string) => {
    setStringFieldValue(field, value)
    setShowOptions((prev) => ({
      ...prev,
      [field]: false,
    }))
  }

  // Универсальный обработчик для диапазонов (для слайдеров)
  const handleRangeChange = useCallback(
    (field: RangeField, range: [number, number]) => {
      const [min, max] = range

      // Используем switch для правильной типизации
      switch (field) {
        case "price":
          setNumberFieldValue("priceMin", min)
          setNumberFieldValue("priceMax", max)
          break
        case "floor":
          setNumberFieldValue("floorMin", min)
          setNumberFieldValue("floorMax", max)
          break
        case "flatArea":
          setNumberFieldValue("flatAreaMin", min)
          setNumberFieldValue("flatAreaMax", max)
          break
        case "livingArea":
          setNumberFieldValue("livingAreaMin", min)
          setNumberFieldValue("livingAreaMax", max)
          break
        case "floorsInBuilding":
          setNumberFieldValue("floorsInBuildingMin", min)
          setNumberFieldValue("floorsInBuildingMax", max)
          break
      }
    },
    [setNumberFieldValue]
  )

  // Обработчики для отдельных полей диапазонов
  const handleRangeMinChange = useCallback(
    (field: RangeField, value: number | null) => {
      switch (field) {
        case "price":
          setNumberFieldValue("priceMin", value)
          break
        case "floor":
          setNumberFieldValue("floorMin", value)
          break
        case "flatArea":
          setNumberFieldValue("flatAreaMin", value)
          break
        case "livingArea":
          setNumberFieldValue("livingAreaMin", value)
          break
        case "floorsInBuilding":
          setNumberFieldValue("floorsInBuildingMin", value)
          break
      }
    },
    [setNumberFieldValue]
  )

  const handleRangeMaxChange = useCallback(
    (field: RangeField, value: number | null) => {
      switch (field) {
        case "price":
          setNumberFieldValue("priceMax", value)
          break
        case "floor":
          setNumberFieldValue("floorMax", value)
          break
        case "flatArea":
          setNumberFieldValue("flatAreaMax", value)
          break
        case "livingArea":
          setNumberFieldValue("livingAreaMax", value)
          break
        case "floorsInBuilding":
          setNumberFieldValue("floorsInBuildingMax", value)
          break
      }
    },
    [setNumberFieldValue]
  )

  // Обработчик для RangeInput компонента (работает с [number | null, number | null])
  const handleRangeInputChange = useCallback(
    (field: RangeField, range: [number | null, number | null]) => {
      const [min, max] = range

      switch (field) {
        case "price":
          setNumberFieldValue("priceMin", min)
          setNumberFieldValue("priceMax", max)
          break
        case "floor":
          setNumberFieldValue("floorMin", min)
          setNumberFieldValue("floorMax", max)
          break
        case "flatArea":
          setNumberFieldValue("flatAreaMin", min)
          setNumberFieldValue("flatAreaMax", max)
          break
        case "livingArea":
          setNumberFieldValue("livingAreaMin", min)
          setNumberFieldValue("livingAreaMax", max)
          break
        case "floorsInBuilding":
          setNumberFieldValue("floorsInBuildingMin", min)
          setNumberFieldValue("floorsInBuildingMax", max)
          break
      }
    },
    [setNumberFieldValue]
  )

  // Универсальный обработчик для мультивыбора (кнопки фильтров)
  const handleMultiSelect = useCallback(
    (field: MultiSelectField, value: string) => {
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

  // Обработчик для типа жилья (взаимоисключающий выбор)
  const handlePropertyTypeSelect = useCallback((propertyType: string) => {
    setMultiSelectValues((prev) => ({
      ...prev,
      propertyType: prev.propertyType === propertyType ? "" : propertyType,
    }))
  }, [])

  // Обработчик для типа транспорта до метро (взаимоисключающий выбор)
  const handleMetroTransportTypeSelect = useCallback(
    (transportType: string) => {
      setMultiSelectValues((prev) => ({
        ...prev,
        metroTransportType:
          prev.metroTransportType === transportType ? "" : transportType,
      }))
    },
    []
  )

  // Функция для подсчета количества примененных фильтров
  const getActiveFiltersCount = useCallback(() => {
    const formValues = form.state.values
    const allData = { ...formValues, ...multiSelectValues }

    // Вспомогательные функции для подсчета
    const hasValue = (value: unknown): boolean => {
      if (typeof value === "string") {
        const result = value.trim() !== ""
        return result
      }
      const result = Boolean(value)
      return result
    }
    const hasArrayValue = (arr: unknown): boolean => {
      const result = Array.isArray(arr) && arr.length > 0
      return result
    }
    const hasRangeValue = (min: number | null, max: number | null): boolean => {
      const result = min !== null || max !== null
      return result
    }

    let count = 0

    // Подсчет селектов (только непустые строки)
    const selectFields: (keyof typeof allData)[] = [
      "district",
      "builder",
      "livingEstate",
      "street",
      "metro",
    ]
    const selectCount = selectFields.filter((field) =>
      hasValue(allData[field])
    ).length
    count += selectCount

    // Подсчет диапазонов (только если хотя бы одно значение не null)
    const rangeFields: Array<{
      min: keyof typeof allData
      max: keyof typeof allData
    }> = [
      { min: "priceMin", max: "priceMax" },
      { min: "floorMin", max: "floorMax" },
      { min: "flatAreaMin", max: "flatAreaMax" },
      { min: "livingAreaMin", max: "livingAreaMax" },
      { min: "floorsInBuildingMin", max: "floorsInBuildingMax" },
    ]
    const rangeCount = rangeFields.filter(({ min, max }) =>
      hasRangeValue(
        allData[min] as number | null,
        allData[max] as number | null
      )
    ).length
    count += rangeCount

    // Подсчет массивов (только непустые массивы)
    const arrayFields: (keyof typeof allData)[] = [
      "rooms",
      "floorOptions",
      "layout",
      "finish",
      "bathroom",
      "features",
      "ceilingHeight",
      "buildingType",
      "completionDate",
      "metroDistance",
      "elevator",
      "parking",
      "security",
      "paymentMethod",
      "mortgageType",
      "installmentPeriod",
      "downPayment",
      "mortgagePrograms",
    ]
    const arrayCount = arrayFields.filter((field) =>
      hasArrayValue(allData[field])
    ).length
    count += arrayCount

    // Подсчет строковых значений (только непустые строки)
    const stringFields: (keyof typeof allData)[] = [
      "propertyType",
      "apartments",
      "metroTransportType",
    ]
    const stringCount = stringFields.filter((field) =>
      hasValue(allData[field])
    ).length
    count += stringCount

    return count
  }, [form.state.values, multiSelectValues])

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

  // Мемоизируем formData, чтобы избежать создания нового объекта при каждом рендере
  const formData = useMemo(() => {
    return { ...form.state.values, ...multiSelectValues }
  }, [form.state.values, multiSelectValues])

  return {
    form,
    formData,

    // Состояния показа опций селектов
    showOptions,

    // Рефы
    refs,

    // Функции
    resetFilters,
    closeAllSelects,
    getActiveFiltersCount,

    // Универсальные обработчики
    handleSelectToggle,
    handleSelectChange,
    handleRangeChange,
    handleRangeMinChange,
    handleRangeMaxChange,
    handleRangeInputChange,
    handleMultiSelect,
    handleApartmentsSelect,
    handlePropertyTypeSelect,
    handleMetroTransportTypeSelect,
  }
}
