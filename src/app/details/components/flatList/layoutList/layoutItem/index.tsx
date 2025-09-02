"use client"

import clsx from "clsx"
import { Accordion } from "radix-ui"

import React from "react"

import FlatLayoutCard from "@/components/flatLayoutCard"
import { IApartment } from "@/types/api/complex"

import styles from "./layoutItem.module.scss"

import IconImage from "@/components/ui/IconImage"

interface ILayoutItemProps {
  isOpen: boolean
  name: string
  apartments: IApartment[]
}

const LayoutItem = ({ isOpen, name, apartments }: ILayoutItemProps) => {
  const minPrice = Math.min(...apartments.map((apt) => apt.price))
  const minArea = Math.min(...apartments.map((apt) => apt.area))
  const apartmentsCount = apartments.length

  return (
    <Accordion.Item className={styles.Item} value={name}>
      <AccordionTrigger className={styles.layoutList__header}>
        <span className={styles.layoutList__header__title}>
          Все квартиры{" "}
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
          {apartments.map((apartment) => (
            <FlatLayoutCard key={apartment.key} apartment={apartment} />
          ))}
        </div>
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
