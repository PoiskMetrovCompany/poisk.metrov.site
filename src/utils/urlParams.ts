import { FiltersFormData } from "@/app/catalogue/components/filters/types"

// Функция для сериализации состояния фильтров в URL параметры
export const serializeFiltersToUrl = (
  filtersData: FiltersFormData,
  selectedPropertyType: string
): string => {
  const params = new URLSearchParams()

  // Добавляем тип недвижимости
  params.set("propertyType", selectedPropertyType)

  // Селекты
  if (filtersData.district) params.set("district", filtersData.district)
  if (filtersData.builder.length > 0)
    params.set("builder", filtersData.builder.join(","))
  if (filtersData.livingEstate)
    params.set("livingEstate", filtersData.livingEstate)
  if (filtersData.street) params.set("street", filtersData.street)
  if (filtersData.metro) params.set("metro", filtersData.metro)

  // Диапазоны
  if (filtersData.priceMin !== null)
    params.set("priceMin", filtersData.priceMin.toString())
  if (filtersData.priceMax !== null)
    params.set("priceMax", filtersData.priceMax.toString())
  if (filtersData.floorMin !== null)
    params.set("floorMin", filtersData.floorMin.toString())
  if (filtersData.floorMax !== null)
    params.set("floorMax", filtersData.floorMax.toString())
  if (filtersData.flatAreaMin !== null)
    params.set("flatAreaMin", filtersData.flatAreaMin.toString())
  if (filtersData.flatAreaMax !== null)
    params.set("flatAreaMax", filtersData.flatAreaMax.toString())
  if (filtersData.livingAreaMin !== null)
    params.set("livingAreaMin", filtersData.livingAreaMin.toString())
  if (filtersData.livingAreaMax !== null)
    params.set("livingAreaMax", filtersData.livingAreaMax.toString())
  if (filtersData.ceilingHeight.length > 0)
    params.set("ceilingHeight", filtersData.ceilingHeight.join(","))
  if (filtersData.floorsInBuildingMin !== null)
    params.set(
      "floorsInBuildingMin",
      filtersData.floorsInBuildingMin.toString()
    )
  if (filtersData.floorsInBuildingMax !== null)
    params.set(
      "floorsInBuildingMax",
      filtersData.floorsInBuildingMax.toString()
    )

  // Кнопки фильтров
  if (filtersData.propertyType)
    params.set("propertyType", filtersData.propertyType)
  if (filtersData.rooms.length > 0)
    params.set("rooms", filtersData.rooms.join(","))
  if (filtersData.floorOptions.length > 0)
    params.set("floorOptions", filtersData.floorOptions.join(","))
  if (filtersData.layout.length > 0)
    params.set("layout", filtersData.layout.join(","))
  if (filtersData.finish.length > 0)
    params.set("finish", filtersData.finish.join(","))
  if (filtersData.bathroom.length > 0)
    params.set("bathroom", filtersData.bathroom.join(","))
  if (filtersData.apartments) params.set("apartments", filtersData.apartments)
  if (filtersData.features.length > 0)
    params.set("features", filtersData.features.join(","))

  // Жилой комплекс
  if (filtersData.buildingType.length > 0)
    params.set("buildingType", filtersData.buildingType.join(","))
  if (filtersData.completionDate.length > 0)
    params.set("completionDate", filtersData.completionDate.join(","))
  if (filtersData.metroDistance.length > 0)
    params.set("metroDistance", filtersData.metroDistance.join(","))
  if (filtersData.metroTransportType)
    params.set("metroTransportType", filtersData.metroTransportType)
  if (filtersData.elevator.length > 0)
    params.set("elevator", filtersData.elevator.join(","))
  if (filtersData.parking.length > 0)
    params.set("parking", filtersData.parking.join(","))
  if (filtersData.security.length > 0)
    params.set("security", filtersData.security.join(","))

  // Покупка
  if (filtersData.paymentMethod.length > 0)
    params.set("paymentMethod", filtersData.paymentMethod.join(","))
  if (filtersData.mortgageType.length > 0)
    params.set("mortgageType", filtersData.mortgageType.join(","))
  if (filtersData.installmentPeriod.length > 0)
    params.set("installmentPeriod", filtersData.installmentPeriod.join(","))
  if (filtersData.downPayment.length > 0)
    params.set("downPayment", filtersData.downPayment.join(","))
  if (filtersData.mortgagePrograms.length > 0)
    params.set("mortgagePrograms", filtersData.mortgagePrograms.join(","))

  return params.toString()
}

