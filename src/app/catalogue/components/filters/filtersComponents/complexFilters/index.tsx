import React, { FC } from "react"
import styles from "./complexFilters.module.scss"
import FiltersButton from "@/components/ui/buttons/FiltersButton"
import RangeInput from "../../rangeInput"
import {
  BUILDING_TYPE_OPTIONS,
  BUILDER_OPTIONS,
  COMPLETION_DATE_OPTIONS,
  METRO_DISTANCE_OPTIONS,
  ELEVATOR_OPTIONS,
  PARKING_OPTIONS,
  SECURITY_OPTIONS,
} from "../../types"

interface ComplexFiltersProps {
  formData: {
    buildingType: string[]
    builder: string[]
    completionDate: string[]
    metroDistance: string[]
    elevator: string[]
    floorsInBuildingMin: number
    floorsInBuildingMax: number
    parking: string[]
    security: string[]
  }
  handleMultiSelect: (
    field:
      | "buildingType"
      | "builder"
      | "completionDate"
      | "metroDistance"
      | "elevator"
      | "parking"
      | "security",
    value: string
  ) => void
  handleRangeChange: (
    field: "floorsInBuilding",
    range: [number, number]
  ) => void
}

const ComplexFilters: FC<ComplexFiltersProps> = ({
  formData,
  handleMultiSelect,
  handleRangeChange,
}) => {
  return (
    <div className={styles.complexFilters}>
      <div className={styles.complexFilters__title}>Жилой комплекс</div>

      {/* Тип дома */}
      <div className={styles.complexFilters__section}>
        <div className={styles.complexFilters__section__label}>Тип дома</div>
        <div className={styles.complexFilters__section__options}>
          {BUILDING_TYPE_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.buildingType.includes(option)}
              onClick={() => handleMultiSelect("buildingType", option)}
            />
          ))}
        </div>
      </div>

      {/* Застройщик */}
      <div className={styles.complexFilters__section}>
        <div className={styles.complexFilters__section__label}>Застройщик</div>
        <div className={styles.complexFilters__section__options}>
          {BUILDER_OPTIONS.map((option) => (
            <FiltersButton
              key={option.value}
              text={option.label}
              isActive={formData.builder.includes(option.value)}
              onClick={() => handleMultiSelect("builder", option.value)}
            />
          ))}
        </div>
      </div>

      {/* Срок сдачи */}
      <div className={styles.complexFilters__section}>
        <div className={styles.complexFilters__section__label}>Срок сдачи</div>
        <div className={styles.complexFilters__section__options}>
          {COMPLETION_DATE_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.completionDate.includes(option)}
              onClick={() => handleMultiSelect("completionDate", option)}
            />
          ))}
        </div>
      </div>

      {/* До метро */}
      <div className={styles.complexFilters__section}>
        <div className={styles.complexFilters__section__label}>До метро</div>
        <div className={styles.complexFilters__section__options}>
          {METRO_DISTANCE_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.metroDistance.includes(option)}
              onClick={() => handleMultiSelect("metroDistance", option)}
            />
          ))}
        </div>
        <div className={styles.complexFilters__section__transportOptions}>
          <FiltersButton text="Пешком" isActive={false} onClick={() => {}} />
          <FiltersButton
            text="Транспортом"
            isActive={false}
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Лифт */}
      <div className={styles.complexFilters__section}>
        <div className={styles.complexFilters__section__label}>Лифт</div>
        <div className={styles.complexFilters__section__options}>
          {ELEVATOR_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.elevator.includes(option)}
              onClick={() => handleMultiSelect("elevator", option)}
            />
          ))}
        </div>
      </div>

      {/* Этажей в доме */}
      <div className={styles.complexFilters__section}>
        <div className={styles.complexFilters__section__label}>
          Этажей в доме
        </div>
        <div className={styles.complexFilters__section__range}>
          <RangeInput
            value={[formData.floorsInBuildingMin, formData.floorsInBuildingMax]}
            onValueChange={(range) =>
              handleRangeChange("floorsInBuilding", range)
            }
          />
        </div>
      </div>

      {/* Парковка */}
      <div className={styles.complexFilters__section}>
        <div className={styles.complexFilters__section__label}>Парковка</div>
        <div className={styles.complexFilters__section__options}>
          {PARKING_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.parking.includes(option)}
              onClick={() => handleMultiSelect("parking", option)}
            />
          ))}
        </div>
      </div>

      {/* Безопасность */}
      <div className={styles.complexFilters__section}>
        <div className={styles.complexFilters__section__label}>
          Безопасность
        </div>
        <div className={styles.complexFilters__section__options}>
          {SECURITY_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.security.includes(option)}
              onClick={() => handleMultiSelect("security", option)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComplexFilters
