"use client"
import React, { useState } from "react"
import styles from "./layoutList.module.scss"
import Image from "next/image"
import FlatLayoutCard from "@/components/flatLayoutCard"
import Pagination from "../pagination"
import clsx from "clsx"
import { Accordion } from "radix-ui"

const LayoutList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)

  const [openId, setOpenId] = useState("item-1")

  return (
    <Accordion.Root
      className={styles.layoutList}
      type="single"
      defaultValue="item-1"
      collapsible
      onValueChange={(value) => setOpenId(value)}
    >
      <Accordion.Item className={styles.Item} value="item-1">
        <AccordionTrigger className={styles.layoutList__header}>
          <span>Студии</span>
          <span>130 квартир</span>
          <span>от 24.9 м2</span>
          <span>
            от 4 359 990 ₽
            <Image
              className={clsx(
                styles.arrow,
                openId === "item-1" && styles.arrow_open
              )}
              src="/images/arrow-top-price.svg"
              alt="arrow-top"
              width={24}
              height={24}
            />
          </span>
        </AccordionTrigger>
        <AccordionContent>
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
      <Accordion.Item className={styles.Item} value="item-2">
        <AccordionTrigger className={styles.layoutList__header}>
          <span>Студии</span>
          <span>130 квартир</span>
          <span>от 24.9 м2</span>
          <span>
            от 4 359 990 ₽
            <Image
              className={clsx(
                styles.arrow,
                openId === "item-2" && styles.arrow_open
              )}
              src="/images/arrow-top-price.svg"
              alt="arrow-top"
              width={24}
              height={24}
            />
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className={styles.layoutList__content}>
            <FlatLayoutCard />
            <FlatLayoutCard />
            <FlatLayoutCard />
            <FlatLayoutCard />
          </div>
        </AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
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

export default LayoutList
