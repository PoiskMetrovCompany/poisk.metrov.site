import { useState, useRef, useEffect } from "react"

export interface FiltersFormData {
  district: string
  builder: string
  livingEstate: string
  street: string
  metro: string
  priceMin: number
  priceMax: number
  floorMax: number
  floorMin: number
  flatAreaMin: number
  flatAreaMax: number
  kitchenAreaMin: number
  kitchenAreaMax: number
  roomQuantity: string
  completitionDate: string
  finishingFlat: string
  bathroom: string
  paymentMethods: string
  metroDistance: string
  registration: string
  apartments: boolean
}

export const useFilters = () => {
  // Изначальные значения фильтров
  const initialFormData: FiltersFormData = {
    district: "",
    builder: "",
    livingEstate: "",
    street: "",
    metro: "",
    priceMin: 4,
    priceMax: 15,
    floorMax: 30,
    floorMin: 1,
    flatAreaMin: 20,
    flatAreaMax: 200,
    kitchenAreaMin: 5,
    kitchenAreaMax: 30,
    roomQuantity: "",
    completitionDate: "",
    finishingFlat: "",
    bathroom: "",
    paymentMethods: "",
    metroDistance: "",
    registration: "",
    apartments: true,
  }

  const [formData, setFormData] = useState<FiltersFormData>(initialFormData)

  const [showDistrictOptions, setShowDistrictOptions] = useState(false)
  const [showBuilderOptions, setShowBuilderOptions] = useState(false)
  const [showLivingEstateOptions, setShowLivingEstateOptions] = useState(false)
  const [showStreetOptions, setShowStreetOptions] = useState(false)
  const [showMetroOptions, setShowMetroOptions] = useState(false)

  // Изменяем состояния для кнопок фильтров - теперь почти все массивы для мультивыбора
  const [selectedCompletionDate, setSelectedCompletionDate] = useState<string[]>([])
  const [selectedBathroom, setSelectedBathroom] = useState<string[]>([])
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([])
  const [selectedMetroDistance, setSelectedMetroDistance] = useState<string[]>([])
  const [selectedRegistration, setSelectedRegistration] = useState<string[]>([])
  const [selectedApartments, setSelectedApartments] = useState<string>("") // Только этот остается строкой

  const districtRef = useRef<HTMLDivElement>(null)
  const builderRef = useRef<HTMLDivElement>(null)
  const livingEstateRef = useRef<HTMLDivElement>(null)
  const streetRef = useRef<HTMLDivElement>(null)
  const metroRef = useRef<HTMLDivElement>(null)

  // Опции для селектов
  const districtOptions = [
    "Калининский",
    "Ленинский",
    "Дзержинский",
    "Октябрьский",
    "Первомайский",
    "Советский",
    "Кировский",
    "Железнодорожный",
    "Центральный",
  ]

  const builderOptions = [
    "Брусника",
    "ПИК",
    "Самолет",
    "Эталон",
    "СК Лидер",
    "Сибпромстрой",
    "Стройинвест",
    "ГК МИЦ",
    "ДСК",
    "Капитал-строитель",
  ]

  const livingEstateOptions = [
    "Европейский берег",
    "Солнечная долина",
    "Зеленый парк",
    "Морской бриз",
    "Академгородок",
    "Золотая нива",
    "Родники",
    "Северный",
    "Матрешкин двор",
    "Закаменский",
  ]

  const streetOptions = [
    "ул. Красный проспект",
    "ул. Ленина",
    "ул. Димитрова",
    "ул. Станиславского",
    "ул. Фрунзе",
    "ул. Кирова",
    "ул. Немировича-Данченко",
    "ул. Декабристов",
    "ул. Ватутина",
    "ул. Большевистская",
  ]

  const metroOptions = [
    "Октябрьская",
    "Студенческая",
    "Речной вокзал",
    "Сибирская",
    "Маршала Покрышкина",
    "Березовая роща",
    "Золотая Нива",
    "Гагаринская",
    "Заельцовская",
    "Площадь Ленина",
  ]

  // Вспомогательные функции
  const closeAllSelects = () => {
    setShowDistrictOptions(false)
    setShowBuilderOptions(false)
    setShowLivingEstateOptions(false)
    setShowStreetOptions(false)
    setShowMetroOptions(false)
  }

  const resetFilters = () => {
    // Сброс основных данных формы
    setFormData(initialFormData)
    
    // Сброс состояний кнопок фильтров
    setSelectedCompletionDate([])
    setSelectedBathroom([])
    setSelectedPaymentMethods([])
    setSelectedMetroDistance([])
    setSelectedRegistration([])
    setSelectedApartments("")
    
    // Закрытие всех выпадающих списков
    closeAllSelects()
  }

  // Обработчики событий
  const handleInputChange = (field: keyof FiltersFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Обработчики для селектов с закрытием выпадающих списков
  const handleDistrictSelect = (value: string) => {
    handleInputChange("district", value)
    setShowDistrictOptions(false)
  }

  const handleBuilderSelect = (value: string) => {
    handleInputChange("builder", value)
    setShowBuilderOptions(false)
  }

  const handleLivingEstateSelect = (value: string) => {
    handleInputChange("livingEstate", value)
    setShowLivingEstateOptions(false)
  }

  const handleStreetSelect = (value: string) => {
    handleInputChange("street", value)
    setShowStreetOptions(false)
  }

  const handleMetroSelect = (value: string) => {
    handleInputChange("metro", value)
    setShowMetroOptions(false)
  }

  const handlePriceRangeChange = (range: [number, number]) => {
    setFormData((prev) => ({
      ...prev,
      priceMin: range[0],
      priceMax: range[1],
    }))
  }

  const handleFloorRangeChange = (range: [number, number]) => {
    setFormData((prev) => ({
      ...prev,
      floorMin: range[0],
      floorMax: range[1],
    }))
  }

  const handleFlatAreaRangeChange = (range: [number, number]) => {
    setFormData((prev) => ({
      ...prev,
      flatAreaMin: range[0],
      flatAreaMax: range[1],
    }))
  }

  const handleKitchenAreaRangeChange = (range: [number, number]) => {
    setFormData((prev) => ({
      ...prev,
      kitchenAreaMin: range[0],
      kitchenAreaMax: range[1],
    }))
  }

  const handleDistrictToggle = () => {
    closeAllSelects()
    setShowDistrictOptions(!showDistrictOptions)
  }

  const handleBuilderToggle = () => {
    closeAllSelects()
    setShowBuilderOptions(!showBuilderOptions)
  }

  const handleLivingEstateToggle = () => {
    closeAllSelects()
    setShowLivingEstateOptions(!showLivingEstateOptions)
  }

  const handleStreetToggle = () => {
    closeAllSelects()
    setShowStreetOptions(!showStreetOptions)
  }

  const handleMetroToggle = () => {
    closeAllSelects()
    setShowMetroOptions(!showMetroOptions)
  }

  // Обновленные обработчики для мультивыбора
  const handleCompletionDateSelect = (date: string) => {
    const newDates = selectedCompletionDate.includes(date)
      ? selectedCompletionDate.filter(d => d !== date)
      : [...selectedCompletionDate, date]
    setSelectedCompletionDate(newDates)
    setFormData(prev => ({ ...prev, completitionDate: newDates.join(", ") }))
  }

  const handleBathroomSelect = (bathroom: string) => {
    const newBathrooms = selectedBathroom.includes(bathroom)
      ? selectedBathroom.filter(b => b !== bathroom)
      : [...selectedBathroom, bathroom]
    setSelectedBathroom(newBathrooms)
    setFormData(prev => ({ ...prev, bathroom: newBathrooms.join(", ") }))
  }

  const handlePaymentMethodSelect = (method: string) => {
    const newMethods = selectedPaymentMethods.includes(method)
      ? selectedPaymentMethods.filter(m => m !== method)
      : [...selectedPaymentMethods, method]
    setSelectedPaymentMethods(newMethods)
    setFormData(prev => ({ ...prev, paymentMethods: newMethods.join(", ") }))
  }

  const handleMetroDistanceSelect = (distance: string) => {
    const newDistances = selectedMetroDistance.includes(distance)
      ? selectedMetroDistance.filter(d => d !== distance)
      : [...selectedMetroDistance, distance]
    setSelectedMetroDistance(newDistances)
    setFormData(prev => ({ ...prev, metroDistance: newDistances.join(", ") }))
  }

  const handleRegistrationSelect = (registration: string) => {
    const newRegistrations = selectedRegistration.includes(registration)
      ? selectedRegistration.filter(r => r !== registration)
      : [...selectedRegistration, registration]
    setSelectedRegistration(newRegistrations)
    setFormData(prev => ({ ...prev, registration: newRegistrations.join(", ") }))
  }

  // Только для апартаментов оставляем логику взаимоисключающего выбора
  const handleApartmentsSelect = (apartments: string) => {
    setSelectedApartments(selectedApartments === apartments ? "" : apartments)
    setFormData(prev => ({ 
      ...prev, 
      apartments: apartments === "Только апартаменты" ? true : apartments === "Исключить апартаменты" ? false : true
    }))
  }

  // Effect для закрытия селектов при клике вне их
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (
        districtRef.current &&
        !districtRef.current.contains(target) &&
        builderRef.current &&
        !builderRef.current.contains(target) &&
        livingEstateRef.current &&
        !livingEstateRef.current.contains(target) &&
        streetRef.current &&
        !streetRef.current.contains(target) &&
        metroRef.current &&
        !metroRef.current.contains(target)
      ) {
        closeAllSelects()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return {
    // Данные
    formData,
    initialFormData,
    
    // Состояния показа опций селектов
    showDistrictOptions,
    showBuilderOptions,
    showLivingEstateOptions,
    showStreetOptions,
    showMetroOptions,
    
    // Состояния выбранных кнопок фильтров
    selectedCompletionDate,
    selectedBathroom,
    selectedPaymentMethods,
    selectedMetroDistance,
    selectedRegistration,
    selectedApartments,
    
    // Рефы
    districtRef,
    builderRef,
    livingEstateRef,
    streetRef,
    metroRef,
    
    // Опции для селектов
    districtOptions,
    builderOptions,
    livingEstateOptions,
    streetOptions,
    metroOptions,
    
    // Функции
    resetFilters,
    closeAllSelects,
    
    // Обработчики
    handleInputChange,
    handleDistrictSelect,
    handleBuilderSelect,
    handleLivingEstateSelect,
    handleStreetSelect,
    handleMetroSelect,
    handlePriceRangeChange,
    handleFloorRangeChange,
    handleFlatAreaRangeChange,
    handleKitchenAreaRangeChange,
    handleDistrictToggle,
    handleBuilderToggle,
    handleLivingEstateToggle,
    handleStreetToggle,
    handleMetroToggle,
    handleCompletionDateSelect,
    handleBathroomSelect,
    handlePaymentMethodSelect,
    handleMetroDistanceSelect,
    handleRegistrationSelect,
    handleApartmentsSelect,
  }
}