"use client"
import React, {FC} from "react";
import styles from "./officesQuestions.module.scss"
import QuestionsForm from "./officesQuestionComponents/rightSide";
import GreetingAreaQuestion from "./officesQuestionComponents/leftSide";
const OfficesQuestions:FC = () => {
  return(
      <div className={styles.QuestionsSection}>
          <div className={styles.QuestionsSection__container}>
            <div className={styles.QuestionsSection__leftSide}>
              <GreetingAreaQuestion/>
            </div>
            <div className={styles.QuestionsSection__rightSide}>
              <QuestionsForm/>
            </div>
          </div>
      </div>
  )
}

export default OfficesQuestions
