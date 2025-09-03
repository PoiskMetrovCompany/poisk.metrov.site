import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"

interface FiltersContextType {
  filtersData: FiltersFormData
  setFiltersData: (data: FiltersFormData) => void
  selectedPropertyType: string
  setSelectedPropertyType: (type: string) => void
  // Функции для обновления отдельных полей
  updatePriceRange: (range: [number | null, number | null]) => void
  updateRoomCount: (room: string) => void
  updateSearchQuery: (query: string) => void
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

interface FiltersProviderProps {
  children: ReactNode
  onApplyFilters: (formData: FiltersFormData) => void
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({
  children,
  onApplyFilters,
}) => {
  const [filtersData, setFiltersData] = useState<FiltersFormData>({
    // Селекты
    district: "",
    builder: [],
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
    ceilingHeight: [],
    floorsInBuildingMin: null,
    floorsInBuildingMax: null,

    // Кнопки фильтров
    propertyType: "Жилой комплекс",
    rooms: [],
    floorOptions: [],
    layout: [],
    finish: [],
    bathroom: [],
    apartments: "",
    features: [],

    // Жилой комплекс
    buildingType: [],
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
  })

  const [selectedPropertyType, setSelectedPropertyType] =
    useState("Жилой комплекс")

  // Функции для обновления отдельных полей
  const updatePriceRange = useCallback(
    (range: [number | null, number | null]) => {
      setFiltersData((prev) => ({
        ...prev,
        priceMin: range[0],
        priceMax: range[1],
      }))
    },
    []
  )

  const updateRoomCount = useCallback((room: string) => {
    setFiltersData((prev) => ({
      ...prev,
      rooms: room ? [room] : [],
    }))
  }, [])

  const updateSearchQuery = useCallback((query: string) => {
    setFiltersData((prev) => ({
      ...prev,
      district: query, // Используем district для поискового запроса
    }))
  }, [])

  const applyFilters = () => {
    // Обновляем propertyType в filtersData перед отправкой
    const updatedFiltersData = {
      ...filtersData,
      propertyType: selectedPropertyType,
    }
    onApplyFilters(updatedFiltersData)
  }

  return (
    <FiltersContext.Provider
      value={{
        filtersData,
        setFiltersData,
        selectedPropertyType,
        setSelectedPropertyType,
        updatePriceRange,
        updateRoomCount,
        updateSearchQuery,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = () => {
  const context = useContext(FiltersContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider")
  }
  return context
}
