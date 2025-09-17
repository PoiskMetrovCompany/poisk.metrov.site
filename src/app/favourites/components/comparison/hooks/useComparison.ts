import type { Swiper as SwiperType } from "swiper"

import { useRef, useState } from "react"

import { useAuthState } from "@/hooks/useAuthState"
import { IFavouriteView } from "@/types/Favourites"
import {
  ComparisonResponse,
  getTypedComparisonData,
} from "@/types/api/comparison"
import { useApiQuery } from "@/utils/hooks/use-api"

/**
 * Хук для управления состоянием слайдера сравнения
 */
export const useComparisonSlider = () => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
    setActiveSlideIndex(swiper.activeIndex)
  }

  const handlePrevClick = () => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.slidePrev()
    }
  }

  const handleNextClick = () => {
    if (swiperRef.current && !isEnd) {
      swiperRef.current.slideNext()
    }
  }

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  // Функция для обновления состояния слайдера
  const updateSliderState = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning)
      setIsEnd(swiperRef.current.isEnd)
    }
  }

  return {
    isBeginning,
    isEnd,
    activeSlideIndex,
    swiperRef,
    handleSlideChange,
    handlePrevClick,
    handleNextClick,
    handleSwiperInit,
    updateSliderState,
  }
}

/**
 * Хук для получения данных сравнения
 */
export const useComparisonData = (selectedView: IFavouriteView) => {
  // Получаем user key из состояния авторизации
  const { user } = useAuthState()
  const USER_KEY = user?.key || ""

  // Определяем тип сравнения на основе выбранной вкладки
  const typeComparison =
    selectedView === "complexes" ? "ResidentialComplexes" : "Apartments"

  // Запрос данных сравнения с правильной типизацией
  const { data: comparisonData } = useApiQuery<ComparisonResponse>(
    ["comparison", typeComparison, USER_KEY],
    `/comparison?user_key=${USER_KEY}&type_comparison=${typeComparison}`,
    {
      enabled: !!USER_KEY, // Запрос выполняется только если есть USER_KEY
      staleTime: 10 * 60 * 1000, // 10 минут
      gcTime: 30 * 60 * 1000, // 30 минут для garbage collection
      retry: 2,
      refetchOnWindowFocus: false, // Отключаем рефетч при фокусе окна
      refetchOnMount: false, // Отключаем рефетч при монтировании
      refetchInterval: 9 * 60 * 1000, // Перезапрашиваем каждые 9 минут
      refetchIntervalInBackground: false, // Не перезапрашиваем в фоне
    }
  )

  // Получаем типизированные данные
  const typedData = comparisonData
    ? getTypedComparisonData(comparisonData)
    : null

  return {
    comparisonData: comparisonData || undefined,
    typedData,
    typeComparison,
  }
}

/**
 * Хук для получения всех данных сравнения (квартиры + комплексы)
 */
export const useAllComparisonData = () => {
  // Получаем user key из состояния авторизации
  const { user } = useAuthState()
  const USER_KEY = user?.key || ""

  // Запрос данных сравнения квартир
  const { data: apartmentsData, isLoading: isLoadingApartments } =
    useApiQuery<ComparisonResponse>(
      ["comparison", "Apartments", USER_KEY],
      `/comparison?user_key=${USER_KEY}&type_comparison=Apartments`,
      {
        enabled: !!USER_KEY, // Запрос выполняется только если есть USER_KEY
        staleTime: 10 * 60 * 1000, // 10 минут
        gcTime: 30 * 60 * 1000, // 30 минут для garbage collection
        retry: 2,
        refetchOnWindowFocus: false, // Отключаем рефетч при фокусе окна
        refetchOnMount: false, // Отключаем рефетч при монтировании
        refetchInterval: 9 * 60 * 1000, // Перезапрашиваем каждые 9 минут
        refetchIntervalInBackground: false, // Не перезапрашиваем в фоне
      }
    )

  // Запрос данных сравнения комплексов
  const { data: complexesData, isLoading: isLoadingComplexes } =
    useApiQuery<ComparisonResponse>(
      ["comparison", "ResidentialComplexes", USER_KEY],
      `/comparison?user_key=${USER_KEY}&type_comparison=ResidentialComplexes`,
      {
        enabled: !!USER_KEY, // Запрос выполняется только если есть USER_KEY
        staleTime: 10 * 60 * 1000, // 10 минут
        gcTime: 30 * 60 * 1000, // 30 минут для garbage collection
        retry: 2,
        refetchOnWindowFocus: false, // Отключаем рефетч при фокусе окна
        refetchOnMount: false, // Отключаем рефетч при монтировании
        refetchInterval: 9 * 60 * 1000, // Перезапрашиваем каждые 9 минут
        refetchIntervalInBackground: false, // Не перезапрашиваем в фоне
      }
    )

  // Получаем типизированные данные
  const apartmentsTypedData = apartmentsData
    ? getTypedComparisonData(apartmentsData)
    : null
  const complexesTypedData = complexesData
    ? getTypedComparisonData(complexesData)
    : null

  return {
    apartmentsData: apartmentsData || undefined,
    complexesData: complexesData || undefined,
    apartmentsTypedData,
    complexesTypedData,
    isLoadingApartments,
    isLoadingComplexes,
  }
}
