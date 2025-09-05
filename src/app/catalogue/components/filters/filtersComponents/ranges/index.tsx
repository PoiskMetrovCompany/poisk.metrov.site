import React, { FC, useMemo } from "react"

import styles from "./ranges.module.scss"

import RangeInput from "../rangeInput"

import Range from "@/components/ui/inputs/range"

interface FilterRangesProps {
  // Данные формы для ranges
  formData: {
    priceMin: number | null
    priceMax: number | null
    floorMin: number | null
    floorMax: number | null
    flatAreaMin: number | null
    flatAreaMax: number | null
    kitchenAreaMin: number | null
    kitchenAreaMax: number | null
  }

  // Обработчик изменения ranges
  handleRangeInputChange: (
    field: "price" | "floor" | "flatArea" | "kitchenArea",
    range: [number | null, number | null]
  ) => void
}

const FilterRanges: FC<FilterRangesProps> = ({
  formData,
  handleRangeInputChange,
}) => {
  // Мемоизируем значения для RangeInput, чтобы избежать создания новых массивов при каждом рендере
  const priceRange = useMemo(
    () =>
      [formData.priceMin, formData.priceMax] as [number | null, number | null],
    [formData.priceMin, formData.priceMax]
  )
  const floorRange = useMemo(
    () =>
      [formData.floorMin, formData.floorMax] as [number | null, number | null],
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
  const kitchenAreaRange = useMemo(
    () =>
      [formData.kitchenAreaMin, formData.kitchenAreaMax] as [
        number | null,
        number | null,
      ],
    [formData.kitchenAreaMin, formData.kitchenAreaMax]
  )

  const rangeConfigs = [
    {
      field: "price",
      title: "Стоимость, млн ₽",
      min: 4,
      max: 15,
      step: 1,
      value: priceRange,
      formatLabel: (value: number) => `${value}`,
    },
    {
      field: "floor",
      title: "Этаж",
      min: 1,
      max: 30,
      step: 1,
      value: floorRange,
      formatLabel: (value: number) => `${value}`,
    },
    {
      field: "flatArea",
      title: "Площадь квартиры, м²",
      min: 20,
      max: 200,
      step: 5,
      value: flatAreaRange,
      formatLabel: (value: number) => `${value}м²`,
    },
    {
      field: "kitchenArea",
      title: "Площадь кухни, м²",
      min: 5,
      max: 30,
      step: 1,
      value: kitchenAreaRange,
      formatLabel: (value: number) => `${value}м²`,
    },
  ]

  return (
    <div className={styles.catalogue__filters__container__range}>
      {rangeConfigs.map(
        ({ field, title, min, max, step, value, formatLabel }) => (
          <div
            key={field}
            className={styles.catalogue__filters__container__range__filterRange}
          >
            <div
              className={
                styles.catalogue__filters__container__range__filterRange__header
              }
            >
              {title}
            </div>
            <div
              className={
                styles.catalogue__filters__container__range__filterRange__content
              }
            >
              <RangeInput
                value={value as [number | null, number | null]}
                onValueChange={(range) =>
                  handleRangeInputChange(
                    field as "price" | "floor" | "flatArea" | "kitchenArea",
                    range
                  )
                }
              />
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default FilterRanges
