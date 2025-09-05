"use client"

import React, { FC } from "react"

import styles from "./offices.module.scss"

import MapSection from "./officesComponents/mapSection"
import QuestionsSection from "./officesComponents/questionsSection"
import GreetingAreaQuestion from "./officesComponents/questionsSection/leftSide"
import QuestionsForm from "./officesComponents/questionsSection/rightSide"

const OfficesQuestions: FC = () => {
  return (
    <div className={styles.Offices}>
      <MapSection />
      <QuestionsSection />
    </div>
  )
}

export default OfficesQuestions
