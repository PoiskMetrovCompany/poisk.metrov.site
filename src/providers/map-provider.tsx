"use client"

import { ReactifiedModule } from "@yandex/ymaps3-types/reactify"
import ReactDOM from "react-dom"

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import Script from "next/script"

export type ReactifyApi = ReactifiedModule<
  typeof import("@yandex/ymaps3-types")
>

type MountedMapsContextValue = {
  reactifyApi: ReactifyApi | null
}

export const MountedMapsContext = createContext<MountedMapsContextValue>({
  reactifyApi: null,
})

const yandexApiUrl = `https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAP_KEY}&lang=ru_RU`

export const MapProvider: React.FC<{
  children?: React.ReactNode
  key?: string | number
}> = (props) => {
  const [reactifyApi, setReactifyApi] = useState<ReactifyApi | null>(null)

  const contextValue = useMemo(() => ({ reactifyApi }), [reactifyApi])

  useEffect(() => {
    // Переинициализируем API при изменении key
    const initializeMap = async () => {
      if (typeof window !== "undefined" && window.ymaps3) {
        try {
          const [ymaps3React] = await Promise.all([
            window.ymaps3.import("@yandex/ymaps3-reactify"),
            window.ymaps3.ready,
          ])
          const reactify = ymaps3React.reactify.bindTo(React, ReactDOM)
          setReactifyApi(reactify.module(window.ymaps3))
        } catch (error) {
          console.error("Error reinitializing map:", error)
        }
      }
    }

    // Всегда пытаемся инициализировать при изменении key
    initializeMap()
  }, [props.key])

  return (
    <MountedMapsContext.Provider value={contextValue}>
      <Script
        src={yandexApiUrl}
        onLoad={async () => {
          const [ymaps3React] = await Promise.all([
            ymaps3.import("@yandex/ymaps3-reactify"),
            ymaps3.ready,
          ])
          const reactify = ymaps3React.reactify.bindTo(React, ReactDOM)
          setReactifyApi(reactify.module(ymaps3))
        }}
      />
      {props.children}
    </MountedMapsContext.Provider>
  )
}

export const useMap = () => useContext(MountedMapsContext)
