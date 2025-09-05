"use client"

import React from "react"

import styles from "./filter.module.scss"

import Dropdown from "@/components/ui/inputs/dropdown"
import Range from "@/components/ui/inputs/range"

const Filter = () => {
  return (
    <div className={styles.filter}>
      <Range />
      {[...new Array(9)].map((_, index) => (
        <Dropdown
          key={index}
          items={[{ label: "Срок сдачи", value: "1" }]}
          placeholder="Срок сдачи"
          value=""
          onChange={() => {}}
        />
      ))}
    </div>
  )
}

export default Filter
