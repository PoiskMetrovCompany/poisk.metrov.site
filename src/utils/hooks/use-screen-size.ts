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
    if (typeof window === "undefined") {
      return {
        width: 0,
        height: 0,
        isDesktop: true,
        isLaptop: true,
        isTablet: true,
        isMobile: true,
        isSmallMobile: true,
      }
    }

    const width = window.innerWidth
    const height = window.innerHeight

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

  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

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

  if (!isHydrated) {
    return {
      width: 0,
      height: 0,
      isDesktop: true,
      isLaptop: true,
      isTablet: true,
      isMobile: true,
      isSmallMobile: true,
    }
  }

  return screenSize
}
