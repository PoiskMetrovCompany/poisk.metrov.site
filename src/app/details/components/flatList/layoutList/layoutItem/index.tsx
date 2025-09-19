"use client"

import clsx from "clsx"
import { Accordion } from "radix-ui"

import React, { useEffect, useState } from "react"

import FlatLayoutCard from "@/components/flatLayoutCard"
import Pagination from "@/components/pagination"
import { IApartment } from "@/types/api/complex"

import styles from "./layoutItem.module.scss"

import IconImage from "@/components/ui/IconImage"

interface ILayoutItemProps {
  isOpen: boolean
  name: string
  apartments: IApartment[]
  title: string
}

const LayoutItem = ({ isOpen, name, apartments, title }: ILayoutItemProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  if (!Array.isArray(apartments)) {
    console.error("LayoutItem: apartments is not an array", {
      apartments,
      name,
      title,
    })
    return null
  }

  if (apartments.length === 0) {
    return null
  }

  const minPrice = Math.min(...apartments.map((apt) => apt.price))
  const minArea = Math.min(...apartments.map((apt) => apt.area))
  const apartmentsCount = apartments.length

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth
      if (width <= 768) {
        setItemsPerPage(2)
      } else if (width <= 1024) {
        setItemsPerPage(4)
      } else {
        setItemsPerPage(8)
      }
    }

    updateItemsPerPage()
    window.addEventListener("resize", updateItemsPerPage)

    return () => window.removeEventListener("resize", updateItemsPerPage)
  }, [])

  const totalPages = Math.ceil(apartmentsCount / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentApartments = apartments.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1)
    }
  }, [isOpen])

  return (
    <Accordion.Item className={styles.Item} value={name}>
      <AccordionTrigger className={styles.layoutList__header}>
        <span className={styles.layoutList__header__title}>
          {title}{" "}
          <b className={styles.layoutList__header__title__price}>
            от {minPrice.toLocaleString("ru-RU")} ₽
          </b>
        </span>
        <span>
          {apartmentsCount} квартир
          {apartmentsCount === 1 ? "а" : apartmentsCount < 5 ? "ы" : ""}
        </span>
        <span>от {minArea.toFixed(1)} м²</span>
        <span>
          от {minPrice.toLocaleString("ru-RU")} ₽
          <IconImage
            className={clsx(styles.arrow, isOpen && styles.arrow_open)}
            iconLink="/images/icons/arrow-top-price.svg"
            alt="arrow-top"
          />
        </span>
      </AccordionTrigger>
      <AccordionContent className={styles.layoutList__wrapper}>
        <div className={styles.layoutList__content}>
          {currentApartments.map((apartment) => (
            <FlatLayoutCard key={apartment.key} apartment={apartment} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className={styles.layoutList__pagination}>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </AccordionContent>
    </Accordion.Item>
  )
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className={styles.Header}>
    <Accordion.Trigger
      className={clsx(styles.Trigger, className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
))

AccordionTrigger.displayName = "AccordionTrigger"

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={clsx(styles.Content, className)}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Content>
))

AccordionContent.displayName = "AccordionContent"

export default LayoutItem
