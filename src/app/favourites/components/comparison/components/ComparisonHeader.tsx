import React from "react"

import styles from "../comparison.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import IconButton from "@/components/ui/buttons/IconButton"
import SwitchComponent from "@/components/ui/switch"

interface IComparisonHeaderProps {
  isOnlyDifferences: boolean
  setIsOnlyDifferences: (value: boolean) => void
  isBeginning: boolean
  isEnd: boolean
  onBackClick: () => void
  onPrevClick: () => void
  onNextClick: () => void
}

const ComparisonHeader: React.FC<IComparisonHeaderProps> = ({
  isOnlyDifferences,
  setIsOnlyDifferences,
  isBeginning,
  isEnd,
  onBackClick,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className={styles.comparison__header}>
      <ActionButton
        className={styles.comparison__header__button}
        type="outline-white"
        onClick={onBackClick}
      >
        <IconImage
          iconLink="/images/icons/arrow-left-dark.svg"
          alt="arrow-left"
          className={styles.comparison__header__button__icon}
        />
        Вернуться в избранное
      </ActionButton>
      <div className={styles.comparison__header__actions}>
        <SwitchComponent
          id="comparison-switch"
          label="Только различия"
          checked={isOnlyDifferences}
          onCheckedChange={setIsOnlyDifferences}
        />
        <div className={styles.comparison__header__actions__buttons}>
          <IconButton
            iconLink="/images/icons/arrow-slider.svg"
            alt="prev"
            className={styles.comparison__header__actions__buttons__prev}
            onClick={onPrevClick}
            disabled={isBeginning}
          />
          <IconButton
            iconLink="/images/icons/arrow-slider.svg"
            alt="next"
            className={styles.comparison__header__actions__buttons__next}
            onClick={onNextClick}
            disabled={isEnd}
          />
        </div>
      </div>
    </div>
  )
}

export default ComparisonHeader
