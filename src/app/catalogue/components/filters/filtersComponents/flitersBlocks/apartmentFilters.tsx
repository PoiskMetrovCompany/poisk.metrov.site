import clsx from "clsx"

import React, { FC, memo, useMemo } from "react"

import { useFiltersStore } from "@/stores/useFiltersStore"

import styles from "./filterBlocks.module.scss"

import {
  APARTMENTS_OPTIONS,
  BATHROOM_OPTIONS,
  FEATURES_OPTIONS,
  FINISH_OPTIONS,
  FLOOR_OPTIONS,
  LAYOUT_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  ROOMS_OPTIONS,
} from "../../types"
import RangeInput from "../rangeInput"

import IconImage from "@/components/ui/IconImage"
import FiltersButton from "@/components/ui/buttons/FiltersButton"
import Heading3 from "@/components/ui/heading3"

interface ApartmentFiltersProps {
  formData: {
    propertyType: string
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
  haveToSelectType?: boolean
  showApartmentTypeSelection?: boolean
  setShowApartmentTypeSelection?: (show: boolean) => void
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
  handleSingleSelect: (
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
  handlePropertyTypeSelect: (propertyType: string) => void
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
    haveToSelectType = false,
    showApartmentTypeSelection = false,
    setShowApartmentTypeSelection,
    handleMultiSelect,
    handleSingleSelect,
    handlePropertyTypeSelect,
    handleApartmentsSelect,
    handleRangeInputChange,
    onCloseDialog,
  }) => {
    const { filtersData } = useFiltersStore()

    const ceilingHeightOptions = ["От 2,5 м", "От 2,7 м", "От 3 м", "От 4 м"]

    // Используем данные из store для всех операций
    const activeFormData = filtersData

    // Мемоизируем значения для RangeInput, чтобы избежать создания новых массивов при каждом рендере
    const priceRange = useMemo(
      () =>
        [filtersData.priceMin, filtersData.priceMax] as [
          number | null,
          number | null,
        ],
      [filtersData.priceMin, filtersData.priceMax]
    )
    const floorRange = useMemo(
      () =>
        [filtersData.floorMin, filtersData.floorMax] as [
          number | null,
          number | null,
        ],
      [filtersData.floorMin, filtersData.floorMax]
    )
    const flatAreaRange = useMemo(
      () =>
        [filtersData.flatAreaMin, filtersData.flatAreaMax] as [
          number | null,
          number | null,
        ],
      [filtersData.flatAreaMin, filtersData.flatAreaMax]
    )
    const livingAreaRange = useMemo(
      () =>
        [filtersData.livingAreaMin, filtersData.livingAreaMax] as [
          number | null,
          number | null,
        ],
      [filtersData.livingAreaMin, filtersData.livingAreaMax]
    )

    const handleBackClick = () => {
      if (setShowApartmentTypeSelection) {
        setShowApartmentTypeSelection(false)
      }
    }

    const handleSelectApartmentClick = () => {
      if (setShowApartmentTypeSelection) {
        setShowApartmentTypeSelection(true)
      }
    }

    return (
      <div className={styles.filterBlock}>
        <div className={styles.filterBlock__title}>
          <Heading3 className={styles.filterBlock__title__heading}>
            {showApartmentTypeSelection && (
              <button
                onClick={handleBackClick}
                className={styles.filterBlock__title__back}
              >
                <IconImage
                  iconLink="/images/icons/arrow-right-orange.svg"
                  alt="назад"
                  className={styles.filterBlock__title__back__icon}
                />
              </button>
            )}
            {showApartmentTypeSelection ? "Тип жилья" : "Квартира"}
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

        {/* Тип жилья */}
        {haveToSelectType && showApartmentTypeSelection && (
          <div className={styles.filterBlock__sectionType__wrapper}>
            {PROPERTY_TYPE_OPTIONS.map((type) => (
              <label
                key={type}
                className={styles.filterBlock__sectionType__item}
                role="option"
                aria-selected={filtersData.propertyType === type}
              >
                <div
                  className={styles.filterBlock__sectionType__checkboxWrapper}
                >
                  <input
                    type="checkbox"
                    checked={filtersData.propertyType === type}
                    onChange={() => handlePropertyTypeSelect(type)}
                    className={styles.filterBlock__sectionType__checkbox}
                    aria-label={`Выбрать ${type}`}
                  />
                  {filtersData.propertyType === type && (
                    <IconImage
                      className={styles.filterBlock__sectionType__checkboxIcon}
                      iconLink="/images/icons/checkMark-white.svg"
                      alt="check"
                    />
                  )}
                </div>
                <span className={styles.filterBlock__sectionType__item__label}>
                  {type}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* Кнопка "Выбрать квартиру" */}
        {showApartmentTypeSelection && (
          <div className={styles.filterBlock__section}>
            <div className={styles.filterBlock__section__label}>Тип жилья</div>
            <div
              className={styles.filterBlock__section__type}
              onClick={handleSelectApartmentClick}
            >
              <span>{filtersData.propertyType}</span>
              <IconImage
                iconLink="/images/icons/arrow-down-black.svg"
                alt="Выберите"
                className={styles.filterBlock__section__type__icon}
              />
            </div>

            {/* <div className={styles.filterBlock__section__options}> */}
            {/* {ROOMS_OPTIONS.map((option) => (
                                  <FiltersButton
                    key={option}
                    text={option}
                    isActive={filtersData.rooms.includes(option)}
                    onClick={() => handleMultiSelect("rooms", option)}
                  />
              ))} */}
            {/* </div> */}
          </div>
        )}

        {/* Остальные фильтры показываются только если не выбран тип жилья */}
        {!showApartmentTypeSelection && (
          <>
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
                    isActive={filtersData.rooms.includes(option)}
                    onClick={() => handleSingleSelect("rooms", option)}
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
                  onValueChange={(range) =>
                    handleRangeInputChange("price", range)
                  }
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
                  onValueChange={(range) =>
                    handleRangeInputChange("floor", range)
                  }
                  unit=""
                />
                {/* <div
                  className={styles.filterBlock__section__optionsRange__options}
                >
                  {FLOOR_OPTIONS.map((option) => (
                    <FiltersButton
                      key={option}
                      text={option}
                      isActive={filtersData.floorOptions.includes(option)}
                      onClick={() => handleMultiSelect("floorOptions", option)}
                    />
                  ))}
                </div> */}
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
                    isActive={filtersData.ceilingHeight.includes(option)}
                    onClick={() => handleSingleSelect("ceilingHeight", option)}
                  />
                ))}
              </div>
            </div>

            {/* Планировка */}
            <div className={styles.filterBlock__section}>
              <div className={styles.filterBlock__section__label}>
                Планировка
              </div>
              <div className={styles.filterBlock__section__options}>
                {LAYOUT_OPTIONS.map((option) => (
                  <FiltersButton
                    key={option}
                    text={option}
                    isActive={filtersData.layout.includes(option)}
                    onClick={() => handleSingleSelect("layout", option)}
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
                    isActive={filtersData.finish.includes(option)}
                    onClick={() => handleSingleSelect("finish", option)}
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
                    isActive={filtersData.bathroom.includes(option)}
                    onClick={() => handleSingleSelect("bathroom", option)}
                  />
                ))}
              </div>
            </div>

            {/* Апартаменты */}
            <div className={styles.filterBlock__section}>
              <div className={styles.filterBlock__section__label}>
                Апартаменты
              </div>
              <div className={styles.filterBlock__section__options}>
                {APARTMENTS_OPTIONS.map((option) => (
                  <FiltersButton
                    key={option}
                    text={option}
                    isActive={filtersData.apartments === option}
                    onClick={() => handleApartmentsSelect(option)}
                  />
                ))}
              </div>
            </div>

            {/* Особенности */}
            <div className={styles.filterBlock__section}>
              <div className={styles.filterBlock__section__label}>
                Особенности
              </div>
              <div className={styles.filterBlock__section__options}>
                {FEATURES_OPTIONS.map((option) => (
                  <FiltersButton
                    key={option}
                    text={option}
                    isActive={filtersData.features.includes(option)}
                    onClick={() => handleSingleSelect("features", option)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
)

ApartmentFilters.displayName = "ApartmentFilters"

export default ApartmentFilters
