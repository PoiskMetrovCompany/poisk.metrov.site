import clsx from "clsx"

import React from "react"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"

import styles from "../catalogueList.module.scss"

import CatalogueFilters from "../../catalogueFiltersNavbar"

interface CatalogueFiltersSectionProps {
  isSticky: boolean
  isVisible: boolean
  elementRef: React.RefObject<HTMLDivElement | null>
  onShowFilters: () => void
  onApplyFilters: (formData: FiltersFormData) => void
}

export const CatalogueFiltersSection: React.FC<
  CatalogueFiltersSectionProps
> = ({ isSticky, isVisible, elementRef, onShowFilters, onApplyFilters }) => {
  return (
    <div
      ref={elementRef}
      className={clsx(
        styles.catalogue__filtersNavbar,
        isSticky && styles.catalogue__filtersNavbar_sticky,
        !isVisible && styles.catalogue__filtersNavbar_hidden
      )}
    >
      <CatalogueFilters
        isSticky={isSticky}
        onShowFilters={onShowFilters}
        onApplyFilters={onApplyFilters}
      />
    </div>
  )
}
