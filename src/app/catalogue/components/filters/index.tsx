import React, { FC } from "react"
import styles from "./filters.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"
import FiltersHeader from "./filtersComponents/head"
import FilterSelects from "./filtersComponents/selects"
import FilterRanges from "./filtersComponents/ranges"
import FilterButtons from "./filtersComponents/filterButtons"
import { useFilters } from "./useFilters"

interface FiltersProps {
  onClose: () => void
}

const Filters: FC<FiltersProps> = ({ onClose }) => {
  const {
    // Данные
    formData,
    
    // Состояния показа опций селектов
    showDistrictOptions,
    showBuilderOptions,
    showLivingEstateOptions,
    showStreetOptions,
    showMetroOptions,
    
    // Состояния выбранных кнопок фильтров
    selectedCompletionDate,
    selectedBathroom,
    selectedPaymentMethods,
    selectedMetroDistance,
    selectedRegistration,
    selectedApartments,
    
    // Рефы
    districtRef,
    builderRef,
    livingEstateRef,
    streetRef,
    metroRef,
    
    // Опции для селектов
    districtOptions,
    builderOptions,
    livingEstateOptions,
    streetOptions,
    metroOptions,
    
    // Функции
    resetFilters,
    
    // Обработчики
    handleInputChange,
    handleDistrictSelect,
    handleBuilderSelect,
    handleLivingEstateSelect,
    handleStreetSelect,
    handleMetroSelect,
    handlePriceRangeChange,
    handleFloorRangeChange,
    handleFlatAreaRangeChange,
    handleKitchenAreaRangeChange,
    handleDistrictToggle,
    handleBuilderToggle,
    handleLivingEstateToggle,
    handleStreetToggle,
    handleMetroToggle,
    handleCompletionDateSelect,
    handleBathroomSelect,
    handlePaymentMethodSelect,
    handleMetroDistanceSelect,
    handleRegistrationSelect,
    handleApartmentsSelect,
  } = useFilters()

  const handleApplyFilters = () => {
    console.log("Применяем фильтры:", formData)
    onClose()
  }

  return (
    <div className={styles.catalogue__filters__container}>
      <div className={styles.catalogue__filters__container__head}>
        <FiltersHeader
          onClose={onClose}
          onReset={resetFilters}
        />
      </div>

      <FilterSelects
        formData={{
          district: formData.district,
          builder: formData.builder,
          livingEstate: formData.livingEstate,
          street: formData.street,
          metro: formData.metro,
        }}
        showDistrictOptions={showDistrictOptions}
        showBuilderOptions={showBuilderOptions}
        showLivingEstateOptions={showLivingEstateOptions}
        showStreetOptions={showStreetOptions}
        showMetroOptions={showMetroOptions}
        districtRef={districtRef}
        builderRef={builderRef}
        livingEstateRef={livingEstateRef}
        streetRef={streetRef}
        metroRef={metroRef}
        districtOptions={districtOptions}
        builderOptions={builderOptions}
        livingEstateOptions={livingEstateOptions}
        streetOptions={streetOptions}
        metroOptions={metroOptions}
        handleDistrictSelect={handleDistrictSelect}
        handleBuilderSelect={handleBuilderSelect}
        handleLivingEstateSelect={handleLivingEstateSelect}
        handleStreetSelect={handleStreetSelect}
        handleMetroSelect={handleMetroSelect}
        handleDistrictToggle={handleDistrictToggle}
        handleBuilderToggle={handleBuilderToggle}
        handleLivingEstateToggle={handleLivingEstateToggle}
        handleStreetToggle={handleStreetToggle}
        handleMetroToggle={handleMetroToggle}
      />

      <FilterRanges
        formData={{
          priceMin: formData.priceMin,
          priceMax: formData.priceMax,
          floorMin: formData.floorMin,
          floorMax: formData.floorMax,
          flatAreaMin: formData.flatAreaMin,
          flatAreaMax: formData.flatAreaMax,
          kitchenAreaMin: formData.kitchenAreaMin,
          kitchenAreaMax: formData.kitchenAreaMax,
        }}
        handlePriceRangeChange={handlePriceRangeChange}
        handleFloorRangeChange={handleFloorRangeChange}
        handleFlatAreaRangeChange={handleFlatAreaRangeChange}
        handleKitchenAreaRangeChange={handleKitchenAreaRangeChange}
      />

      <FilterButtons
        selectedCompletionDate={selectedCompletionDate}
        selectedBathroom={selectedBathroom}
        selectedPaymentMethods={selectedPaymentMethods}
        selectedMetroDistance={selectedMetroDistance}
        selectedRegistration={selectedRegistration}
        selectedApartments={selectedApartments}
        handleCompletionDateSelect={handleCompletionDateSelect}
        handleBathroomSelect={handleBathroomSelect}
        handlePaymentMethodSelect={handlePaymentMethodSelect}
        handleMetroDistanceSelect={handleMetroDistanceSelect}
        handleRegistrationSelect={handleRegistrationSelect}
        handleApartmentsSelect={handleApartmentsSelect}
      />
      
      <div className={styles.catalogue__filters__container__showFlats}>
        <ActionButton onClick={handleApplyFilters}>
          Показать 11714 квартир
        </ActionButton>
      </div>
    </div>
  )
}

export default Filters