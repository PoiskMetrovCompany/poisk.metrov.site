"use client"

import React, { useState } from "react"

import Image from "next/image"


import { useApiMutation } from "@/utils/hooks/use-api"

import styles from "./monthlyPayment.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"
import { FormRow } from "@/components/ui/forms/formRow/FormRow"
import InputContainer from "@/components/ui/inputs/inputContainer"

const mortgageQuestions = [
  {
    id: 1,
    title: "1/4",
    question: "На какой срок планируете ипотеку",
    marker: "срок",
    buttons: ["до 10 лет", "до 20 лет", "до 30 лет"],
  },
  {
    id: 2,
    title: "2/4",
    question: "Какой ежемесячный платеж вам подойдет?",
    marker: "ежемесячный платеж",
    buttons: [
      "До 50 тыс. ₽",
      "До 70 тыс. ₽",
      "До 100 тыс. ₽",
      "Более 100 тыс. ₽",
    ],
  },
  {
    id: 3,
    title: "3/4",
    question: "Какой будет первоначальный взнос?",
    marker: "первоначальный взнос",
    buttons: [
      "Не знаю",
      "Без взноса",
      "до 1 млн ₽",
      "1-3 млн ₽",
      "Более 3 млн ₽",
    ],
  },
  {
    id: 4,
    title: "4/4",
    question: "Сколько комнат будет в квартире?",
    marker: "комнат",
    buttons: ["Студия", "1 комната", "2 комнаты", "3 комнаты", "4+ комнаты"],
  },
]

const cashQuestions = [
  {
    id: 1,
    title: "1/4",
    question: "Какой у вас бюджет на покупку",
    marker: "бюджет",
    buttons: ["до 5 млн ₽", "5-10 млн ₽", "Более 10 млн ₽"],
  },
  {
    id: 2,
    title: "2/4",
    question: "Как скоро планируете сделку?",
    marker: "сделку",
    buttons: ["В течение месяца", "1-3 месяца", "Позже 3 месяцев"],
  },
  {
    id: 3,
    title: "3/4",
    question: "Для чего покупаете квартиру",
    marker: "покупаете квартиру",
    buttons: ["Для жизни", "Для инвестиций"],
  },
  {
    id: 4,
    title: "4/4",
    question: "Сколько комнат будет в квартире?",
    marker: "комнат",
    buttons: ["Студия", "1 комната", "2 комнаты", "3 комнаты", "4+ комнаты"],
  },
]

const installmentQuestions = [
  {
    id: 1,
    title: "1/4",
    question: "На какой срок планируете рассрочку?",
    marker: "срок",
    buttons: ["До 1 года", "До 2 лет", "Более 2 лет"],
  },
  {
    id: 2,
    title: "2/4",
    question: "Какой ежемесячный платеж вам подойдет?",
    marker: "ежемесячный платеж",
    buttons: [
      "До 50 тыс. ₽",
      "До 100 тыс. ₽",
      "До 150 тыс. ₽",
      "Более 150 тыс. ₽",
    ],
  },
  {
    id: 3,
    title: "3/4",
    question: "Какой будет первоначальный взнос?",
    marker: "первоначальный взнос",
    buttons: [
      "Не знаю",
      "Без взноса",
      "До 500 тыс. ₽",
      "500 тыс. - 1 млн. ₽",
      "Более 1 млн ₽",
    ],
  },
  {
    id: 4,
    title: "4/4",
    question: "Сколько комнат будет в квартире?",
    marker: "комнат",
    buttons: ["Студия", "1 комната", "2 комнаты", "3 комнаты", "4+ комнаты"],
  },
]

type ViewState = "initial" | "quiz" | "form"

interface UserAnswers {
  paymentMethod: string

  answers: Array<{
    question: string
    answer: string
  }>
}

interface FormData {
  name: string
  phone: string
}


interface ApiRequestData {
  name: string
  phone: string
  comment: string
  city: string
}

const MonthlyPayment = () => {
  const [viewState, setViewState] = useState<ViewState>("initial")
  const [currentBranch, setCurrentBranch] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({
    paymentMethod: "",
    answers: [],
  })
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
  })


  const submitMutation = useApiMutation<ApiRequestData, ApiRequestData>(
    "/crm/store",
    {
      onSuccess: (data) => {
        console.log("Заявка отправлена", data)
        setViewState("initial")
        setCurrentBranch(null)
        setCurrentQuestionIndex(0)
        setUserAnswers({
          paymentMethod: "",
          answers: [],
        })
        setFormData({
          name: "",
          phone: "",
        })
      },
      onError: (error) => {
        console.log("Ошибка при отправке заявки", error)
      },
    }
  )

  const handleBranchSelect = (branch: string) => {
    setCurrentBranch(branch)
    setCurrentQuestionIndex(0)
    setUserAnswers({
      paymentMethod: branch,
      answers: [],
    })
    setViewState("quiz")
  }

  const handleAnswerSelect = (answer: string) => {

    let currentQuestion
    if (currentBranch === "Ипотека") {
      currentQuestion = mortgageQuestions[currentQuestionIndex]
    } else if (currentBranch === "Наличные") {
      currentQuestion = cashQuestions[currentQuestionIndex]
    } else {
      currentQuestion = installmentQuestions[currentQuestionIndex]
    }

    const newAnswer = {
      question: currentQuestion.question,
      answer: answer,
    }

    const newAnswers = [...userAnswers.answers, newAnswer]
    setUserAnswers((prev) => ({
      ...prev,
      answers: newAnswers,
    }))

    let maxQuestions = 0
    if (currentBranch === "Ипотека") {
      maxQuestions = mortgageQuestions.length
    } else if (currentBranch === "Наличные") {
      maxQuestions = cashQuestions.length
    } else if (currentBranch === "Рассрочка") {
      maxQuestions = installmentQuestions.length
    }

    if (currentQuestionIndex < maxQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setViewState("form")
    }
  }

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()


    if (!formData.name || !formData.phone) {
      console.log("Пожалуйста, заполните все поля")
      return
    }

    const commentParts = [`Способ покупки --- ${userAnswers.paymentMethod}`]

    userAnswers.answers.forEach(({ question, answer }) => {
      commentParts.push(`${question} --- ${answer}`)
    })

    const comment = commentParts.join(" || ")

    const apiData: ApiRequestData = {
      name: formData.name,
      phone: formData.phone,
      comment: comment,
      city: "novosibirsk",
    }

    submitMutation.mutate(apiData)

  }

  if (viewState === "quiz" && currentBranch) {
    let currentQuestion
    if (currentBranch === "Ипотека") {
      currentQuestion = mortgageQuestions[currentQuestionIndex]
    } else if (currentBranch === "Наличные") {
      currentQuestion = cashQuestions[currentQuestionIndex]
    } else {
      currentQuestion = installmentQuestions[currentQuestionIndex]
    }

    return (
      <div className={styles.monthlyPayment}>
        <div className={styles.monthlyPayment__container}>
          <Image
            src="/images/keyMonthly.webp"
            alt="quiz"
            width={365}
            height={365}
            className={styles.monthlyPayment__container__image__key}
          />
          <Image
            src="/images/noteBookMonthly.webp"
            alt="quiz"
            width={365}
            height={365}
            className={styles.monthlyPayment__container__image__noteBook}
          />
          <div className={styles.monthlyPayment__container__content}>
            <div className={styles.monthlyPayment__container__content__title}>
              {currentQuestion.title}
            </div>
            <div
              className={styles.monthlyPayment__container__content__question}
            >
              {currentQuestion.question
                .split(currentQuestion.marker)
                .map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <span
                        className={
                          styles.monthlyPayment__container__content__question__marker
                        }
                      >
                        {currentQuestion.marker}
                      </span>
                    )}
                  </React.Fragment>
                ))}
            </div>
            <div className={styles.monthlyPayment__container__content__buttons}>
              {currentQuestion.buttons.map((button, index) => (
                <ActionButton
                  key={index}
                  type="gray"
                  size="medium"
                  onClick={() => handleAnswerSelect(button)}
                >
                  {button}
                </ActionButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (viewState === "form") {
    return (
      <div className={styles.monthlyPayment}>
        <div className={styles.monthlyPayment__container}>
          <Image
            src="/images/keyMonthly.webp"
            alt="quiz"
            width={365}
            height={365}
            className={styles.monthlyPayment__container__image__keyForm}
          />
          <Image
            src="/images/noteBookMonthly.webp"
            alt="quiz"
            width={365}
            height={365}
            className={styles.monthlyPayment__container__image__noteBookForm}
          />
          <div className={styles.monthlyPayment__container__content}>
            <div className={styles.monthlyPayment__container__content__title}>
              Заявка
            </div>
            <div
              className={styles.monthlyPayment__container__content__question}
            >
              Оставьте заявку, мы{" "}
              <span
                className={
                  styles.monthlyPayment__container__content__question__marker
                }
              >
                бесплатно подберем
              </span>{" "}
              вам квартиру
            </div>
            <form
              onSubmit={handleSubmit}
              className={styles.monthlyPayment__container__content__form}
            >
              <div
                className={styles.monthlyPayment__container__content__form__row}
              >
                <div
                  className={
                    styles.monthlyPayment__container__content__form__inputs
                  }
                >
                  <InputContainer
                    name="name"
                    label=""
                    placeholder="Ваше имя"
                    grayInput={true}
                    value={formData.name}
                    onChange={handleInputChange("name")}
                    required
                  />
                  <InputContainer
                    name="phone"
                    label=""
                    placeholder="Ваш телефон"
                    type="phone"
                    grayInput={true}
                    value={formData.phone}
                    onChange={handleInputChange("phone")}
                    required
                  />
                </div>
                <div
                  className={
                    styles.monthlyPayment__container__content__form__button
                  }
                >

                  <ActionButton
                    type="primary"
                    size="small"
                    loading = {submitMutation.isPending}
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending
                      ? "Отправка..."
                      : "Отправить заявку"}
                  </ActionButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.monthlyPayment}>
      <div className={styles.monthlyPayment__container}>
        <Image
          src="/images/keyMonthly.webp"
          alt="quiz"
          width={365}
          height={365}
          className={styles.monthlyPayment__container__image__key}
        />
        <Image
          src="/images/noteBookMonthly.webp"
          alt="quiz"
          width={365}
          height={365}
          className={styles.monthlyPayment__container__image__noteBook}
        />
        <div className={styles.monthlyPayment__container__content}>
          <div className={styles.monthlyPayment__container__content__title}>
            Квиз
          </div>
          <div className={styles.monthlyPayment__container__content__question}>
            Какой{" "}
            <span
              className={
                styles.monthlyPayment__container__content__question__marker
              }
            >
              способ покупки
            </span>{" "}
            предпочтителен для вас?
          </div>
          <div className={styles.monthlyPayment__container__content__buttons}>
            <ActionButton
              type="gray"
              size="medium"
              onClick={() => handleBranchSelect("Ипотека")}
            >
              Ипотека
            </ActionButton>
            <ActionButton
              type="gray"
              size="medium"
              onClick={() => handleBranchSelect("Наличные")}
            >
              Наличные
            </ActionButton>
            <ActionButton
              type="gray"
              size="medium"
              onClick={() => handleBranchSelect("Рассрочка")}
            >
              Рассрочка
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyPayment
