import React, { FC, RefObject } from "react"
import styles from "./selects.module.scss"
import CustomSelect from "@/components/ui/inputs/select/customSelect"
import { FiltersFormData } from "../../useFilters"

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
  showDistrictOptions: boolean
  showBuilderOptions: boolean
  showLivingEstateOptions: boolean
  showStreetOptions: boolean
  showMetroOptions: boolean
  
  // Рефы
  districtRef: RefObject<HTMLDivElement | null>
  builderRef: RefObject<HTMLDivElement | null>
  livingEstateRef: RefObject<HTMLDivElement | null>
  streetRef: RefObject<HTMLDivElement | null>
  metroRef: RefObject<HTMLDivElement | null>
  
  // Опции для селектов
  districtOptions: string[]
  builderOptions: string[]
  livingEstateOptions: string[]
  streetOptions: string[]
  metroOptions: string[]
  
  // Обработчики
  handleDistrictSelect: (value: string) => void
  handleBuilderSelect: (value: string) => void
  handleLivingEstateSelect: (value: string) => void
  handleStreetSelect: (value: string) => void
  handleMetroSelect: (value: string) => void
  handleDistrictToggle: () => void
  handleBuilderToggle: () => void
  handleLivingEstateToggle: () => void
  handleStreetToggle: () => void
  handleMetroToggle: () => void
}

const FilterSelects: FC<FilterSelectsProps> = ({
  formData,
  showDistrictOptions,
  showBuilderOptions,
  showLivingEstateOptions,
  showStreetOptions,
  showMetroOptions,
  districtRef,
  builderRef,
  livingEstateRef,
  streetRef,
  metroRef,
  districtOptions,
  builderOptions,
  livingEstateOptions,
  streetOptions,
  metroOptions,
  handleDistrictSelect,
  handleBuilderSelect,
  handleLivingEstateSelect,
  handleStreetSelect,
  handleMetroSelect,
  handleDistrictToggle,
  handleBuilderToggle,
  handleLivingEstateToggle,
  handleStreetToggle,
  handleMetroToggle,
}) => {
  return (
    <div className={styles.catalogue__filters__container__selects}>
      {/* Район */}
      <div ref={districtRef}>
        <CustomSelect
          options={districtOptions}
          placeholder="Район"
          value={formData.district}
          show={showDistrictOptions}
          isLoading={false}
          error=""
          onToggle={handleDistrictToggle}
          onSelect={handleDistrictSelect}
          className={styles.colorSelect}
        />
      </div>

      {/* Застройщик */}
      <div ref={builderRef}>
        <CustomSelect
          options={builderOptions}
          placeholder="Застройщик"
          value={formData.builder}
          show={showBuilderOptions}
          isLoading={false}
          error=""
          onToggle={handleBuilderToggle}
          onSelect={handleBuilderSelect}
          className={styles.colorSelect}
        />
      </div>

      {/* ЖК */}
      <div ref={livingEstateRef}>
        <CustomSelect
          options={livingEstateOptions}
          placeholder="ЖК"
          value={formData.livingEstate}
          show={showLivingEstateOptions}
          isLoading={false}
          error=""
          onToggle={handleLivingEstateToggle}
          onSelect={handleLivingEstateSelect}
          className={styles.colorSelect}
        />
      </div>

      {/* Улица */}
      <div ref={streetRef}>
        <CustomSelect
          options={streetOptions}
          placeholder="Улица"
          value={formData.street}
          show={showStreetOptions}
          isLoading={false}
          error=""
          onToggle={handleStreetToggle}
          onSelect={handleStreetSelect}
          className={styles.colorSelect}
        />
      </div>

      {/* Метро */}
      <div ref={metroRef}>
        <CustomSelect
          options={metroOptions}
          placeholder="Метро"
          value={formData.metro}
          show={showMetroOptions}
          isLoading={false}
          error=""
          onToggle={handleMetroToggle}
          onSelect={handleMetroSelect}
          className={styles.colorSelect}
        />
      </div>
    </div>
  )
}

export default FilterSelects