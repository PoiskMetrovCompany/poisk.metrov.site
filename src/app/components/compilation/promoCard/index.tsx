import React from "react"
import styles from "./promoCard.module.scss"
import Image from "next/image"
import IconButton from "@/components/ui/buttons/IconButton"
import Link from "next/link"
import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"

const description = [
  "Этаж 8 из 17",
  "I кв 2025",
  "Дом кирпичный",
  "Отделка улучшенная черновая",
]

const PromoCard = () => {
  return (
    <div className={styles.promoCard}>
      <h3 className={styles.promoCard__header}>Новостройки у воды</h3>
      <ActionButton type="beige" className={styles.promoCard__button}>
        Посмотреть варианты
      </ActionButton>
    </div>
  )
}

export default PromoCard
