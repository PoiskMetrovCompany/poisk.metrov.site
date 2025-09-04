import type { Swiper as SwiperType } from "swiper"

import { useRef, useState } from "react"

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
  // Определяем тип сравнения на основе выбранной вкладки
  const typeComparison =
    selectedView === "complexes" ? "ResidentialComplexes" : "Apartments"

  // Запрос данных сравнения с правильной типизацией
  const { data: comparisonData } = useApiQuery<ComparisonResponse>(
    ["comparison", typeComparison],
    `/comparison?user_key=06cf5002-83c2-11f0-a013-10f60a82b815&type_comparison=${typeComparison}`,
    // `/comparison?user_key=06cf32b1-83c2-11f0-a013-10f60a82b815&type_comparison=${typeComparison}`,
    {
      enabled: true,
      staleTime: 5 * 60 * 1000, // 5 минут
      retry: 2,
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
  // Запрос данных сравнения квартир
  const { data: apartmentsData } = useApiQuery<ComparisonResponse>(
    ["comparison", "Apartments"],
    `/comparison?user_key=06cf5002-83c2-11f0-a013-10f60a82b815&type_comparison=Apartments`,
    {
      enabled: true,
      staleTime: 5 * 60 * 1000, // 5 минут
      retry: 2,
    }
  )

  // Запрос данных сравнения комплексов
  const { data: complexesData } = useApiQuery<ComparisonResponse>(
    ["comparison", "ResidentialComplexes"],
    `/comparison?user_key=06cf32b1-83c2-11f0-a013-10f60a82b815&type_comparison=ResidentialComplexes`,
    {
      enabled: true,
      staleTime: 5 * 60 * 1000, // 5 минут
      retry: 2,
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
  }
}
