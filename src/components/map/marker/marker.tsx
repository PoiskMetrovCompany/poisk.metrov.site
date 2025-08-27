"use client"

import { YMap } from "@yandex/ymaps3-types"
import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import { ReactifyApi } from "@/providers/map-provider"
import type { Place } from "../variables/variables"
import getPopupPosition from "../../../app/details/components/location/helpers/getPosition"
import styles from "./marker.module.scss"
import Image from "next/image"

interface MarkerWithPopupProps {
  mapRef: React.MutableRefObject<(YMap & { container: HTMLElement }) | null>
  place: Place
  selected: boolean
  reactifyApi: ReactifyApi
  selectPlace: (id: string | null) => void
  icon?: string
}

const MarkerWithPopup = ({
  mapRef,
  place,
  selected,
  reactifyApi,
  selectPlace,
  icon,
}: MarkerWithPopupProps) => {
  const markerRef = useRef(null)
  const popupRef = useRef(null)
  const [position, setPosition] = useState<React.CSSProperties>({
    visibility: "hidden",
    opacity: "0",
  })

  const updatePositionAndShow = useCallback(() => {
    const map = mapRef?.current?.container
    const marker = markerRef?.current
    const popup = popupRef?.current

    if (!map || !marker || !popup) return

    setPosition({
      ...getPopupPosition(map, popup, marker),
      visibility: "visible",
      opacity: "1",
    })
  }, [mapRef])

  useEffect(() => {
    if (selected) updatePositionAndShow()
  }, [selected, updatePositionAndShow])

  const { YMapMarker } = reactifyApi

  return (
    <YMapMarker
      key={place.id}
      zIndex={selected ? 10 : 1}
      coordinates={[place.longitude, place.latitude]}
    >
      <div
      // onMouseEnter={() => selectPlace(place.id)}
      // onMouseLeave={() => selectPlace(null)}
      >
        <div ref={markerRef} className={styles.markerContainer}>
          {icon ? (
            <div className={styles.markerWithIcon}>
              <div className={styles.iconContainer}>
                <Image
                  src={icon}
                  alt={place.label}
                  className={styles.icon}
                  width={64}
                  height={64}
                />
              </div>
              <div className={styles.textContainer}>
                <span className={styles.text}>{place.label}</span>
              </div>
            </div>
          ) : (
            <div
              className={`${styles.defaultMarker} ${
                selected ? styles.selected : styles.default
              }`}
            >
              {place.label}
            </div>
          )}
        </div>
        {selected ? (
          <div ref={popupRef} className={styles.popup} style={{ ...position }}>
            <div className={styles.popupContent}>
              <div className={styles.popupTitle}>{place.label}</div>
              <div className={styles.popupText}>{place.label}</div>
            </div>
          </div>
        ) : null}
      </div>
    </YMapMarker>
  )
}

export default memo(MarkerWithPopup)
