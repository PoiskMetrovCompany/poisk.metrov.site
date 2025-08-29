import clsx from "clsx"

import React, { FC, memo, useMemo } from "react"

import styles from "./filterBlocks.module.scss"

import RangeInput from "../../rangeInput"
import {
  APARTMENTS_OPTIONS,
  BATHROOM_OPTIONS,
  FEATURES_OPTIONS,
  FINISH_OPTIONS,
  FLOOR_OPTIONS,
  LAYOUT_OPTIONS,
  ROOMS_OPTIONS,
} from "../../types"

import IconImage from "@/components/ui/IconImage"
import FiltersButton from "@/components/ui/buttons/FiltersButton"
import Heading3 from "@/components/ui/heading3"

interface ApartmentFiltersProps {
  formData: {
    rooms: string[]
    priceMin: number | null
    priceMax: number | null
    floorMin: number | null
    floorMax: number | null
    floorOptions: string[]
    flatAreaMin: number | null
    flatAreaMax: number | null
    livingAreaMin: number | null
    livingAreaMax: number | null
    ceilingHeight: string[]
    layout: string[]
    finish: string[]
    bathroom: string[]
    apartments: string
    features: string[]
  }
  handleMultiSelect: (
    field:
      | "rooms"
      | "floorOptions"
      | "layout"
      | "finish"
      | "bathroom"
      | "features"
      | "ceilingHeight",
    value: string
  ) => void
  handleApartmentsSelect: (apartments: string) => void
  handleRangeInputChange: (
    field: "price" | "floor" | "flatArea" | "livingArea",
    range: [number | null, number | null]
  ) => void
  onCloseDialog: () => void
}

