import React from "react"

import { useRouter } from "next/navigation"

import styles from "./promoCard.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"

const PromoCard = () => {
  const router = useRouter()

  const handleViewOptions = () => {
    router.push("/catalogue")
  }

  return (
    <div className={styles.promoCard}>
      <h3 className={styles.promoCard__header}>Новостройки у воды</h3>
      <ActionButton
        type="beige"
        className={styles.promoCard__button}
        onClick={handleViewOptions}
      >
        Посмотреть варианты
      </ActionButton>
    </div>
  )
}

export default PromoCard
