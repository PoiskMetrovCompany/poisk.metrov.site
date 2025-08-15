"use client"
import React, { useState } from "react"
import { Accordion } from "radix-ui"
import LayoutItem from "./layoutItem"
import NotFound from "@/components/notFound"

const LayoutList = () => {
  const [openId, setOpenId] = useState<string[]>([])
  const [isEmpty, setIsEmpty] = useState(false)

  if (isEmpty) {
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
      onValueChange={(value) => setOpenId(value as string[])}
    >
      <LayoutItem name="item-1" isOpen={openId.includes("item-1")} />
      <LayoutItem name="item-2" isOpen={openId.includes("item-2")} />
    </Accordion.Root>
  )
}

export default LayoutList
