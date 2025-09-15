"use client"

import { Accordion } from "radix-ui"

import React, { useState } from "react"

import { useRouter } from "next/navigation"

import NotFound from "@/components/notFound"

import LayoutItem from "./layoutItem"

const LayoutList = () => {
  const router = useRouter()
  const [openId, setOpenId] = useState<string[]>([])
  const [isEmpty, setIsEmpty] = useState(false)

  const handleNavigateToCatalogue = () => {
    router.push("/catalogue")
  }

  if (isEmpty) {
    return (
      <NotFound
        title="Подходящих вариантов нет"
        description="Измените фильтры, чтобы изучить другие предложения в этом ЖК"
        buttonText="Изменить фильтры"
        onClick={handleNavigateToCatalogue}
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
