import clsx from "clsx"

import React, { useState } from "react"

import ComparisonSkeleton from "@/components/ComparisonCards/comparisonSkeleton"
import NotFound from "@/components/notFound"
import { IFavouriteView } from "@/types/Favourites"

import styles from "./comparison.module.scss"

import { ComparisonHeader, ComparisonSlider } from "./components"
import {
  useAllComparisonData,
  useComparisonData,
  useComparisonSlider,
} from "./hooks"

interface IComparisonProps {
  selectedView: IFavouriteView
  setIsComparison: (isComparison: boolean) => void
  setComparisonFlatCount: (count: number) => void
  setComparisonComplexCount: (count: number) => void
  setIsLoadingComparisonFlats: (isLoading: boolean) => void
  setIsLoadingComparisonComplexes: (isLoading: boolean) => void
}

const Comparison: React.FC<IComparisonProps> = ({
  selectedView,
  setIsComparison,
  setComparisonFlatCount,
  setComparisonComplexCount,
  setIsLoadingComparisonFlats,
  setIsLoadingComparisonComplexes,
}) => {
  const [isOnlyDifferences, setIsOnlyDifferences] = useState(false)

  const {
    isBeginning,
    isEnd,
    activeSlideIndex,
    handleSlideChange,
    handlePrevClick,
    handleNextClick,
    handleSwiperInit,
    updateSliderState,
  } = useComparisonSlider()

  // Получаем все данные сравнения
  const {
    apartmentsTypedData,
    complexesTypedData,
    isLoadingApartments,
    isLoadingComplexes,
  } = useAllComparisonData()

  // Получаем данные для текущей вкладки
  const { comparisonData, typedData } = useComparisonData(selectedView)

  // Обновляем количество элементов в сравнении при изменении данных
  React.useEffect(() => {
    // Обновляем количество квартир
    if (apartmentsTypedData && apartmentsTypedData.type === "apartments") {
      setComparisonFlatCount(apartmentsTypedData.data.attributes.length)
    } else {
      setComparisonFlatCount(0)
    }

    // Обновляем количество комплексов
    if (complexesTypedData && complexesTypedData.type === "complexes") {
      setComparisonComplexCount(complexesTypedData.data.attributes.length)
    } else {
      setComparisonComplexCount(0)
    }
  }, [
    apartmentsTypedData,
    complexesTypedData,
    setComparisonFlatCount,
    setComparisonComplexCount,
  ])

  // Обновляем состояние слайдера при изменении данных
  React.useEffect(() => {
    if (typedData && typedData.data.attributes.length > 0) {
      // Небольшая задержка для корректного обновления состояния
      const timer = setTimeout(() => {
        updateSliderState()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [typedData, updateSliderState])

  // Обновляем состояния загрузки в родительском компоненте
  React.useEffect(() => {
    setIsLoadingComparisonFlats(isLoadingApartments)
  }, [isLoadingApartments, setIsLoadingComparisonFlats])

  React.useEffect(() => {
    setIsLoadingComparisonComplexes(isLoadingComplexes)
  }, [isLoadingComplexes, setIsLoadingComparisonComplexes])

  const handleBackClick = () => setIsComparison(false)

  // Показываем скелетон во время загрузки
  if (!comparisonData || !typedData) {
    return (
      <div className={styles.comparison}>
        <ComparisonHeader
          isOnlyDifferences={isOnlyDifferences}
          setIsOnlyDifferences={setIsOnlyDifferences}
          isBeginning={isBeginning}
          isEnd={isEnd}
          onBackClick={handleBackClick}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
        />
        <div className={styles.comparison__content}>
          <ComparisonSkeleton count={2} />
        </div>
      </div>
    )
  }

  // Показываем NotFound если данных нет или тип unknown
  if (
    !typedData ||
    typedData.type === "unknown" ||
    typedData.data.attributes.length === 0
  ) {
    return (
      <div className={styles.comparison}>
        <ComparisonHeader
          isOnlyDifferences={isOnlyDifferences}
          setIsOnlyDifferences={setIsOnlyDifferences}
          isBeginning={isBeginning}
          isEnd={isEnd}
          onBackClick={handleBackClick}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
        />
        <div
          className={clsx(
            styles.comparison__content,
            styles.comparison__content__notFound
          )}
        >
          <NotFound
            className={styles.comparison__content__notFound__block}
            title="Нет данных для сравнения"
            description="В выбранной категории нет объектов для сравнения."
            buttonText="Вернуться к избранному"
            onClick={handleBackClick}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.comparison}>
      <ComparisonHeader
        isOnlyDifferences={isOnlyDifferences}
        setIsOnlyDifferences={setIsOnlyDifferences}
        isBeginning={isBeginning}
        isEnd={isEnd}
        onBackClick={handleBackClick}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
      <ComparisonSlider
        selectedView={selectedView}
        comparisonData={comparisonData}
        activeSlideIndex={activeSlideIndex}
        onSwiperInit={handleSwiperInit}
        onSlideChange={handleSlideChange}
        isOnlyDifferences={isOnlyDifferences}
      />
    </div>
  )
}

export default Comparison
