"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import clsx from "clsx"

import React, { useEffect, useState } from "react"

import styles from "./form.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"

interface LoginFormProps {
  isOpen?: boolean
  onClose?: () => void
  trigger?: React.ReactNode
}

const LoginForm: React.FC<LoginFormProps> = ({
  isOpen = false,
  onClose,
  trigger,
}) => {
  const [open, setOpen] = useState(isOpen)
  const [phone, setPhone] = useState("")
  const [isAgreed, setIsAgreed] = useState(false)
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"phone" | "code">("phone")
  const [timer, setTimer] = useState(60)
  const [isTimerActive, setIsTimerActive] = useState(false)

  // Таймер для кнопки "Перезвонить"
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsTimerActive(false)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isTimerActive, timer])

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen && onClose) {
      // Сброс состояния при закрытии
      setStep("phone")
      setPhone("")
      setCode("")
      setIsTimerActive(false)
      setTimer(60)
      onClose()
    }
  }

  const isPhoneValid = phone.replace(/\D/g, "").length >= 10
  const canSubmit = isPhoneValid && isAgreed

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const formattedValue = formatPhoneNumber(inputValue)
    setPhone(formattedValue)
  }

  const formatPhoneNumber = (input: string): string => {
    const numbers = input.replace(/\D/g, "")
    if (numbers.length === 0) return ""

    let cleanNumbers = numbers
    if (numbers.startsWith("8")) {
      cleanNumbers = "7" + numbers.slice(1)
    } else if (!numbers.startsWith("7")) {
      cleanNumbers = "7" + numbers
    }

    cleanNumbers = cleanNumbers.slice(0, 11)

    if (cleanNumbers.length <= 1) return `+${cleanNumbers}`
    if (cleanNumbers.length <= 4)
      return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(1)}`
    if (cleanNumbers.length <= 7)
      return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(
        1,
        4
      )} ${cleanNumbers.slice(4)}`
    if (cleanNumbers.length <= 9)
      return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(
        1,
        4
      )} ${cleanNumbers.slice(4, 7)} ${cleanNumbers.slice(7)}`
    return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(
      1,
      4
    )} ${cleanNumbers.slice(4, 7)} ${cleanNumbers.slice(
      7,
      9
    )} ${cleanNumbers.slice(9, 11)}`
  }

  const formatPhoneDisplay = (value: string) => {
    if (!value) return "+7"
    return value
  }

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) {
      setStep("code")
      setIsTimerActive(true)
      setTimer(60)
    }
  }

  const handleCodeSubmit = () => {
    if (code.length === 4) {
      // Здесь можно добавить логику отправки кода
      console.log("Код отправлен:", code)
    }
  }

  const handleResendCall = () => {
    if (timer === 0) {
      setIsTimerActive(true)
      setTimer(60)
      // Здесь можно добавить логику повторного звонка
      console.log("Повторный звонок")
    }
  }

  const handleClose = () => {
    setStep("phone")
    setPhone("")
    setCode("")
    setIsTimerActive(false)
    setTimer(60)
    if (onClose) {
      onClose()
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const triggerElement = trigger || (
    <ActionButton type="primary">Личный кабинет</ActionButton>
  )

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.loginForm__overlay} />
        <Dialog.Content className={styles.loginForm__content}>
          <Dialog.Title asChild>
            <VisuallyHidden>Личный кабинет</VisuallyHidden>
          </Dialog.Title>
          <Dialog.Description asChild>
            <VisuallyHidden>
              Форма входа в личный кабинет через номер телефона
            </VisuallyHidden>
          </Dialog.Description>

          <div className={styles.loginForm__dialog}>
            {/* Кнопка закрытия */}
            <button
              onClick={() => handleOpenChange(false)}
              className={styles.loginForm__close_button}
              aria-label="Закрыть"
            >
              <IconImage
                iconLink="/images/icons/close.svg"
                alt="Закрыть"
                className={styles.loginForm__close_icon}
              />
            </button>

            {/* Контент формы */}
            <div className={styles.loginForm__form_content}>
              {step === "phone" ? (
                <>
                  {/* Заголовок и описание */}
                  <div className={styles.loginForm__header}>
                    <h2 className={styles.loginForm__title}>Личный кабинет</h2>
                    <div className={styles.loginForm__description}>
                      <p className={styles.loginForm__description_text}>
                        Войдите в личный кабинет, чтобы получить доступ ко всем
                        возможностям.
                      </p>
                      <p className={styles.loginForm__description_text}>
                        У нас нет паролей - вход осуществляется по номеру
                        телефона, на который мы звоним.
                      </p>
                    </div>
                  </div>

                  {/* Форма */}
                  <div className={styles.loginForm__form}>
                    {/* Поле телефона */}
                    <div className={styles.loginForm__input_container}>
                      <div className={styles.loginForm__input_label}>
                        <label className={styles.loginForm__label}>
                          Ваш телефон
                        </label>
                      </div>
                      <div className={styles.loginForm__input_wrapper}>
                        <input
                          type="text"
                          value={formatPhoneDisplay(phone)}
                          onChange={handlePhoneChange}
                          className={styles.loginForm__input}
                          placeholder="+7"
                          maxLength={18}
                        />
                      </div>
                    </div>

                    {/* Действия формы */}
                    <div className={styles.loginForm__form_actions}>
                      {/* Кнопка отправки */}
                      <ActionButton
                        type={canSubmit ? "primary" : "disabled"}
                        className={styles.loginForm__submit_button}
                        disabled={!canSubmit}
                        onClick={handlePhoneSubmit}
                      >
                        Получить код
                      </ActionButton>

                      {/* Согласие */}
                      <div className={styles.loginForm__agreement}>
                        <label className={styles.loginForm__checkbox_container}>
                          <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                            className={styles.loginForm__checkbox}
                          />
                          <span
                            className={styles.loginForm__checkbox_mark}
                          ></span>
                          <span className={styles.loginForm__agreement_text}>
                            Нажимая на кнопку, вы даете согласие на обработку{" "}
                            <b> своих персональных данных </b>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Заголовок и описание для второго шага */}
                  <div className={styles.loginForm__header}>
                    <h2 className={styles.loginForm__title}>Личный кабинет</h2>
                    <div className={styles.loginForm__description}>
                      <p className={styles.loginForm__description_text}>
                        Вам поступит звонок на номер
                        <br />
                        +7 (999) 123-45-67
                        <br />
                        Отвечать необязательно.
                      </p>
                    </div>
                  </div>

                  {/* Форма для второго шага */}
                  <div className={styles.loginForm__form}>
                    {/* Поле кода */}
                    <div className={styles.loginForm__input_container}>
                      <div className={styles.loginForm__input_label}>
                        <label className={styles.loginForm__label}>
                          Введите последние 4 цифры номера
                        </label>
                      </div>
                      <div className={styles.loginForm__input_wrapper}>
                        <input
                          type="text"
                          value={code}
                          onChange={(e) =>
                            setCode(e.target.value.replace(/\D/g, ""))
                          }
                          className={clsx(
                            styles.loginForm__input,
                            styles.loginForm__input_code
                          )}
                          placeholder=""
                          maxLength={4}
                        />
                      </div>
                    </div>

                    {/* Действия формы */}
                    <div className={styles.loginForm__form_actions}>
                      {/* Кнопка отправки */}
                      <ActionButton
                        type={code.length === 4 ? "primary" : "disabled"}
                        className={styles.loginForm__submit_button}
                        disabled={code.length < 4}
                        onClick={handleCodeSubmit}
                      >
                        Отправить
                      </ActionButton>

                      {/* Кнопка перезвонить */}
                      <button
                        onClick={handleResendCall}
                        disabled={timer > 0}
                        className={clsx(
                          styles.loginForm__resend_button,
                          timer === 0 && styles.loginForm__resend_button_active
                        )}
                      >
                        {timer > 0
                          ? `Перезвонить повторно через ${formatTime(timer)}`
                          : "Перезвонить"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default LoginForm
