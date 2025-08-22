"use client"
import React, { useState } from "react"
import styles from "./FAQ.module.scss"

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(0)

  // Массив вопросов
  const questions = [
    "У меня нет официального трудоустройства, могут ли мне одобрить ипотеку?",
    "Можно ли получить ипотеку, если раньше были просрочки по кредитам?",
    "Какие ставки сейчас по ипотеке?",
    "Я одна с ребёнком. Дадут ли мне семейную ипотеку?",
  ]


  const answers = [
    "Конечно, да. Более трети заемщиков банка не имеют официального трудоустройства либо получают официально небольшую заработную плату. Наш ипотечный брокер всегда на связи с банками и с легкостью решит эту задачу.",
    "Конечно, да. Более трети заемщиков банка не имеют официального трудоустройства либо получают официально небольшую заработную плату. Наш ипотечный брокер всегда на связи с банками и с легкостью решит эту задачу.",
    "Конечно, да. Более трети заемщиков банка не имеют официального трудоустройства либо получают официально небольшую заработную плату. Наш ипотечный брокер всегда на связи с банками и с легкостью решит эту задачу.",
    "Конечно, да. Более трети заемщиков банка не имеют официального трудоустройства либо получают официально небольшую заработную плату. Наш ипотечный брокер всегда на связи с банками и с легкостью решит эту задачу.",
  ]

  const handleQuestionClick = (index: React.SetStateAction<number>) => {
    setActiveQuestion(index)
  }

  return (
    <div className={styles.mortage__container__FAQ}>
      <div className={styles.mortage__container__FAQ__header}>
        Часто задаваемые вопросы
      </div>
      <div className={styles.mortage__container__FAQ__toggleSection}>
        <div
          className={styles.mortage__container__FAQ__toggleSection__questions}
        >
          {questions.map((question, index) => (
            <div
              key={index}
              className={
                activeQuestion === index
                  ? styles.mortage__container__FAQ__toggleSection__questions__question__active
                  : styles.mortage__container__FAQ__toggleSection__questions__question
              }
              onClick={() => handleQuestionClick(index)}
            >
              <div
                className={
                  activeQuestion === index
                    ? styles.mortage__container__FAQ__toggleSection__questions__question__active__number
                    : styles.mortage__container__FAQ__toggleSection__questions__question__number
                }
              >
                {index + 1}.
              </div>
              <div
                className={
                  styles.mortage__container__FAQ__toggleSection__questions__question__active__text
                }
              >
                {question}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.mortage__container__FAQ__toggleSection__answers}>
          <div
            className={
              styles.mortage__container__FAQ__toggleSection__answers__title
            }
          >
            Ответ
          </div>
          <div
            className={`${styles.mortage__container__FAQ__toggleSection__answers__answer} ${styles.active}`}
            key={activeQuestion} // Ключ для перезапуска анимации при смене вопроса
          >
            {answers[activeQuestion]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
