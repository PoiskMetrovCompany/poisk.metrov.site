"use client"

import clsx from "clsx"

import React, { FC, useEffect, useState } from "react"

import Image from "next/image"

import styles from "./carouselComponent.module.scss"

interface ICarouselProps {
  children: React.ReactNode
  itemWidth?: number
  gap?: number
}

const CarouselComponent: FC<ICarouselProps> = ({
  children,
  itemWidth = 870,
  gap = 50,
}) => {
  const [translateX, setTranslateX] = useState<number>(0)
  const [transition, setTransition] = useState<string>(
    "transform 0.5s ease-in-out"
  )
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const items: React.ReactElement[] = React.Children.toArray(
    children
  ) as React.ReactElement[]
  const itemsCount: number = items.length

  const extendedItems: React.ReactElement[] = [
    items[itemsCount - 2],
    items[itemsCount - 1],
    ...items,
    items[0],
    items[1],
  ]

  const cardWidth: number = itemWidth + gap
  const initialOffset: number = -cardWidth * 2

  useEffect(() => {
    setTranslateX(initialOffset)
  }, [initialOffset])

  const moveCarousel = (direction: "next" | "prev"): void => {
    if (isAnimating) return

    setIsAnimating(true)
    const newTranslateX: number =
      translateX + (direction === "next" ? -cardWidth : cardWidth)
    setTranslateX(newTranslateX)

    setTimeout(() => {
      if (
        direction === "next" &&
        newTranslateX <= -cardWidth * (itemsCount + 2)
      ) {
        setTransition("none")
        setTranslateX(initialOffset)
        setTimeout(() => {
          setTransition("transform 0.5s ease-in-out")
          setIsAnimating(false)
        }, 50)
      } else if (direction === "prev" && newTranslateX >= 0) {
        setTransition("none")
        setTranslateX(-cardWidth * itemsCount)
        setTimeout(() => {
          setTransition("transform 0.5s ease-in-out")
          setIsAnimating(false)
        }, 50)
      } else {
        setIsAnimating(false)
      }
    }, 500)
  }

  const nextSlide = (): void => moveCarousel("next")
  const prevSlide = (): void => moveCarousel("prev")

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__navigation}>
        <button
          className={clsx(
            styles.carousel__button,
            styles.carousel__button__prev
          )}
          onClick={prevSlide}
        >
          <Image
            src="/images/icons/header/prevArrow.svg"
            alt="Next"
            width={24}
            height={24}
          />
        </button>
        <button
          className={clsx(
            styles.carousel__button,
            styles.carousel__button__next
          )}
          onClick={nextSlide}
        >
          <Image
            src="images/icons/header/nextArrow.svg"
            alt="Next"
            width={24}
            height={24}
          />
        </button>
      </div>

      <div
        className={styles.carousel__viewport}
        style={{ width: "1690px", margin: "0 auto", overflow: "hidden" }}
      >
        <div
          className={styles.carousel__track}
          style={{
            display: "flex",
            gap: `${gap}px`,
            transform: `translateX(${translateX}px)`,
            transition: transition,
          }}
        >
          {extendedItems.map((item, index) => (
            <div key={index} className={styles.carousel__item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarouselComponent
