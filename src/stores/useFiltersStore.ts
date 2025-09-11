import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"
import {
  clearUrlParams,
  getCurrentUrlParams,
  parseFiltersFromUrl,
  updateUrlParams,
} from "@/utils/urlParams"

export interface FiltersState {
  // Состояние фильтров
  filtersData: FiltersFormData
  isLoadedFromUrl: boolean

  // Действия
  setFiltersData: (data: FiltersFormData) => void

  // Функции для обновления отдельных полей
  updatePriceRange: (range: [number | null, number | null]) => void
  updateRoomCount: (room: string) => void
  updateSearchQuery: (query: string) => void

  // Сброс фильтров
  resetFilters: () => void

  // Синхронизация с URL
  syncWithUrl: () => void
  updateUrlFromState: () => void
  loadFromUrl: () => void
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
      isLoadedFromUrl: false,

      // Действия
      setFiltersData: (data) => {
        set((state) => ({
          filtersData: {
            ...state.filtersData,
            ...data,
          },
        }))
        // Автоматически обновляем URL при изменении фильтров
        setTimeout(() => {
          const { filtersData } = get()
          updateUrlParams(filtersData, filtersData.propertyType)
        }, 0)
      },

      // Функции для обновления отдельных полей
      updatePriceRange: (range) => {
        set((state) => ({
          filtersData: {
            ...state.filtersData,
            priceMin: range[0],
            priceMax: range[1],
          },
        }))
        // Автоматически обновляем URL
        setTimeout(() => {
          const { filtersData } = get()
          updateUrlParams(filtersData, filtersData.propertyType)
        }, 0)
      },

      updateRoomCount: (room) => {
        set((state) => ({
          filtersData: {
            ...state.filtersData,
            rooms: room ? [room] : [],
          },
        }))
        // Автоматически обновляем URL
        setTimeout(() => {
          const { filtersData } = get()
          updateUrlParams(filtersData, filtersData.propertyType)
        }, 0)
      },

      updateSearchQuery: (query) => {
        set((state) => ({
          filtersData: {
            ...state.filtersData,
            district: query, // Используем district для поискового запроса
          },
        }))
        // Автоматически обновляем URL
        setTimeout(() => {
          const { filtersData } = get()
          updateUrlParams(filtersData, filtersData.propertyType)
        }, 0)
      },

      // Сброс фильтров
      resetFilters: () => {
        set({
          filtersData: initialFiltersData,
        })
        // Очищаем URL при сбросе фильтров
        setTimeout(() => {
          clearUrlParams()
        }, 0)
      },

      // Синхронизация с URL
      syncWithUrl: () => {
        const { filtersData } = get()
        updateUrlParams(filtersData, filtersData.propertyType)
      },

      updateUrlFromState: () => {
        const { filtersData } = get()
        updateUrlParams(filtersData, filtersData.propertyType)
      },

      loadFromUrl: () => {
        try {
          const urlParams = getCurrentUrlParams()
          const {
            filtersData: urlFiltersData,
            selectedPropertyType: urlPropertyType,
          } = parseFiltersFromUrl(urlParams)

          // Объединяем с начальными данными, чтобы заполнить недостающие поля
          const mergedFiltersData = {
            ...initialFiltersData,
            ...urlFiltersData,
            propertyType: urlPropertyType, // Используем propertyType из URL
          }

          set({
            filtersData: mergedFiltersData,
            isLoadedFromUrl: true,
          })
        } catch (error) {
          console.error("Ошибка при загрузке фильтров из URL:", error)
          // В случае ошибки устанавливаем начальные значения
          set({
            filtersData: initialFiltersData,
            isLoadedFromUrl: true,
          })
        }
      },
    }),
    {
      name: "filters-store",
    }
  )
)
