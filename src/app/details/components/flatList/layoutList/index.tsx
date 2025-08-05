"use client"
import React, { useState } from "react"
import { Accordion } from "radix-ui"
import LayoutItem from "./layoutItem"
import EmptyList from "./empty"

const LayoutList = () => {
  const [openId, setOpenId] = useState<string[]>([])
  const [isEmpty, setIsEmpty] = useState(true)

  if (isEmpty) {
    return <EmptyList />
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
