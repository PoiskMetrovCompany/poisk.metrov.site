"use client"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import IMask from "imask"

import React, { FC, useEffect, useRef, useState } from "react"

import Image from "next/image"

import Timer from "./Timer"
import HeaderFormSmall from "./header"

interface IUserAttributes {
  phone?: string
  [key: string]: any
}

interface IAuthResponse {
  request: boolean
  attributes: {
    access_token?: string
    user: {
      role: string
    }
    [key: string]: any
  }
}

interface ISetCodeRequest {
  phone: string
}

interface ISetCodeResponse {
  request: boolean
  attributes: IUserAttributes
}

interface IAuthRequest {
  phone: string
  code: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

const CandidateRegForm: FC = () => {
  const [isCodeMode, setIsCodeMode] = useState(false)
  const [phoneValue, setPhoneValue] = useState("")
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [showCheckmark, setShowCheckmark] = useState(false)
  const [error, setError] = useState("")
  const [userAttributes, setUserAttributes] = useState<IUserAttributes | null>(
    null
  )
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authResult, setAuthResult] = useState<IAuthResponse | null>(null)
  const [timerActive, setTimerActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)

  const phoneInputRef = useRef<HTMLInputElement>(null)
  const currentMaskRef = useRef<any>(null)
  const codeSubmitTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Мутация для отправки кода
  const setCodeMutation = useMutation({
    mutationFn: async (data: ISetCodeRequest): Promise<ISetCodeResponse> => {
      const response = await axios.post(
        `${API_BASE_URL}/account/set-code`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.request) {
        setUserAttributes(data.attributes)
        setIsCodeMode(true)
        setPhoneValue("")
        setShowCheckmark(false)
        startTimer()
      } else {
        setError("Ошибка при отправке кода")
      }
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status === 404) {
          setError("Пользователь не найден")
        } else {
          setError(error.response.data?.error || "Ошибка сервера")
        }
      } else if (error.request) {
        setError("Ошибка соединения с сервером")
      } else {
        setError("Ошибка при отправке запроса")
      }
    },
  })

  // Мутация для аутентификации
  const authMutation = useMutation({
    mutationFn: async (data: IAuthRequest): Promise<IAuthResponse> => {
      const response = await axios.post<IAuthResponse>(
        `${API_BASE_URL}/account/auth`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.request && data.attributes) {
        if (data.attributes.access_token) {
          const expirationDate = new Date()
          expirationDate.setTime(
            expirationDate.getTime() + 30 * 24 * 60 * 60 * 1000
          )
          document.cookie = `access_token=${data.attributes.access_token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`

          const redirectUrl =
            data.attributes.user.role === "candidate"
              ? "/candidatesSecurityBlock/candidatesForm"
              : "/candidatesSecurityTable"

          // Немедленное перенаправление без показа экрана успеха
          window.location.href = redirectUrl
        }
      } else {
        setError("Ошибка при аутентификации")
      }
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Неверный код")
        } else if (error.response.status === 404) {
          setError("Пользователь не найден")
        } else {
          setError(error.response.data?.error || "Ошибка сервера")
        }
      } else if (error.request) {
        setError("Ошибка соединения с сервером")
      } else {
        setError("Ошибка при отправке запроса")
      }
    },
  })

  // Инициализация маски для телефона
  useEffect(() => {
    if (phoneInputRef.current && !isCodeMode) {
      const maskOptions = {
        mask: "+{7}(000) 000-00-00",
      }
      currentMaskRef.current = IMask(phoneInputRef.current, maskOptions)
    }

    return () => {
      if (currentMaskRef.current) {
        currentMaskRef.current.destroy()
      }
    }
  }, [isCodeMode])

  // Инициализация маски для кода
  useEffect(() => {
    if (phoneInputRef.current && isCodeMode) {
      if (currentMaskRef.current) {
        currentMaskRef.current.destroy()
      }
      const maskOptions = {
        mask: " 0 0 0 0 ",
        lazy: false,
        placeholderChar: " _ ",
      }
      currentMaskRef.current = IMask(phoneInputRef.current, maskOptions)

      phoneInputRef.current.focus()

      // Дополнительная проверка фокуса через 100мс
      setTimeout(() => {
        if (
          phoneInputRef.current &&
          phoneInputRef.current !== document.activeElement
        ) {
          phoneInputRef.current.focus()
        }
      }, 100)
    }
  }, [isCodeMode])

  const checkButtonState = () => {
    if (!isCodeMode) {
      const isPhoneValid = phoneValue.length >= 17
      return isPhoneValid && isCheckboxChecked && !setCodeMutation.isPending
    }
    return false
  }

  // Функция для проверки кода и установки таймера
  const checkCodeAndSetTimer = (value: string) => {
    const enteredCode = value.replace(/\s/g, "").replace(/_/g, "")

    if (enteredCode.length === 6) {
      setShowCheckmark(true)

      // Очищаем таймер если он есть
      if (codeSubmitTimeoutRef.current) {
        clearTimeout(codeSubmitTimeoutRef.current)
        codeSubmitTimeoutRef.current = null
      }

      // Отправляем сразу
      setTimeout(() => {
        sendAuthRequest()
      }, 100)
    } else {
      setShowCheckmark(false)

      // Очищаем предыдущий таймер автоотправки
      if (codeSubmitTimeoutRef.current) {
        clearTimeout(codeSubmitTimeoutRef.current)
        codeSubmitTimeoutRef.current = null
      }

      // Устанавливаем новый таймер на 2 секунды только для неполного кода
      if (enteredCode.length > 0) {
        codeSubmitTimeoutRef.current = setTimeout(() => {
          sendAuthRequest()
        }, 2000)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Всегда обновляем состояние
    setPhoneValue(value)

    // Очищаем ошибку при изменении значения
    if (error) {
      setError("")
    }

    // В режиме кода обрабатываем автоотправку
    if (isCodeMode) {
      checkCodeAndSetTimer(value)
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(e.target.checked)
    if (error) {
      setError("")
    }
  }

  // Функция для отправки запроса на аутентификацию
  const sendAuthRequest = async (): Promise<boolean> => {
    // Очищаем таймер автоотправки если он есть
    if (codeSubmitTimeoutRef.current) {
      clearTimeout(codeSubmitTimeoutRef.current)
      codeSubmitTimeoutRef.current = null
    }

    let enteredCode = phoneValue

    if (currentMaskRef.current && currentMaskRef.current.unmaskedValue) {
      enteredCode = currentMaskRef.current.unmaskedValue
    } else {
      enteredCode = phoneValue.replace(/\s/g, "").replace(/_/g, "")
    }

    if (enteredCode.length === 0) {
      setError("Введите код из СМС")
      return false
    }

    const phoneToAuth = userAttributes?.phone
    if (!phoneToAuth) {
      setError("Ошибка: номер телефона не найден")
      return false
    }

    authMutation.mutate({
      phone: phoneToAuth,
      code: enteredCode,
    })

    return true
  }

  const startTimer = () => {
    setTimeLeft(60)
    setTimerActive(true)
  }

  const handleTimerEnd = () => {
    setTimerActive(false)
  }

  const handleGetCodeClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!isCodeMode) {
      setCodeMutation.mutate({ phone: phoneValue })
    } else {
      const phoneToResend = userAttributes?.phone || phoneValue
      setCodeMutation.mutate({ phone: phoneToResend })
    }
  }

  const handleChangeNumber = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Очищаем таймер автоотправки
    if (codeSubmitTimeoutRef.current) {
      clearTimeout(codeSubmitTimeoutRef.current)
      codeSubmitTimeoutRef.current = null
    }

    setIsCodeMode(false)
    setPhoneValue("")
    setShowCheckmark(false)
    setError("")
    setUserAttributes(null)
    setIsAuthenticated(false)
    setAuthResult(null)
    setTimerActive(false)

    setTimeout(() => {
      if (phoneInputRef.current) {
        phoneInputRef.current.focus()
      }
    }, 0)
  }

  // Очистка таймеров при размонтировании компонента
  useEffect(() => {
    return () => {
      if (codeSubmitTimeoutRef.current) {
        clearTimeout(codeSubmitTimeoutRef.current)
      }
    }
  }, [])

  const getButtonText = () => {
    if (setCodeMutation.isPending) {
      return "Отправка..."
    }
    if (!isCodeMode) {
      return "Получить код"
    }

    return timerActive ? (
      <>
        Получить код повторно{" "}
        <Timer
          timeLeft={timeLeft}
          onTimerEnd={handleTimerEnd}
          isActive={timerActive}
        />
      </>
    ) : (
      "Получить код повторно"
    )
  }

  const getButtonClass = () => {
    if (setCodeMutation.isPending) {
      return "formBtn btn-inactive"
    }
    if (!isCodeMode) {
      return checkButtonState() ? "formBtn btn-active" : "formBtn btn-inactive"
    }
    // В режиме кода кнопка активна только если таймер не идет
    return !timerActive ? "formBtn btn-active" : "formBtn btn-inactive"
  }

  const isButtonDisabled = () => {
    if (setCodeMutation.isPending) return true
    if (!isCodeMode) return !checkButtonState()
    // В режиме кода кнопка заблокирована пока идет таймер
    return timerActive
  }

  return (
    <>
      <HeaderFormSmall></HeaderFormSmall>

      <main>
        <section>
          <div className="center-card">
            <h1>Регистрация кандидата</h1>
            <p>
              Введите номер телефона, чтобы авторизоваться в системе и получить
              доступ к анкете кандидата
            </p>

            <form>
              <div className="input-container">
                <label
                  htmlFor="phoneNumber"
                  id="formLabel"
                  className="formLabel"
                >
                  {isCodeMode ? "Последние 4 цифры номера" : "Телефон"}
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="formInput"
                  placeholder={
                    isCodeMode
                      ? "Введите последние 4 цифры номера"
                      : "Введите номер"
                  }
                  value={phoneValue}
                  onChange={handleInputChange}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    if (isCodeMode) {
                      const value = (e.target as HTMLInputElement).value
                      setPhoneValue(value)
                      checkCodeAndSetTimer(value)
                    }
                  }}
                  ref={phoneInputRef}
                  disabled={setCodeMutation.isPending || authMutation.isPending}
                />
                {showCheckmark && (
                  <div className="checkmark-icon" id="checkmarkIcon">
                    <Image
                      src="/checkmark.svg"
                      alt="Checkmark"
                      width={24}
                      height={24}
                    />
                  </div>
                )}
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                id="getCodeBtn"
                className={getButtonClass()}
                disabled={isButtonDisabled()}
                onClick={handleGetCodeClick}
                type="button"
              >
                {getButtonText()}
              </button>
              <br />

              <div
                className="checkboxRow"
                id="checkboxRow"
                style={{ display: isCodeMode ? "none" : "flex" }}
              >
                <label className="custom-checkbox" htmlFor="personalData">
                  <input
                    type="checkbox"
                    name="personalData"
                    id="personalData"
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                    disabled={
                      setCodeMutation.isPending || authMutation.isPending
                    }
                  />
                  <span className="checkmark"></span>
                </label>
                <label htmlFor="personalData">
                  Я даю согласие на обработку{" "}
                  <span>своих персональных данных</span>
                </label>
              </div>
            </form>

            {isCodeMode && (
              <>
                <a href="#" id="changeNumber" onClick={handleChangeNumber}>
                  Изменить номер
                </a>
                <p
                  style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}
                ></p>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default CandidateRegForm
