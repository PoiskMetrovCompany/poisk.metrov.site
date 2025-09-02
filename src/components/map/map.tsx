"use client"

import { YMap, YMapLocationRequest } from "@yandex/ymaps3-types/imperative/YMap"
import clsx from "clsx"

import React, { useCallback, useMemo, useRef, useState } from "react"

import { useMap } from "@/providers/map-provider"

// import useDebounce from "@/utils/hooks/use-debounce"

import styles from "./map.module.scss"

// import { getCachedInfrastructure } from "./helpers/api"
import MarkerWithPopup from "./marker/marker"
import { getSizesByZoom } from "./utils/zoomSizes"
import { cityCenterCooridnates } from "./variables/cityCoordinates"
import {
  IPoint,
  InfrastructureItem,
  Place,
  PointType,
} from "./variables/variables"

interface MapProps {
  places?: Place[]
  selectedInfrastructure?: string[]
  viewLocation?: [number, number]
  className?: string
  mapClassName?: string
  customIcon?: string
  points?: IPoint[]
  activePointId?: number | null
  onActivePointChange?: (id: number) => void
  activePoints?: PointType[]
}

export const Map = ({
  places,
  selectedInfrastructure = [],
  viewLocation,
  className,
  mapClassName,
  customIcon = "/images/icons/about/location.svg",
  points,
  activePointId,
  onActivePointChange,
  activePoints,
}: MapProps) => {
  const mapRef = useRef<(YMap & { container: HTMLElement }) | null>(null)

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null)
  const [currentZoom, setCurrentZoom] = useState<number>(14)

  const [infrastructureData] = useState<InfrastructureItem[]>([])
  const [loading] = useState(false)

  const sizes = useMemo(() => getSizesByZoom(currentZoom), [currentZoom])

  const filteredInfrastructure = infrastructureData.filter((item) =>
    selectedInfrastructure.includes(item.type)
  )

  const selectPlace = useCallback((placeId: string | null) => {
    setSelectedPlaceId(placeId)
  }, [])

  const location = useMemo<YMapLocationRequest>(
    () => ({
      center: viewLocation || cityCenterCooridnates.novosibirsk,
      zoom: 14,
    }),
    [viewLocation]
  )

  // const setBoundsDebounced = useDebounce(
  //   (value: unknown) => setBounds(value),
  //   500
  // )

  const filteredPoints = useMemo(() => {
    if (!points || points.length === 0) return []
    if (!activePoints || activePoints.length === 0) return []
    return points.filter((p) => activePoints.includes(p.type))
  }, [points, activePoints])

  const { reactifyApi } = useMap()
  if (!reactifyApi) return null

  const {
    YMap,
    YMapListener,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
  } = reactifyApi

  const hasDataToShow =
    filteredInfrastructure.length > 0 ||
    (places && places.length > 0) ||
    (filteredPoints && filteredPoints.length > 0)

  return (
    <div className={clsx(styles.mapContainer, className)}>
      <YMap
        className={clsx(styles.map, mapClassName)}
        margin={[20, 20, 20, 20]}
        location={location}
        ref={mapRef}
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />

        <YMapListener
          onUpdate={({ location }) => {
            // setBoundsDebounced(location.bounds)
            if (typeof location.zoom === "number") {
              setCurrentZoom(location.zoom)
            }
          }}
        />

        {!loading &&
          filteredInfrastructure.map((item) => (
            <MarkerWithPopup
              key={item.id}
              place={{
                id: item.id,
                label: item.name,
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

        {places?.map((place) => (
          <MarkerWithPopup
            key={place.id}
            place={place}
            mapRef={mapRef}
            reactifyApi={reactifyApi}
            selected={selectedPlaceId === place.id}
            selectPlace={selectPlace}
            icon={customIcon}
          />
        ))}

        {filteredPoints.map((point) => (
          <YMapMarker key={point.id} coordinates={point.coords} zIndex={5}>
            {currentZoom >= 14 ||
            (point.priority === 1 && currentZoom >= 12) ? (
              <div
                className={styles.pointMarker}
                onClick={() => onActivePointChange?.(point.id)}
                style={{
                  height: sizes.markerH,
                  padding: `${sizes.padY}px ${sizes.padX}px ${sizes.padY}px 8px`,
                }}
              >
                <div className={styles.pointWrapper}>
                  <div
                    className={
                      point.type === PointType.IN_SALE
                        ? `${styles.pointDot} ${styles.pointDot_sale} ${
                            activePointId === point.id
                              ? styles.pointDot_active
                              : ""
                          }`
                        : `${styles.pointDot} ${styles.pointDot_announcements} ${
                            activePointId === point.id
                              ? styles.pointDot_active
                              : ""
                          }`
                    }
                    style={{ width: sizes.dot, height: sizes.dot }}
                  />
                </div>

                <div
                  className={styles.pointLabel}
                  style={{ fontSize: sizes.labelFs }}
                >
                  {point.price ||
                    (point.type === PointType.ANNOUNCEMENTS ? "Анонс" : "")}
                </div>
              </div>
            ) : (
              <div
                className={clsx(
                  styles.pointWrapper,
                  styles.pointWrapper_onlyDot
                )}
                style={{ width: sizes.wrapper, height: sizes.wrapper }}
              >
                <div
                  className={
                    point.type === PointType.IN_SALE
                      ? `${styles.pointDot} ${styles.pointDot_sale} ${
                          activePointId === point.id
                            ? styles.pointDot_active
                            : ""
                        }`
                      : `${styles.pointDot} ${styles.pointDot_announcements} ${
                          activePointId === point.id
                            ? styles.pointDot_active
                            : ""
                        }`
                  }
                  style={{ width: sizes.dot, height: sizes.dot }}
                />
              </div>
            )}
          </YMapMarker>
        ))}
      </YMap>

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
