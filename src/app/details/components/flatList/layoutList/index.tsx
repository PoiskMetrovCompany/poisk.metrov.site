"use client"
import React, { useState } from "react"
import styles from "./layoutList.module.scss"
import { Accordion } from "radix-ui"
import LayoutItem from "./layoutItem"

const LayoutList = () => {
  const [openId, setOpenId] = useState<string[]>([])

  return (
    <Accordion.Root
      className={styles.layoutList}
      type="multiple"
      onValueChange={(value) => setOpenId(value as string[])}
    >
      <LayoutItem name="item-1" isOpen={openId.includes("item-1")} />
      <LayoutItem name="item-2" isOpen={openId.includes("item-2")} />
    </Accordion.Root>
  )
}

export default LayoutList
