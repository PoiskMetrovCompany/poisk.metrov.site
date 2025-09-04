"use client"

import React, { useState } from "react"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"
import { FiltersRequest } from "@/types/api/filters"
import { mapFiltersFormToApi } from "@/utils/mappers/filtersMapper"

import { CatalogueListContent } from "./CatalogueListContent"

const CatalogueList = () => {
  const [activeFilters, setActiveFilters] = useState<FiltersRequest | null>(
    null
  )
  const [showFilters, setShowFilters] = useState(false)

  const applyFilters = (formData: FiltersFormData) => {
    console.log("Применение фильтров:", formData)

    // Преобразуем данные формы в параметры API
    const filtersParams = mapFiltersFormToApi(formData)
    console.log("Параметры API фильтров:", filtersParams)

    // Сохраняем активные фильтры
    setActiveFilters(filtersParams)
    setShowFilters(false)
  }

  return (
    <CatalogueListContent
      showFilters={showFilters}
      setShowFilters={setShowFilters}
      activeFilters={activeFilters}
      setActiveFilters={setActiveFilters}
    />
  )
}

export default CatalogueList
