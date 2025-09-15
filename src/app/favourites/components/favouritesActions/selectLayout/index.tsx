import React from "react"

import { useRouter } from "next/navigation"

import styles from "./selectLayout.module.scss"

import IconImage from "@/components/ui/IconImage"
import IconButton from "@/components/ui/buttons/IconButton"

const SelectLayout = () => {
  const router = useRouter()

  const handleNavigateToCatalogue = () => {
    router.push("/catalogue")
  }

  return (
    <div className={styles.selectLayout}>
      <IconButton
        iconLink="/images/icons/plus-white.svg"
        alt="layout"
        type="orange"
        className={styles.selectLayout__icon}
        onClick={handleNavigateToCatalogue}
      />
      <div className={styles.selectLayout__content}>
        <span className={styles.selectLayout__content__title}>
          Выбрать планировку
        </span>
        <span className={styles.selectLayout__content__description}>
          от 2 830 955 ₽
        </span>
      </div>
    </div>
  )
}

export default SelectLayout
