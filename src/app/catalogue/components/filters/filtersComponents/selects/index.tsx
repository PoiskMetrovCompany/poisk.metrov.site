import React, { FC, RefObject } from "react"
import styles from "./selects.module.scss"
import CustomSelect from "@/components/ui/inputs/select/customSelect"
import {
  DISTRICT_OPTIONS,
  BUILDER_OPTIONS,
  LIVING_ESTATE_OPTIONS,
  STREET_OPTIONS,
  METRO_OPTIONS,
} from "../../types"

interface FilterSelectsProps {
  // Данные формы
  formData: {
    district: string
    builder: string
    livingEstate: string
    street: string
    metro: string
  }

  // Состояния показа опций селектов
  showOptions: Record<string, boolean>

  // Рефы
  refs: {
    district: RefObject<HTMLDivElement | null>
    builder: RefObject<HTMLDivElement | null>
    livingEstate: RefObject<HTMLDivElement | null>
    street: RefObject<HTMLDivElement | null>
    metro: RefObject<HTMLDivElement | null>
  }

  // Обработчики
  handleSelectToggle: (field: string) => void
  handleSelectChange: (
    field: "district" | "builder" | "livingEstate" | "street" | "metro",
    value: string
  ) => void
}

const FilterSelects: FC<FilterSelectsProps> = ({
  formData,
  showOptions,
  refs,
  handleSelectToggle,
  handleSelectChange,
}) => {
  const selectConfigs = [
    {
      field: "district",
      label: "Район",
      options: DISTRICT_OPTIONS,
      placeholder: "Район",
      ref: refs.district,
    },
    {
      field: "builder",
      label: "Застройщик",
      options: BUILDER_OPTIONS,
      placeholder: "Застройщик",
      ref: refs.builder,
    },
    {
      field: "livingEstate",
      label: "ЖК",
      options: LIVING_ESTATE_OPTIONS,
      placeholder: "ЖК",
      ref: refs.livingEstate,
    },
    {
      field: "street",
      label: "Улица",
      options: STREET_OPTIONS,
      placeholder: "Улица",
      ref: refs.street,
    },
    {
      field: "metro",
      label: "Метро",
      options: METRO_OPTIONS,
      placeholder: "Метро",
      ref: refs.metro,
    },
  ]

  return (
    <div className={styles.catalogue__filters__container__selects}>
      {selectConfigs.map(({ field, label, options, placeholder, ref }) => (
        <div key={field} className={styles.selectItem}>
          <div className={styles.selectLabel}>{label}</div>
          <div className={styles.selectField} ref={ref}>
            <CustomSelect
              options={options.map((option) => option.value)}
              placeholder={placeholder}
              value={formData[field as keyof typeof formData] as string}
              show={showOptions[field]}
              isLoading={false}
              error=""
              onToggle={() => handleSelectToggle(field)}
              onSelect={(value) =>
                handleSelectChange(
                  field as
                    | "district"
                    | "builder"
                    | "livingEstate"
                    | "street"
                    | "metro",
                  value
                )
              }
              className={styles.colorSelect}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default FilterSelects
