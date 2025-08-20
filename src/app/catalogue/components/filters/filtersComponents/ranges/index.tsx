import React, { FC } from "react"
import styles from "./ranges.module.scss"
import Range from "@/components/ui/inputs/range"
import RangeInput from "../../rangeInput"

interface FilterRangesProps {
  // Данные формы для ranges
  formData: {
    priceMin: number
    priceMax: number
    floorMin: number
    floorMax: number
    flatAreaMin: number
    flatAreaMax: number
    kitchenAreaMin: number
    kitchenAreaMax: number
  }

  // Обработчик изменения ranges
  handleRangeChange: (
    field: "price" | "floor" | "flatArea" | "kitchenArea",
    range: [number, number]
  ) => void
}

const FilterRanges: FC<FilterRangesProps> = ({
  formData,
  handleRangeChange,
}) => {
  const rangeConfigs = [
    {
      field: "price",
      title: "Стоимость, млн ₽",
      min: 4,
      max: 15,
      step: 1,
      value: [formData.priceMin, formData.priceMax],
      formatLabel: (value: number) => `${value}`,
    },
    {
      field: "floor",
      title: "Этаж",
      min: 1,
      max: 30,
      step: 1,
      value: [formData.floorMin, formData.floorMax],
      formatLabel: (value: number) => `${value}`,
    },
    {
      field: "flatArea",
      title: "Площадь квартиры, м²",
      min: 20,
      max: 200,
      step: 5,
      value: [formData.flatAreaMin, formData.flatAreaMax],
      formatLabel: (value: number) => `${value}м²`,
    },
    {
      field: "kitchenArea",
      title: "Площадь кухни, м²",
      min: 5,
      max: 30,
      step: 1,
      value: [formData.kitchenAreaMin, formData.kitchenAreaMax],
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
                value={value as [number, number]}
                onValueChange={(range) =>
                  handleRangeChange(
                    field as "price" | "floor" | "flatArea" | "kitchenArea",
                    range as [number, number]
                  )
                }
                // fromValue={"0"}
                // setFromValue={() => {}}
                // toValue={"0"}
                // setToValue={() => {}}
              />
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default FilterRanges
