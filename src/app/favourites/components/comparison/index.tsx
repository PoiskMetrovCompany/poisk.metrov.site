import clsx from "clsx"

import React, { useState } from "react"

import ComparisonSkeleton from "@/components/ComparisonCards/comparisonSkeleton"
import NotFound from "@/components/notFound"
import { IFavouriteView } from "@/types/Favourites"

import styles from "./comparison.module.scss"

import { ComparisonHeader, ComparisonSlider } from "./components"
import { useComparisonData, useComparisonSlider } from "./hooks"

interface IComparisonProps {
  selectedView: IFavouriteView
  setIsComparison: (isComparison: boolean) => void
}

const Comparison: React.FC<IComparisonProps> = ({
  selectedView,
  setIsComparison,
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
  } = useComparisonSlider()

  const { comparisonData, typedData } = useComparisonData(selectedView)

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

  // Показываем NotFound если данных нет
  if (typedData.data.attributes.length === 0) {
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
