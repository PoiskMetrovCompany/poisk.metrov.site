import { useState, useEffect, useCallback } from "react"
import useDebounce from "./use-debounce"

interface ScreenSize {
  width: number
  height: number
  isDesktop: boolean // >= 1920
  isLaptop: boolean // >= 1440
  isTablet: boolean // >= 1024
  isMobile: boolean // >= 768
  isSmallMobile: boolean // < 768
}

export const useScreenSize = (debounceDelay: number = 150): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0
    const height = typeof window !== "undefined" ? window.innerHeight : 0

    return {
      width,
      height,
      isDesktop: width >= 1920,
      isLaptop: width >= 1440,
      isTablet: width >= 1024,
      isMobile: width >= 768,
      isSmallMobile: width < 768,
    }
  })

  const updateScreenSize = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight

    setScreenSize({
      width,
      height,
      isDesktop: width >= 1920,
      isLaptop: width >= 1440,
      isTablet: width >= 1024,
      isMobile: width >= 768,
      isSmallMobile: width < 768,
    })
  }, [])

  const debouncedUpdateScreenSize = useDebounce(updateScreenSize, debounceDelay)

  useEffect(() => {
    window.addEventListener("resize", debouncedUpdateScreenSize)

    return () => {
      window.removeEventListener("resize", debouncedUpdateScreenSize)
    }
  }, [debouncedUpdateScreenSize])

  return screenSize
}
