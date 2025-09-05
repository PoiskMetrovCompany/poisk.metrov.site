"use client"
import React, { FC } from "react"
import styles from "./questionsSection.module.scss"
import QuestionsForm from "./rightSide"
import GreetingAreaQuestion from "./leftSide"
const QuestionsSection: FC = () => {
  return (
      <div className={styles.QuestionsSection}>
        <div className={styles.QuestionsSection__container}>
          <div className={styles.QuestionsSection__leftSide}>
            <GreetingAreaQuestion />
          </div>
          <div className={styles.QuestionsSection__rightSide}>
            <QuestionsForm />
          </div>
        </div>
      </div>
  )
}

export default QuestionsSection
