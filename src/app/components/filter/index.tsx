"use client"

import React, { useState } from "react"
import styles from "./filter.module.scss"
import { useFilters } from "@/utils/hooks/use-filters"
import ActiveFilters from "./ActiveFilters"
import FilterLinks from "./FilterLinks"
import FilterContent from "./FilterContent"
import FilterDialog from "./FilterDialog"
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
  } = useFilters()

  const applyFilters = () => {
    form.handleSubmit()
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
