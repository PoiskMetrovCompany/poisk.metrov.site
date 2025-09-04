import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"

export interface FiltersState {
  // Состояние фильтров
  filtersData: FiltersFormData
  selectedPropertyType: string

  // Действия
  setFiltersData: (data: FiltersFormData) => void
  setSelectedPropertyType: (type: string) => void

  // Функции для обновления отдельных полей
  updatePriceRange: (range: [number | null, number | null]) => void
  updateRoomCount: (room: string) => void
  updateSearchQuery: (query: string) => void

  // Сброс фильтров
  resetFilters: () => void
}

const initialFiltersData: FiltersFormData = {
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
}

export const useFiltersStore = create<FiltersState>()(
  devtools(
    (set, get) => ({
      // Начальное состояние
      filtersData: initialFiltersData,
      selectedPropertyType: "Жилой комплекс",

      // Действия
      setFiltersData: (data) => set({ filtersData: data }),

      setSelectedPropertyType: (type) => set({ selectedPropertyType: type }),

      // Функции для обновления отдельных полей
      updatePriceRange: (range) => {
        set((state) => ({
          filtersData: {
            ...state.filtersData,
            priceMin: range[0],
            priceMax: range[1],
          },
        }))
      },

      updateRoomCount: (room) => {
        set((state) => ({
          filtersData: {
            ...state.filtersData,
            rooms: room ? [room] : [],
          },
        }))
      },

      updateSearchQuery: (query) => {
        set((state) => ({
          filtersData: {
            ...state.filtersData,
            district: query, // Используем district для поискового запроса
          },
        }))
      },

      // Сброс фильтров
      resetFilters: () =>
        set({
          filtersData: initialFiltersData,
          selectedPropertyType: "Жилой комплекс",
        }),
    }),
    {
      name: "filters-store",
    }
  )
)
