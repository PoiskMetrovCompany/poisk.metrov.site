"use client"

import { Accordion } from "radix-ui"

import React, { useState } from "react"

import NotFound from "@/components/notFound"
import { IApartment } from "@/types/api/complex"

import LayoutItem from "./layoutItem"

interface LayoutListProps {
  apartmentTypes: Record<string, IApartment[]> | IApartment[]
}

const LayoutList = ({ apartmentTypes }: LayoutListProps) => {
  const typeNames: Record<string, string> = {
    study: "Студии",
    "1_rooms": "1-комнатные",
    "2_rooms": "2-комнатные",
    "3_rooms": "3-комнатные",
    "4_rooms": "4-комнатные",
  }

  // Проверяем тип данных и обрабатываем соответственно
  let availableTypes: [string, IApartment[]][]

  if (Array.isArray(apartmentTypes)) {
    // Если пришел массив квартир одного типа (старый формат)
    availableTypes = [["apartments", apartmentTypes]]
  } else if (
    typeof apartmentTypes === "object" &&
    apartmentTypes !== null &&
    !Array.isArray(apartmentTypes)
  ) {
    // Если пришел объект с типами квартир (новый формат)
    availableTypes = Object.entries(apartmentTypes).filter(
      ([, apartments]) => apartments && apartments.length > 0
    )
  } else {
    // Если данных нет
    availableTypes = []
  }

  const [openId, setOpenId] = useState<string[]>([])

  if (availableTypes.length === 0) {
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
      {availableTypes.map(([type, apartments]) => (
        <LayoutItem
          key={type}
          name={type}
          isOpen={openId.includes(type)}
          apartments={apartments}
          title={typeNames[type] || type}
        />
      ))}
    </Accordion.Root>
  )
}

export default LayoutList