const ApartmentFilters: FC<ApartmentFiltersProps> = memo(
  ({
    formData,
    handleMultiSelect,
    handleApartmentsSelect,
    handleRangeInputChange,
    onCloseDialog,
  }) => {
    const ceilingHeightOptions = ["От 2,5 м", "От 2,7 м", "От 3 м", "От 4 м"]

    // Мемоизируем значения для RangeInput, чтобы избежать создания новых массивов при каждом рендере
    const priceRange = useMemo(
      () =>
        [formData.priceMin, formData.priceMax] as [
          number | null,
          number | null,
        ],
      [formData.priceMin, formData.priceMax]
    )
    const floorRange = useMemo(
      () =>
        [formData.floorMin, formData.floorMax] as [
          number | null,
          number | null,
        ],
      [formData.floorMin, formData.floorMax]
    )
    const flatAreaRange = useMemo(
      () =>
        [formData.flatAreaMin, formData.flatAreaMax] as [
          number | null,
          number | null,
        ],
      [formData.flatAreaMin, formData.flatAreaMax]
    )
    const livingAreaRange = useMemo(
      () =>
        [formData.livingAreaMin, formData.livingAreaMax] as [
          number | null,
          number | null,
        ],
      [formData.livingAreaMin, formData.livingAreaMax]
    )

    return (
      <div className={styles.filterBlock}>
        <div className={styles.filterBlock__title}>
          <Heading3 className={styles.filterBlock__title__heading}>
            Квартира
          </Heading3>
          <button
            onClick={onCloseDialog}
            className={styles.filterBlock__title__close}
          >
            <IconImage
              iconLink="/images/icons/close-popup.svg"
              alt="close"
              className={styles.filterBlock__title__close__icon}
            />
          </button>
        </div>

        {/* Количество комнат */}
        <div className={styles.filterBlock__section}>
          <div className={styles.filterBlock__section__label}>
            Количество комнат
          </div>

          <div className={styles.filterBlock__section__options}>
            {ROOMS_OPTIONS.map((option) => (
              <FiltersButton
                key={option}
                text={option}
                isActive={formData.rooms.includes(option)}
                onClick={() => handleMultiSelect("rooms", option)}
              />
            ))}
          </div>
        </div>

        {/* Цена */}
        <div className={styles.filterBlock__section}>
          <div className={styles.filterBlock__section__label}>Цена</div>
          <div className={styles.filterBlock__section__range}>
            <RangeInput
              value={priceRange}
              onValueChange={(range) => handleRangeInputChange("price", range)}
              unit="₽"
            />
          </div>
        </div>

        {/* Этаж */}
        <div
          className={clsx(
            styles.filterBlock__section,
            styles.filterBlock__section_start
          )}
        >
          <div className={styles.filterBlock__section__label}>Этаж</div>
          <div className={styles.filterBlock__section__optionsRange}>
            <RangeInput
              value={floorRange}
              onValueChange={(range) => handleRangeInputChange("floor", range)}
              unit=""
            />
            <div className={styles.filterBlock__section__optionsRange__options}>
              {FLOOR_OPTIONS.map((option) => (
                <FiltersButton
                  key={option}
                  text={option}
                  isActive={formData.floorOptions.includes(option)}
                  onClick={() => handleMultiSelect("floorOptions", option)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Площадь общая */}
        <div className={styles.filterBlock__section}>
          <div className={styles.filterBlock__section__label}>
            Площадь общая
          </div>
          <div className={styles.filterBlock__section__range}>
            <RangeInput
              value={flatAreaRange}
              onValueChange={(range) =>
                handleRangeInputChange("flatArea", range)
              }
              unit="м²"
            />
          </div>
        </div>

        {/* Площадь жилая */}
        <div className={styles.filterBlock__section}>
          <div className={styles.filterBlock__section__label}>
            Площадь жилая
          </div>
          <div className={styles.filterBlock__section__range}>
            <RangeInput
              value={livingAreaRange}
              onValueChange={(range) =>
                handleRangeInputChange("livingArea", range)
              }
              unit="м²"
            />
          </div>
        </div>

        {/* Высота потолков */}
        <div className={styles.filterBlock__section}>
          <div className={styles.filterBlock__section__label}>
            Высота потолков
          </div>
          <div className={styles.filterBlock__section__options}>
            {ceilingHeightOptions.map((option) => (
              <FiltersButton
                key={option}
                text={option}
                isActive={formData.ceilingHeight.includes(option)}
                onClick={() => handleMultiSelect("ceilingHeight", option)}
              />
            ))}
          </div>
        </div>

        {/* Планировка */}
        <div className={styles.filterBlock__section}>
          <div className={styles.filterBlock__section__label}>Планировка</div>
          <div className={styles.filterBlock__section__options}>
            {LAYOUT_OPTIONS.map((option) => (
              <FiltersButton
                key={option}
                text={option}
                isActive={formData.layout.includes(option)}
                onClick={() => handleMultiSelect("layout", option)}
              />
            ))}
          </div>
        </div>

        {/* Отделка */}
        <div className={styles.filterBlock__section}>
          <div className={styles.filterBlock__section__label}>Отделка</div>
          <div className={styles.filterBlock__section__options}>
            {FINISH_OPTIONS.map((option) => (
              <FiltersButton
                key={option}
                text={option}
                isActive={formData.finish.includes(option)}
                onClick={() => handleMultiSelect("finish", option)}
              />
            ))}
          </div>
        </div>

        {/* Санузел */}
        <div className={styles.filterBlock__section}>
          <div className={styles.filterBlock__section__label}>Санузел</div>
          <div className={styles.filterBlock__section__options}>
            {BATHROOM_OPTIONS.map((option) => (
              <FiltersButton
                key={option}
                text={option}
                isActive={formData.bathroom.includes(option)}
                onClick={() => handleMultiSelect("bathroom", option)}
              />
            ))}
          </div>
        </div>

        {/* Апартаменты */}
        <div className={styles.filterBlock__section}>
          <div className={styles.filterBlock__section__label}>Апартаменты</div>
          <div className={styles.filterBlock__section__options}>
            {APARTMENTS_OPTIONS.map((option) => (
              <FiltersButton
                key={option}
                text={option}
                isActive={formData.apartments === option}
                onClick={() => handleApartmentsSelect(option)}
              />
            ))}
          </div>
        </div>

        {/* Особенности */}
        <div className={styles.filterBlock__section}>
          <div className={styles.filterBlock__section__label}>Особенности</div>
          <div className={styles.filterBlock__section__options}>
            {FEATURES_OPTIONS.map((option) => (
              <FiltersButton
                key={option}
                text={option}
                isActive={formData.features.includes(option)}
                onClick={() => handleMultiSelect("features", option)}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
)

ApartmentFilters.displayName = "ApartmentFilters"

export default ApartmentFilters
