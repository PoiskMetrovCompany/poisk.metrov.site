"use client"
import React, { FC } from "react"
import styles from "./offices.module.scss"
import QuestionsForm from "./officesComponents/questionsSection/rightSide"
import GreetingAreaQuestion from "./officesComponents/questionsSection/leftSide"
import QuestionsSection from "./officesComponents/questionsSection"
import MapSection from "./officesComponents/mapSection"
const OfficesQuestions: FC = () => {
  return (
    <div className={styles.Offices}>
      <MapSection/>
      <QuestionsSection/>
    </div>
  )
}

export default OfficesQuestions
