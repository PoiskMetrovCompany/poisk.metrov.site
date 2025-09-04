import clsx from "clsx"

import React, { memo, useMemo } from "react"

import { FiltersFormData } from "@/app/catalogue/components/filters/types"

import styles from "../catalogueList.module.scss"

import CatalogueFilters from "../../catalogueFiltersNavbar"

interface CatalogueFiltersSectionProps {
  isSticky: boolean
  isVisible: boolean
  elementRef: React.RefObject<HTMLDivElement | null>
  onShowFilters: () => void
  onApplyFilters: (formData: FiltersFormData) => void
  isLoadingFilters: boolean
}

export const CatalogueFiltersSection: React.FC<CatalogueFiltersSectionProps> =
  memo(
    ({
      isSticky,
      isVisible,
      elementRef,
      onShowFilters,
      onApplyFilters,
      isLoadingFilters,
    }) => {
      // Мемоизируем классы для предотвращения лишних вычислений
      const sectionClasses = useMemo(
        () =>
          clsx(
            styles.catalogue__filtersNavbar,
            isSticky && styles.catalogue__filtersNavbar_sticky,
            !isVisible && styles.catalogue__filtersNavbar_hidden
          ),
        [isSticky, isVisible]
      )

      return (
        <div ref={elementRef} className={sectionClasses}>
          <CatalogueFilters
            isSticky={isSticky}
            onShowFilters={onShowFilters}
            onApplyFilters={onApplyFilters}
            isLoadingFilters={isLoadingFilters}
          />
        </div>
      )
    }
  )

CatalogueFiltersSection.displayName = "CatalogueFiltersSection"
