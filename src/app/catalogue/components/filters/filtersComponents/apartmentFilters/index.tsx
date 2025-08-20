import React, { FC, memo } from "react"
import styles from "./apartmentFilters.module.scss"
import FiltersButton from "@/components/ui/buttons/FiltersButton"
import RangeInput from "../../rangeInput"
import {
  ROOMS_OPTIONS,
  FLOOR_OPTIONS,
  LAYOUT_OPTIONS,
  FINISH_OPTIONS,
  BATHROOM_OPTIONS,
  APARTMENTS_OPTIONS,
  FEATURES_OPTIONS,
} from "../../types"

interface ApartmentFiltersProps {
  formData: {
    rooms: string[]
    priceMin: number
    priceMax: number
    floorMin: number
    floorMax: number
    floorOptions: string[]
    flatAreaMin: number
    flatAreaMax: number
    livingAreaMin: number
    livingAreaMax: number
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
  handleRangeChange: (
    field: "price" | "floor" | "flatArea" | "livingArea",
    range: [number, number]
  ) => void
}

const ApartmentFilters: FC<ApartmentFiltersProps> = memo(
  ({
    formData,
    handleMultiSelect,
    handleApartmentsSelect,
    handleRangeChange,
  }) => {
    const ceilingHeightOptions = ["От 2,5 м", "От 2,7 м", "От 3 м", "От 4 м"]

    return (
      <div className={styles.apartmentFilters}>
        <div className={styles.apartmentFilters__title}>Квартира</div>

        {/* Количество комнат */}
        <div className={styles.apartmentFilters__section}>
          <div className={styles.apartmentFilters__section__label}>
            Количество комнат
          </div>
          <div className={styles.apartmentFilters__section__options}>
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
        <div className={styles.apartmentFilters__section}>
          <div className={styles.apartmentFilters__section__label}>Цена</div>
          <div className={styles.apartmentFilters__section__range}>
            <RangeInput
              value={[formData.priceMin, formData.priceMax]}
              onValueChange={(range) => handleRangeChange("price", range)}
              unit="₽"
            />
          </div>
        </div>

        {/* Этаж */}
        <div className={styles.apartmentFilters__section}>
          <div className={styles.apartmentFilters__section__label}>Этаж</div>
          <div className={styles.apartmentFilters__section__range}>
            <RangeInput
              value={[formData.floorMin, formData.floorMax]}
              onValueChange={(range) => handleRangeChange("floor", range)}
            />
          </div>
          <div className={styles.apartmentFilters__section__options}>
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

        {/* Площадь общая */}
        <div className={styles.apartmentFilters__section}>
          <div className={styles.apartmentFilters__section__label}>
            Площадь общая
          </div>
          <div className={styles.apartmentFilters__section__range}>
            <RangeInput
              value={[formData.flatAreaMin, formData.flatAreaMax]}
              onValueChange={(range) => handleRangeChange("flatArea", range)}
              unit="м²"
            />
          </div>
        </div>

        {/* Площадь жилая */}
        <div className={styles.apartmentFilters__section}>
          <div className={styles.apartmentFilters__section__label}>
            Площадь жилая
          </div>
          <div className={styles.apartmentFilters__section__range}>
            <RangeInput
              value={[formData.livingAreaMin, formData.livingAreaMax]}
              onValueChange={(range) => handleRangeChange("livingArea", range)}
              unit="м²"
            />
          </div>
        </div>

        {/* Высота потолков */}
        <div className={styles.apartmentFilters__section}>
          <div className={styles.apartmentFilters__section__label}>
            Высота потолков
          </div>
          <div className={styles.apartmentFilters__section__options}>
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
        <div className={styles.apartmentFilters__section}>
          <div className={styles.apartmentFilters__section__label}>
            Планировка
          </div>
          <div className={styles.apartmentFilters__section__options}>
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
        <div className={styles.apartmentFilters__section}>
          <div className={styles.apartmentFilters__section__label}>Отделка</div>
          <div className={styles.apartmentFilters__section__options}>
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
        <div className={styles.apartmentFilters__section}>
          <div className={styles.apartmentFilters__section__label}>Санузел</div>
          <div className={styles.apartmentFilters__section__options}>
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
        <div className={styles.apartmentFilters__section}>
          <div className={styles.apartmentFilters__section__label}>
            Апартаменты
          </div>
          <div className={styles.apartmentFilters__section__options}>
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
        <div className={styles.apartmentFilters__section}>
          <div className={styles.apartmentFilters__section__label}>
            Особенности
          </div>
          <div className={styles.apartmentFilters__section__options}>
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
