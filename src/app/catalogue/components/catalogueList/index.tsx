"use client"

import React, { useState } from "react"

import { FiltersRequest } from "@/types/api/filters"

import { CatalogueListContent } from "./CatalogueListContent"

const CatalogueList = () => {
  // Восстанавливаем состояние для диалога фильтров
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FiltersRequest | null>(
    null
  )

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
