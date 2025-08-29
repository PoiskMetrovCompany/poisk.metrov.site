"use client"

import { Accordion } from "radix-ui"

import React, { useState } from "react"

import NotFound from "@/components/notFound"
import { IApartment } from "@/types/api/complex"

import LayoutItem from "./layoutItem"

interface LayoutListProps {
  apartments: IApartment[]
}

const LayoutList = ({ apartments }: LayoutListProps) => {
  const [openId, setOpenId] = useState<string[]>(["apartments-list"])

  if (apartments.length === 0) {
    return (
      <NotFound
        title="Подходящих вариантов нет"
        description="Измените фильтры, чтобы изучить другие предложения в этом ЖК"
        buttonText="Изменить фильтры"
      />
    )
  }

  return (
    <Accordion.Root
      type="multiple"
      value={openId}
      onValueChange={(value) => setOpenId(value as string[])}
    >
      <LayoutItem
        name="apartments-list"
        isOpen={openId.includes("apartments-list")}
        apartments={apartments}
      />
    </Accordion.Root>
  )
}

export default LayoutList
