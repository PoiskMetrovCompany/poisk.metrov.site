"use client"
import React, { useState, useEffect } from "react"
import { Accordion } from "radix-ui"
import Image from "next/image"
import clsx from "clsx"
import styles from "./layoutItem.module.scss"
import FlatLayoutCard from "@/components/flatLayoutCard"
import Pagination from "@/components/pagination"
import IconImage from "@/components/ui/IconImage"
import { useScreenSize } from "@/utils/hooks/use-screen-size"

interface ILayoutItemProps {
  isOpen: boolean
  name: string
}

const itemsPerPageByResolution = {
  isDesktop: 8,
  isLaptop: 6,
  isTablet: 6,
  isMobile: 4,
  isSmallMobile: 2,
}

const LayoutItem = ({ isOpen, name }: ILayoutItemProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(30)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { isDesktop, isLaptop, isTablet, isSmallMobile } = useScreenSize()

  useEffect(() => {
    const getItemsPerPage = () => {
      if (isDesktop) return itemsPerPageByResolution.isDesktop
      if (isLaptop) return itemsPerPageByResolution.isLaptop
      if (isTablet) return itemsPerPageByResolution.isTablet
      if (isSmallMobile) return itemsPerPageByResolution.isSmallMobile
      return itemsPerPageByResolution.isMobile
    }

    setItemsPerPage(getItemsPerPage())
  }, [isDesktop, isLaptop, isTablet, isSmallMobile])

  return (
    <Accordion.Item className={styles.Item} value={name}>
      <AccordionTrigger className={styles.layoutList__header}>
        <span className={styles.layoutList__header__title}>
          Студии{" "}
          <b className={styles.layoutList__header__title__price}>
            от 4 359 990 ₽
          </b>
        </span>
        <span>130 квартир</span>
        <span>от 24.9 м2</span>
        <span>
          от 4 359 990 ₽
          <IconImage
            className={clsx(styles.arrow, isOpen && styles.arrow_open)}
            iconLink="/images/icons/arrow-top-price.svg"
            alt="arrow-top"
          />
        </span>
      </AccordionTrigger>
      <AccordionContent className={styles.layoutList__wrapper}>
        <div className={styles.layoutList__content}>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <FlatLayoutCard key={index} />
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
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
