import React from "react"

import OfficesQuestions from "@/components/offices"
import SendSellApplication from "@/components/sendSellApplication"

import styles from "./offices.module.scss"

const Offices = () => {
  return (
    <div className={styles.QuestionsSection}>
      <OfficesQuestions />
    </div>
  )
}

export default Offices
