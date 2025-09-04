"use client"

import React, { useState } from "react"

import FullMap from "@/app/map/components/fullMap"
import { MapProvider } from "@/providers/map-provider"
import { Coordinate } from "@/types/Coordintes"
import { IFavouriteView } from "@/types/Favourites"

import styles from "./favouritesWrapper.module.scss"

import Comparison from "../comparison"
import FavouritesActions from "../favouritesActions"
import RequestsWrapper from "../favouritesActions/requestsWrapper"
import FavouritesList from "../favouritesList"

import Heading1 from "@/components/ui/heading1"

interface FavouritesWrapperProps {
  onMapChange?: (showMap: boolean) => void
}

const FavouritesWrapper: React.FC<FavouritesWrapperProps> = ({
  onMapChange,
}) => {
  const [isComparison, setIsComparison] = useState(false)
  const [selectedView, setSelectedView] = useState<IFavouriteView>("layouts")
  const [flatCount, setFlatCount] = useState(0)
  const [complexCount, setComplexCount] = useState(0)
  const [comparisonFlatCount, setComparisonFlatCount] = useState(0)
  const [comparisonComplexCount, setComparisonComplexCount] = useState(0)
  const [coordinates, setCoordinates] = useState<Coordinate[]>([
    { longitude: 82.93668458845691, latitude: 55.01091579282242 },
  ])
  const [showMap, setShowMap] = useState(false)
  const [mapKey, setMapKey] = useState(0)
  const [complexes, setComplexes] = useState<any[]>([])
  const [apartments, setApartments] = useState<any[]>([])

  const handleShowMap = (value: boolean) => {
    setShowMap(value)
    onMapChange?.(value)
    if (value) {
      setMapKey((prev) => prev + 1)
    }
  }

  if (showMap) {
    return (
      <MapProvider key={mapKey}>
        <FullMap
          key={`fullmap-${mapKey}`}
          hideFilters={true}
          onShowFavourites={() => handleShowMap(false)}
          cardData={{
            complexes,
            apartments,
          }} // Передаем данные комплексов и квартир для карточки
        />
      </MapProvider>
    )
  }

  return (
    <>
      <Heading1 className={styles.title}>
        {isComparison ? "Сравнение" : "Избранное"}
      </Heading1>

      <div className={styles.favouritesWrapper}>
        <FavouritesActions
          flatCount={flatCount}
          complexCount={complexCount}
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          isComparison={isComparison}
          comparisonFlatCount={comparisonFlatCount}
          comparisonComplexCount={comparisonComplexCount}
        />

        {isComparison ? (
          <Comparison
            selectedView={selectedView}
            setIsComparison={setIsComparison}
            setComparisonFlatCount={setComparisonFlatCount}
            setComparisonComplexCount={setComparisonComplexCount}
          />
        ) : (
          <FavouritesList
            setShowMap={handleShowMap}
            setCoordinates={setCoordinates}
            selectedView={selectedView}
            setFlatCount={setFlatCount}
            setComplexCount={setComplexCount}
            setIsComparison={setIsComparison}
            setComplexes={setComplexes}
            setApartments={setApartments}
          />
        )}

        <RequestsWrapper isHiddenDesktop />
      </div>
    </>
  )
}

export default FavouritesWrapper
