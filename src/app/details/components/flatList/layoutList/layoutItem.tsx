"use client"
import React, { useState } from "react"
import { Accordion } from "radix-ui"
import Image from "next/image"
import clsx from "clsx"
import styles from "./layoutList.module.scss"
import FlatLayoutCard from "@/components/flatLayoutCard"
import Pagination from "../pagination"

interface ILayoutItemProps {
  isOpen: boolean
  name: string
}

const LayoutItem = ({ isOpen, name }: ILayoutItemProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)

  return (
    <Accordion.Item className={styles.Item} value={name}>
      <AccordionTrigger className={styles.layoutList__header}>
        <span>Студии</span>
        <span>130 квартир</span>
        <span>от 24.9 м2</span>
        <span>
          от 4 359 990 ₽
          <Image
            className={clsx(styles.arrow, isOpen && styles.arrow_open)}
            src="/images/arrow-top-price.svg"
            alt="arrow-top"
            width={24}
            height={24}
          />
        </span>
      </AccordionTrigger>
      <AccordionContent className={styles.layoutList__wrapper}>
        <div className={styles.layoutList__content}>
          <FlatLayoutCard />
          <FlatLayoutCard />
          <FlatLayoutCard />
          <FlatLayoutCard />
        </div>
        <Pagination
          totalPages={totalPages}
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
