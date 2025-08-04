import React from "react"
import styles from "./flatList.module.scss"
import Filter from "./filter"
import Heading2 from "@/components/ui/heading2"

const FlatList = () => {
  return (
    <div className={styles.flatList}>
      <div className={styles.flatList__header}>
        <Heading2>Квартиры и цены</Heading2>
      </div>
      <Filter />
    </div>
  )
}

export default FlatList
