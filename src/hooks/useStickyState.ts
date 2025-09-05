"use client"

import { useEffect, useRef, useState } from "react"

import { useScreenSize } from "@/utils/hooks/use-screen-size"

export const useStickyState = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const elementRef = useRef<HTMLDivElement>(null)
  const { isTablet } = useScreenSize()
  const lastScrollY = useRef(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDirection =
        currentScrollY > lastScrollY.current ? "down" : "up"
      lastScrollY.current = currentScrollY

      const rect = element.getBoundingClientRect()
      // TopBar скрывается на экранах <=1099px, поэтому:
      // >=1024px: TopBar (40px) + MainBar (60px) = 100px
      // <1024px: только MainBar (60px) = 60px
      const headerHeight = 100
      // const headerHeight = isTablet ? 100 : 60

      // Элемент становится sticky, когда его верхняя граница достигает header
      const isCurrentlySticky = rect.top <= headerHeight

      // Показываем/скрываем в зависимости от направления скролла
      if (isCurrentlySticky) {
        if (scrollDirection === "down") {
          setIsVisible(false) // Скрываем при скролле вниз
        } else {
          setIsVisible(true) // Показываем при скролле вверх
        }
      } else {
        setIsVisible(true) // Всегда показываем, когда не sticky
      }

      setIsSticky(isCurrentlySticky)
    }

    // Проверяем начальное состояние
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isTablet])

  return { isSticky, isVisible, elementRef }
}
