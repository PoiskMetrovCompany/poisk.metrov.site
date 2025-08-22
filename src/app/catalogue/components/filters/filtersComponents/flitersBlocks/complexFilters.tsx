import React, { FC } from "react"
import styles from "./filterBlocks.module.scss"
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
import Heading3 from "@/components/ui/heading3"

interface ComplexFiltersProps {
  formData: {
    buildingType: string[]
    builder: string[]
    completionDate: string[]
    metroDistance: string[]
    metroTransportType: string
    elevator: string[]
    floorsInBuildingMin: number | null
    floorsInBuildingMax: number | null
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
  handleMetroTransportTypeSelect: (transportType: string) => void
  handleRangeInputChange: (
    field: "floorsInBuilding",
    range: [number | null, number | null]
  ) => void
}

const ComplexFilters: FC<ComplexFiltersProps> = ({
  formData,
  handleMultiSelect,
  handleMetroTransportTypeSelect,
  handleRangeInputChange,
}) => {
  return (
    <div className={styles.filterBlock}>
      <div className={styles.filterBlock__title}>
        <Heading3 className={styles.filterBlock__title__heading}>
          Жилой комплекс
        </Heading3>
      </div>

      {/* Тип дома */}
      <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>Тип дома</div>
        <div className={styles.filterBlock__section__options}>
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
      <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>Застройщик</div>
        <div className={styles.filterBlock__section__options}>
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
      <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>Срок сдачи</div>
        <div className={styles.filterBlock__section__options}>
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
      <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>До метро</div>
        <div className={styles.filterBlock__section__metro}>
          <div className={styles.filterBlock__section__options}>
            {METRO_DISTANCE_OPTIONS.map((option) => (
              <FiltersButton
                key={option}
                text={option}
                isActive={formData.metroDistance.includes(option)}
                onClick={() => handleMultiSelect("metroDistance", option)}
              />
            ))}
          </div>
          <div className={styles.filterBlock__section__metro__transportOptions}>
            <FiltersButton
              text="Пешком"
              iconLink="/images/icons/walk.svg"
              isActive={formData.metroTransportType === "Пешком"}
              onClick={() => handleMetroTransportTypeSelect("Пешком")}
              className={
                styles.filterBlock__section__metro__transportOptions__button
              }
            />
            <FiltersButton
              text="Транспортом"
              iconLink="/images/icons/car-dark.svg"
              isActive={formData.metroTransportType === "Транспортом"}
              onClick={() => handleMetroTransportTypeSelect("Транспортом")}
              className={
                styles.filterBlock__section__metro__transportOptions__button
              }
            />
          </div>
        </div>
      </div>

      {/* Лифт */}
      <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>Лифт</div>
        <div className={styles.filterBlock__section__options}>
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
      <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>Этажей в доме</div>
        <div className={styles.filterBlock__section__range}>
          <RangeInput
            value={[formData.floorsInBuildingMin, formData.floorsInBuildingMax]}
            onValueChange={(range) =>
              handleRangeInputChange("floorsInBuilding", range)
            }
            unit=""
          />
        </div>
      </div>

      {/* Парковка */}
      <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>Парковка</div>
        <div className={styles.filterBlock__section__options}>
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
      <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>Безопасность</div>
        <div className={styles.filterBlock__section__options}>
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
