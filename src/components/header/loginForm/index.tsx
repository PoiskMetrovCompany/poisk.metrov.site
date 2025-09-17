"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import clsx from "clsx"

import React, { useCallback, useEffect, useState } from "react"

import { useAuthPhone, useAuthPincode } from "@/hooks/useAuth"
import { useAuthStore } from "@/stores/useAuthStore"
import { CurrentUserResponse } from "@/types/User"
import { getAuthToken, setAuthToken } from "@/utils/auth"
import { formatPhoneNumber } from "@/utils/formatPhoneNumber"
import { useApiQuery } from "@/utils/hooks/use-api"

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
  // Используем Zustand state для управления формой
  const { isLoginFormOpen, closeLoginForm } = useAuthStore()
  const [open, setOpen] = useState(isOpen)
  const [phone, setPhone] = useState("")
  const [isAgreed, setIsAgreed] = useState(false)
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"phone" | "code">("phone")
  const [timer, setTimer] = useState(60)
  const [isTimerActive, setIsTimerActive] = useState(false)

  // Хуки для авторизации
  const authPhoneMutation = useAuthPhone()
  const authPincodeMutation = useAuthPincode()

  // Zustand store для управления авторизацией
  const { login } = useAuthStore()

  // Состояние для отслеживания успешной авторизации
  const [authSuccess, setAuthSuccess] = useState(false)

  // Запрос для получения данных пользователя после успешной авторизации
  const { data: currentUserData } = useApiQuery<CurrentUserResponse>(
    ["currentUser"],
    "api/proxy/users/get-current",
    {
      enabled: authSuccess, // Запрос только после успешной авторизации
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  )

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

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
      if (!newOpen) {
        // Сброс состояния при закрытии
        setStep("phone")
        setPhone("")
        setCode("")
        setIsTimerActive(false)
        setTimer(60)
        setAuthSuccess(false)
        // Закрываем форму через Zustand
        closeLoginForm()
        if (onClose) {
          onClose()
        }
      }
    },
    [onClose, closeLoginForm]
  )

  // Обработка данных пользователя после успешной авторизации
  useEffect(() => {
    if (currentUserData?.attributes) {
      // Сохраняем данные пользователя в состоянии
      const token = getAuthToken()
      if (token) {
        login(token, currentUserData.attributes)
        // Закрываем форму после успешной авторизации и получения данных
        handleOpenChange(false)
      }
    }
  }, [currentUserData, login, handleOpenChange])

  const isPhoneValid = phone.replace(/\D/g, "").length >= 10
  const canSubmit = isPhoneValid && isAgreed

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const formattedValue = formatPhoneNumber(inputValue)
    setPhone(formattedValue)
  }

  const formatPhoneDisplay = (value: string) => {
    if (!value) return "+7"
    return value
  }

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) {
      // Отправляем номер телефона на сервер
      authPhoneMutation.mutate(
        { phone },
        {
          onSuccess: () => {
            setStep("code")
            setIsTimerActive(true)
            setTimer(60)
          },
          onError: (error) => {
            console.log("Ошибка при отправке номера телефона:", error)
            // Можно добавить уведомление об ошибке
          },
        }
      )
    }
  }

  const handleCodeSubmit = () => {
    if (code.length === 4) {
      // Отправляем pincode для авторизации
      console.log("🔐 Отправляем данные для авторизации:", {
        phone,
        pincode: code,
      })
      authPincodeMutation.mutate(
        { phone, pincode: code },
        {
          onSuccess: (data) => {
            console.log("Авторизация успешна:", data)
            console.log("Access Token:", data.attributes.token.access_token)

            // Сохраняем токен в cookies
            const token = data.attributes.token.access_token
            setAuthToken(token)

            // Устанавливаем флаг для запроса данных пользователя
            setAuthSuccess(true)
          },
          onError: (error) => {
            console.error("Ошибка при авторизации:", error)
            // Можно добавить уведомление об ошибке
          },
        }
      )
    }
  }

  const handleResendCall = () => {
    if (timer === 0) {
      // Повторно отправляем номер телефона
      authPhoneMutation.mutate(
        { phone },
        {
          onSuccess: () => {
            setIsTimerActive(true)
            setTimer(60)
            console.log("Повторный звонок отправлен")
          },
          onError: (error) => {
            console.error("Ошибка при повторном звонке:", error)
          },
        }
      )
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

  // Используем Zustand state для открытия формы
  const isFormOpen = isLoginFormOpen || open

  return (
    <Dialog.Root open={isFormOpen} onOpenChange={handleOpenChange}>
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
                        disabled={!canSubmit || authPhoneMutation.isPending}
                        onClick={handlePhoneSubmit}
                      >
                        {authPhoneMutation.isPending
                          ? "Отправка..."
                          : "Получить код"}
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
                        {phone}
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
                        disabled={
                          code.length < 4 || authPincodeMutation.isPending
                        }
                        onClick={handleCodeSubmit}
                      >
                        {authPincodeMutation.isPending
                          ? "Авторизация..."
                          : "Отправить"}
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
