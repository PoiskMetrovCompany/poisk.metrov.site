"use client"

import React, { useState } from "react"

import { useFilters } from "@/utils/hooks/use-filters"

import styles from "./filter.module.scss"

import ActiveFilters from "./ActiveFilters"
import FilterContent from "./FilterContent"
import FilterDialog from "./FilterDialog"
import FilterLinks from "./FilterLinks"

import Heading2 from "@/components/ui/heading2"

const Filter = () => {
  const [showFiltersDialog, setShowFiltersDialog] = useState(false)

  const {
    form,
    handlePriceChange,
    handleSearchChange,
    handleHouseTypeChange,
    handleRoomCountChange,
    removeHouseType,
    removeRoomCount,
    removePriceRange,
    removeSearchValue,
    clearAllFilters,
    getPriceDisplayText,
    hasActiveFilters,
    getCurrentValues,
    navigateToCatalogue,
  } = useFilters()

  const applyFilters = () => {
    console.log("Кнопка 'Показать' нажата")
    console.log("Текущие значения фильтров:", currentValues)
    // Вместо отправки формы, переходим на каталог с фильтрами
    navigateToCatalogue()
  }

  const onShowFilters = () => {
    setShowFiltersDialog(true)
  }

  const currentValues = getCurrentValues()

  return (
    <div className={styles.filter}>
      <Heading2 className={styles.filter__heading}>
        Недвижимость в Новосибирске
      </Heading2>

      <FilterContent
        currentValues={currentValues}
        onHouseTypeChange={handleHouseTypeChange}
        onRoomCountChange={handleRoomCountChange}
        onPriceChange={handlePriceChange}
        onSearchChange={handleSearchChange}
        onApplyFilters={applyFilters}
        onShowFilters={onShowFilters}
      />

      {hasActiveFilters() && (
        <ActiveFilters
          currentValues={currentValues}
          onRemoveHouseType={removeHouseType}
          onRemoveRoomCount={removeRoomCount}
          onRemovePriceRange={removePriceRange}
          onRemoveSearchValue={removeSearchValue}
          getPriceDisplayText={getPriceDisplayText}
        />
      )}

      <FilterLinks />

      <FilterDialog
        open={showFiltersDialog}
        onOpenChange={setShowFiltersDialog}
        currentValues={currentValues}
        onHouseTypeChange={handleHouseTypeChange}
        onRoomCountChange={handleRoomCountChange}
        onPriceChange={handlePriceChange}
        onSearchChange={handleSearchChange}
        onApplyFilters={applyFilters}
        onResetFilters={clearAllFilters}
      />
    </div>
  )
}

export default Filter