// Функция для парсинга URL параметров в состояние фильтров
export const parseFiltersFromUrl = (
  searchParams: URLSearchParams
): { filtersData: Partial<FiltersFormData>; selectedPropertyType: string } => {
  const filtersData: Partial<FiltersFormData> = {}

  // Получаем тип недвижимости
  const selectedPropertyType =
    searchParams.get("propertyType") || "Жилой комплекс"

  // Селекты
  const district = searchParams.get("district")
  if (district) filtersData.district = district

  const builder = searchParams.get("builder")
  if (builder) filtersData.builder = builder.split(",")

  const livingEstate = searchParams.get("livingEstate")
  if (livingEstate) filtersData.livingEstate = livingEstate

  const street = searchParams.get("street")
  if (street) filtersData.street = street

  const metro = searchParams.get("metro")
  if (metro) filtersData.metro = metro

  // Диапазоны
  const priceMin = searchParams.get("priceMin")
  if (priceMin) filtersData.priceMin = parseInt(priceMin, 10)

  const priceMax = searchParams.get("priceMax")
  if (priceMax) filtersData.priceMax = parseInt(priceMax, 10)

  const floorMin = searchParams.get("floorMin")
  if (floorMin) filtersData.floorMin = parseInt(floorMin, 10)

  const floorMax = searchParams.get("floorMax")
  if (floorMax) filtersData.floorMax = parseInt(floorMax, 10)

  const flatAreaMin = searchParams.get("flatAreaMin")
  if (flatAreaMin) filtersData.flatAreaMin = parseInt(flatAreaMin, 10)

  const flatAreaMax = searchParams.get("flatAreaMax")
  if (flatAreaMax) filtersData.flatAreaMax = parseInt(flatAreaMax, 10)

  const livingAreaMin = searchParams.get("livingAreaMin")
  if (livingAreaMin) filtersData.livingAreaMin = parseInt(livingAreaMin, 10)

  const livingAreaMax = searchParams.get("livingAreaMax")
  if (livingAreaMax) filtersData.livingAreaMax = parseInt(livingAreaMax, 10)

  const ceilingHeight = searchParams.get("ceilingHeight")
  if (ceilingHeight) filtersData.ceilingHeight = ceilingHeight.split(",")

  const floorsInBuildingMin = searchParams.get("floorsInBuildingMin")
  if (floorsInBuildingMin)
    filtersData.floorsInBuildingMin = parseInt(floorsInBuildingMin, 10)

  const floorsInBuildingMax = searchParams.get("floorsInBuildingMax")
  if (floorsInBuildingMax)
    filtersData.floorsInBuildingMax = parseInt(floorsInBuildingMax, 10)

  // Кнопки фильтров
  const propertyType = searchParams.get("propertyType")
  if (propertyType) filtersData.propertyType = propertyType

  const rooms = searchParams.get("rooms")
  if (rooms) filtersData.rooms = rooms.split(",")

  const floorOptions = searchParams.get("floorOptions")
  if (floorOptions) filtersData.floorOptions = floorOptions.split(",")

  const layout = searchParams.get("layout")
  if (layout) filtersData.layout = layout.split(",")

  const finish = searchParams.get("finish")
  if (finish) filtersData.finish = finish.split(",")

  const bathroom = searchParams.get("bathroom")
  if (bathroom) filtersData.bathroom = bathroom.split(",")

  const apartments = searchParams.get("apartments")
  if (apartments) filtersData.apartments = apartments

  const features = searchParams.get("features")
  if (features) filtersData.features = features.split(",")

  // Жилой комплекс
  const buildingType = searchParams.get("buildingType")
  if (buildingType) filtersData.buildingType = buildingType.split(",")

  const completionDate = searchParams.get("completionDate")
  if (completionDate) filtersData.completionDate = completionDate.split(",")

  const metroDistance = searchParams.get("metroDistance")
  if (metroDistance) filtersData.metroDistance = metroDistance.split(",")

  const metroTransportType = searchParams.get("metroTransportType")
  if (metroTransportType) filtersData.metroTransportType = metroTransportType

  const elevator = searchParams.get("elevator")
  if (elevator) filtersData.elevator = elevator.split(",")

  const parking = searchParams.get("parking")
  if (parking) filtersData.parking = parking.split(",")

  const security = searchParams.get("security")
  if (security) filtersData.security = security.split(",")

  // Покупка
  const paymentMethod = searchParams.get("paymentMethod")
  if (paymentMethod) filtersData.paymentMethod = paymentMethod.split(",")

  const mortgageType = searchParams.get("mortgageType")
  if (mortgageType) filtersData.mortgageType = mortgageType.split(",")

  const installmentPeriod = searchParams.get("installmentPeriod")
  if (installmentPeriod)
    filtersData.installmentPeriod = installmentPeriod.split(",")

  const downPayment = searchParams.get("downPayment")
  if (downPayment) filtersData.downPayment = downPayment.split(",")

  const mortgagePrograms = searchParams.get("mortgagePrograms")
  if (mortgagePrograms)
    filtersData.mortgagePrograms = mortgagePrograms.split(",")

  return { filtersData, selectedPropertyType }
}

// Функция для обновления URL без перезагрузки страницы
export const updateUrlParams = (
  filtersData: FiltersFormData,
  selectedPropertyType: string
) => {
  if (typeof window === "undefined") {
    return
  }

  const serializedParams = serializeFiltersToUrl(
    filtersData,
    selectedPropertyType
  )

  // Проверяем, есть ли активные фильтры (кроме типа недвижимости)
  const params = new URLSearchParams(serializedParams)
  const hasActiveFilters = Array.from(params.keys()).some(
    (key) => key !== "propertyType" && params.get(key) && params.get(key) !== ""
  )

  const newUrl = hasActiveFilters
    ? `${window.location.pathname}?${serializedParams}`
    : window.location.pathname

  window.history.replaceState({}, "", newUrl)
}

// Функция для получения текущих параметров из URL
export const getCurrentUrlParams = (): URLSearchParams => {
  if (typeof window === "undefined") {
    return new URLSearchParams()
  }
  return new URLSearchParams(window.location.search)
}

// Функция для проверки наличия активных фильтров в URL
export const hasActiveFiltersInUrl = (): boolean => {
  const params = getCurrentUrlParams()
  // Проверяем наличие любых параметров фильтров (кроме propertyType)
  const filterParams = Array.from(params.keys()).filter(
    (key) => key !== "propertyType" && params.get(key) && params.get(key) !== ""
  )
  return filterParams.length > 0
}

// Функция для очистки URL от параметров фильтров
export const clearUrlParams = () => {
  if (typeof window === "undefined") {
    return
  }
  window.history.replaceState({}, "", window.location.pathname)
}
