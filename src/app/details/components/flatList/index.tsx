import React from "react"
import styles from "./flatList.module.scss"
import Filter from "./filter"
import Heading2 from "@/components/ui/heading2"
import LayoutList from "./layoutList"

const FlatList = () => {
  return (
    <div className={styles.flatList}>
      <div className={styles.flatList__header}>
        <Heading2>Квартиры и цены</Heading2>
      </div>
      <Filter />
      {/* <LayoutList /> */}
    </div>
  )
}

export default FlatList
