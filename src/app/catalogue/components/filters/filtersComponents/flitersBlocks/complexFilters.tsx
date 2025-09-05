import React, { FC, useMemo } from "react"

import styles from "./filterBlocks.module.scss"

import {
  BUILDER_OPTIONS,
  BUILDING_TYPE_OPTIONS,
  COMPLETION_DATE_OPTIONS,
  ELEVATOR_OPTIONS,
  METRO_DISTANCE_OPTIONS,
  PARKING_OPTIONS,
  SECURITY_OPTIONS,
} from "../../types"
import RangeInput from "../rangeInput"

import FiltersButton from "@/components/ui/buttons/FiltersButton"
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
  handleSingleSelect: (
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
  handleSingleSelect,
  handleMetroTransportTypeSelect,
  handleRangeInputChange,
}) => {
  // Мемоизируем значение для RangeInput, чтобы избежать создания нового массива при каждом рендере
  const floorsInBuildingRange = useMemo(
    () =>
      [formData.floorsInBuildingMin, formData.floorsInBuildingMax] as [
        number | null,
        number | null,
      ],
    [formData.floorsInBuildingMin, formData.floorsInBuildingMax]
  )

  return (
    <div className={styles.filterBlock}>
      <div className={styles.filterBlock__title}>
        <Heading3 className={styles.filterBlock__title__heading}>
          Жилой комплекс
        </Heading3>
      </div>

      {/* Тип дома */}
      {/* <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>Тип дома</div>
        <div className={styles.filterBlock__section__options}>
          {BUILDING_TYPE_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.buildingType.includes(option)}
              onClick={() => handleSingleSelect("buildingType", option)}
            />
          ))}
        </div>
      </div> */}

      {/* Застройщик */}
      <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>Застройщик</div>
        <div className={styles.filterBlock__section__options}>
          {BUILDER_OPTIONS.map((option) => (
            <FiltersButton
              key={option.value}
              text={option.label}
              isActive={formData.builder.includes(option.value)}
              onClick={() => handleSingleSelect("builder", option.value)}
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
              onClick={() => handleSingleSelect("completionDate", option)}
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
                onClick={() => handleSingleSelect("metroDistance", option)}
              />
            ))}
          </div>
          {/* <div className={styles.filterBlock__section__metro__transportOptions}>
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
          </div> */}
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
              onClick={() => handleSingleSelect("elevator", option)}
            />
          ))}
        </div>
      </div>

      {/* Этажей в доме */}
      <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>Этажей в доме</div>
        <div className={styles.filterBlock__section__range}>
          <RangeInput
            value={floorsInBuildingRange}
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
              onClick={() => handleSingleSelect("parking", option)}
            />
          ))}
        </div>
      </div>

      {/* Безопасность */}
      {/* <div className={styles.filterBlock__section}>
        <div className={styles.filterBlock__section__label}>Безопасность</div>
        <div className={styles.filterBlock__section__options}>
          {SECURITY_OPTIONS.map((option) => (
            <FiltersButton
              key={option}
              text={option}
              isActive={formData.security.includes(option)}
              onClick={() => handleSingleSelect("security", option)}
            />
          ))}
        </div>
      </div> */}
    </div>
  )
}

export default ComplexFilters
