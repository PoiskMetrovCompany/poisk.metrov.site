"use client"

import { YMap, YMapLocationRequest } from "@yandex/ymaps3-types/imperative/YMap"
import React, { useRef, useState, useCallback, useEffect } from "react"

import { useMap } from "@/providers/map-provider"

import MarkerWithPopup from "./marker"
import { Place, InfrastructureItem } from "./variables"
import styles from "./map.module.scss"
import useDebounce from "@/utils/hooks/use-debounce"
import { cityCenterCooridnates } from "./cityCoordinates"
import { getCachedInfrastructure } from "./api"

interface MapProps {
  places: Place[]
  selectedInfrastructure?: string[]
}

export const Map = ({ places, selectedInfrastructure = [] }: MapProps) => {
  const mapRef = useRef<(YMap & { container: HTMLElement }) | null>(null)

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null)
  const [bounds, setBounds] = useState<unknown>(null)

  const [infrastructureData, setInfrastructureData] = useState<
    InfrastructureItem[]
  >([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadInfrastructure = async () => {
      if (selectedInfrastructure.length === 0) {
        setInfrastructureData([])
        return
      }

      setLoading(true)
      try {
        const center: [number, number] = [
          cityCenterCooridnates.novosibirsk[0],
          cityCenterCooridnates.novosibirsk[1],
        ]
        const allData: InfrastructureItem[] = []

        for (const type of selectedInfrastructure) {
          const data = await getCachedInfrastructure(type, center)
          allData.push(...data)
        }

        setInfrastructureData(allData)
      } catch (error) {
        console.error("Ошибка при загрузке инфраструктуры:", error)
      } finally {
        setLoading(false)
      }
    }

    loadInfrastructure()
  }, [selectedInfrastructure])

  const filteredInfrastructure = infrastructureData.filter((item) =>
    selectedInfrastructure.includes(item.type)
  )

  const selectPlace = useCallback((placeId: string | null) => {
    setSelectedPlaceId(placeId)
  }, [])

  const [location] = useState<YMapLocationRequest>({
    center: cityCenterCooridnates.novosibirsk,
    zoom: 14,
  })

  const setBoundsDebounced = useDebounce(
    (value: unknown) => setBounds(value),
    500
  )

  const { reactifyApi } = useMap()
  if (!reactifyApi) return null

  const {
    YMap,
    YMapListener,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
  } = reactifyApi

  const hasDataToShow = false
  // const hasDataToShow = filteredInfrastructure.length > 0 || places.length > 0

  return (
    <div className={styles.mapContainer}>
      <YMap
        className={styles.map}
        margin={[20, 20, 20, 20]}
        location={location}
        ref={mapRef}
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        <YMapListener
          onUpdate={({ location }) => {
            setBoundsDebounced(location.bounds)
          }}
        />

        {/* Отображаем маркеры инфраструктуры */}
        {!loading &&
          filteredInfrastructure.map((item) => (
            <MarkerWithPopup
              key={item.id}
              place={{
                id: item.id,
                label: item.name,
                text: item.name,
                longitude: item.longitude,
                latitude: item.latitude,
              }}
              mapRef={mapRef}
              reactifyApi={reactifyApi}
              selected={selectedPlaceId === item.id}
              selectPlace={selectPlace}
              icon={item.icon}
            />
          ))}

        {/* {places.map((place) => (
          <MarkerWithPopup
            key={place.id}
            place={place}
            mapRef={mapRef}
            reactifyApi={reactifyApi}
            selected={selectedPlaceId === place.id}
            selectPlace={selectPlace}
          />
        ))} */}
      </YMap>

      {/* Блок с сообщением о том, что ничего не найдено */}
      {!loading && !hasDataToShow && (
        <div className={styles.noDataOverlay}>
          <div className={styles.noDataMessage}>
            В данной области ничего не найдено
          </div>
        </div>
      )}
    </div>
  )
}
