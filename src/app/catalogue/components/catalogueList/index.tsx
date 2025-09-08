"use client"

import React, { useState } from "react"

import { FiltersRequest } from "@/types/api/filters"


import { CatalogueListContent } from "./CatalogueListContent"

import Selection from "@/components/apartmentSelection"

import FlatLayoutCard from "@/components/flatLayoutCard"

import GetCatalogue from "@/components/getCatalogue"







import GetYourDreamFlat from "@/components/getYourDreamFlat"
import NotFound from "@/components/notFound"
import Pagination from "@/components/pagination"
import PropertyCard from "@/components/propertyCard"
import PropertyCardSkeleton from "@/components/propertyCard/PropertyCardSkeleton"
import PropertyCardList from "@/components/propertyCardList"


import PropertyCardListSkeleton from "@/components/propertyCardList/PropertyCardListSkeleton"


import { useStickyState } from "@/hooks/useStickyState"



import { IProperty } from "@/types/PropertyCard"
import { ApartmentSelectionResponse } from "@/types/api/apartment"
import { ResidentialComplexDataResponse } from "@/types/api/complex"
import { useApiQuery } from "@/utils/hooks/use-api"
import { useScreenSize } from "@/utils/hooks/use-screen-size"
import { mapResidentialComplexesToProperties } from "@/utils/mappers/propertyMapper"

import styles from "./catalogueList.module.scss"

import CatalogueFilters from "../catalogueFiltersNavbar"
import FiltersDialog from "../filters"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import Heading2 from "@/components/ui/heading2"
import Heading3 from "@/components/ui/heading3"
import PropertyTypeSelect from "@/components/ui/inputs/select/PropertyTypeSelect"
import RangeSlider from "@/components/ui/rangeSlider"

type SortType = "cards" | "list"
const CITY = "novosibirsk"
const PER_PAGE = "4"


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
