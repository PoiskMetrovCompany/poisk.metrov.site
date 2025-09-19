import clsx from "clsx"

import React, { useEffect, useState } from "react"

import { useAuthPhone } from "@/hooks/useAuth"
import { useAuthPincode } from "@/hooks/useAuth"
import { setAuthToken } from "@/utils/auth"

import styles from "./form.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"

interface PhoneStepProps {
  onAuthSuccess?: () => void
  makeRecover?: () => void
}

const PhoneStep: React.FC<PhoneStepProps> = ({
  onAuthSuccess,
  makeRecover,
}) => {
  const [step, setStep] = useState<"phone" | "code">("phone")
  const [phone, setPhone] = useState("")
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false)
  const [code, setCode] = useState("")
  const [timer, setTimer] = useState(60)
  const [isTimerActive, setIsTimerActive] = useState(false)

  // Хуки для авторизации
  const authPhoneMutation = useAuthPhone()
  const authPincodeMutation = useAuthPincode()

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Если поле полностью пустое, очищаем состояние
    if (inputValue === "") {
      setPhone("")
      setIsPhoneValid(false)
      return
    }

    // Извлекаем только цифры из введенного значения
    const numbers = inputValue.replace(/\D/g, "")

    // Если цифр нет, очищаем поле
    if (numbers.length === 0) {
      setPhone("")
      setIsPhoneValid(false)
      return
    }

    // Если начинается с 8, заменяем на 7
    let cleanNumbers = numbers
    if (numbers.startsWith("8")) {
      cleanNumbers = "7" + numbers.slice(1)
    } else if (!numbers.startsWith("7")) {
      cleanNumbers = "7" + numbers
    }

    // Ограничиваем длину до 11 цифр
    cleanNumbers = cleanNumbers.slice(0, 11)

    // Если осталась только одна цифра "7", показываем "+7"
    if (cleanNumbers === "7") {
      setPhone("+7")
      setIsPhoneValid(false)
      return
    }

    // Форматируем номер только если есть цифры
    let formattedValue = ""
    if (cleanNumbers.length <= 1) {
      formattedValue = `+${cleanNumbers}`
    } else if (cleanNumbers.length <= 4) {
      formattedValue = `+${cleanNumbers.slice(0, 1)} (${cleanNumbers.slice(1)})`
    } else if (cleanNumbers.length <= 7) {
      formattedValue = `+${cleanNumbers.slice(0, 1)} (${cleanNumbers.slice(1, 4)}) ${cleanNumbers.slice(4)}`
    } else if (cleanNumbers.length <= 9) {
      formattedValue = `+${cleanNumbers.slice(0, 1)} (${cleanNumbers.slice(1, 4)}) ${cleanNumbers.slice(4, 7)}-${cleanNumbers.slice(7)}`
    } else {
      formattedValue = `+${cleanNumbers.slice(0, 1)} (${cleanNumbers.slice(1, 4)}) ${cleanNumbers.slice(4, 7)}-${cleanNumbers.slice(7, 9)}-${cleanNumbers.slice(9, 11)}`
    }

    setPhone(formattedValue)
    setIsPhoneValid(cleanNumbers.length === 11)
  }

  const handlePhoneFocus = () => {
    if (!phone) {
      setPhone("+7")
    }
  }

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Если нажата Backspace
    if (e.key === "Backspace") {
      const currentNumbers = phone.replace(/\D/g, "")

      // Если в поле только одна цифра (7), очищаем полностью
      if (currentNumbers.length <= 1) {
        setPhone("")
        e.preventDefault()
        return
      }

      // Если поле содержит только "+7", очищаем
      if (phone === "+7") {
        setPhone("")
        e.preventDefault()
        return
      }
    }
  }

  const formatPhoneDisplay = (value: string) => {
    if (!value) return ""
    return value
  }

  const handlePhoneSubmit = () => {
    const phoneNumbers = phone.replace(/\D/g, "")
    if (phoneNumbers.length === 11 && isAgreed) {
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

            // Вызываем callback для уведомления родительского компонента
            if (onAuthSuccess) {
              onAuthSuccess()
            }
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

  const handleRewritePhone = () => {
    setStep("phone")
    setPhone("")
    setIsPhoneValid(false)
    setIsAgreed(false)
    setCode("")
    setTimer(60)
    setIsTimerActive(false)
  }

  return (
    <>
      {step === "phone" ? (
        <div className={styles.loginForm__form}>
          {/* Поле телефона */}
          <div className={styles.loginForm__input_container}>
            <div className={styles.loginForm__input_label}>
              <label className={styles.loginForm__label}>Телефон</label>
            </div>
            <div className={styles.loginForm__input_wrapper}>
              <input
                type="text"
                value={formatPhoneDisplay(phone)}
                onChange={handlePhoneChange}
                onFocus={handlePhoneFocus}
                onKeyDown={handlePhoneKeyDown}
                className={styles.loginForm__input}
                placeholder="Введите номер"
                maxLength={18}
              />
              {isPhoneValid && (
                <IconImage
                  className={styles.loginForm__input_wrapper_icon}
                  iconLink="/images/icons/ok-orange.svg"
                  alt="Валидный номер"
                />
              )}
            </div>
          </div>

          {/* Действия формы */}
          <div className={styles.loginForm__form_actions}>
            {/* Кнопка отправки */}
            <ActionButton
              type={isPhoneValid && isAgreed ? "primary" : "disabled-filled"}
              className={styles.loginForm__submit_button}
              disabled={
                !isPhoneValid || !isAgreed || authPhoneMutation.isPending
              }
              onClick={handlePhoneSubmit}
            >
              {authPhoneMutation.isPending
                ? "Отправка..."
                : "Получить код доступа"}
            </ActionButton>

            <ActionButton
              type={"outline-gray"}
              className={styles.loginForm__submit_button}
              // disabled={
              //   !isPhoneValid || !isAgreed || authPhoneMutation.isPending
              // }
              onClick={makeRecover}
            >
              Восстановить доступ
            </ActionButton>
          </div>
          {/* Согласие */}
          <div className={styles.loginForm__agreement}>
            <label className={styles.loginForm__checkbox_container}>
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className={styles.loginForm__checkbox}
              />
              <span className={styles.loginForm__checkbox_mark}></span>
              <span className={styles.loginForm__agreement_text}>
                Я соглашаюсь с условиями{" "}
                <b>
                  политики конфиденциальности и обработки персональных данных
                </b>
              </span>
            </label>
            <label className={styles.loginForm__checkbox_container}>
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className={styles.loginForm__checkbox}
              />
              <span className={styles.loginForm__checkbox_mark}></span>
              <span className={styles.loginForm__agreement_text}>
                Я соглашаюсь с получением <b>рекламных рассылок </b>
              </span>
            </label>
          </div>
        </div>
      ) : (
        <div className={styles.loginForm__form}>
          {/* Поле кода */}
          <div className={styles.loginForm__form__phone}>
            <span className={styles.loginForm__form__phone_text}>
              Код отправлен на номер
            </span>
            <span className={styles.loginForm__form__phone_phone}>{phone}</span>
            <button
              onClick={handleRewritePhone}
              className={styles.loginForm__form__phone__button}
            >
              <IconImage
                className={styles.loginForm__form__phone__button__icon}
                iconLink="/images/icons/reload.svg"
                alt="refetch"
              />
            </button>
          </div>
          <div className={styles.loginForm__input_container}>
            <div className={styles.loginForm__input_label}>
              <label className={styles.loginForm__label}>Введите код</label>
            </div>
            <div className={styles.loginForm__input_wrapper}>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                className={clsx(
                  styles.loginForm__input,
                  styles.loginForm__input_code
                )}
                placeholder="_ _ _ _"
                maxLength={4}
              />
              {code.length === 4 && (
                <IconImage
                  className={styles.loginForm__input_wrapper_icon}
                  iconLink="/images/icons/ok-orange.svg"
                  alt="Валидный номер"
                />
              )}
            </div>
          </div>

          {/* Действия формы */}
          <div className={styles.loginForm__form_actions}>
            {/* Универсальная кнопка */}
            <ActionButton
              // type={
              //   code.length === 4
              //     ? "primary"
              //     : timer === 0
              //       ? "outline-gray"
              //       : "disabled"
              // }

              type={
                code.length === 4 || timer === 0 ? "primary" : "outline-gray"
              }
              className={styles.loginForm__submit_button}
              // disabled={
              //   code.length === 4
              //     ? authPincodeMutation.isPending
              //     : timer > 0 || authPhoneMutation.isPending
              // }
              onClick={code.length === 4 ? handleCodeSubmit : handleResendCall}
            >
              {code.length === 4
                ? authPincodeMutation.isPending
                  ? "Авторизация..."
                  : "Отправить"
                : timer > 0
                  ? `Перезвонить повторно через ${formatTime(timer)}`
                  : authPhoneMutation.isPending
                    ? "Отправка..."
                    : "Перезвонить"}
            </ActionButton>
            <ActionButton
              type={"outline-gray"}
              className={styles.loginForm__submit_button}
              // disabled={
              //   !isPhoneValid || !isAgreed || authPhoneMutation.isPending
              // }
              onClick={handlePhoneSubmit}
            >
              {authPhoneMutation.isPending
                ? "Отправка..."
                : "Восстановить доступ"}
            </ActionButton>
          </div>

          {/* Согласие */}
          <div className={styles.loginForm__agreement}>
            <label className={styles.loginForm__checkbox_container}>
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className={styles.loginForm__checkbox}
              />
              <span className={styles.loginForm__checkbox_mark}></span>
              <span className={styles.loginForm__agreement_text}>
                Я соглашаюсь с условиями{" "}
                <b>
                  политики конфиденциальности и обработки персональных данных
                </b>
              </span>
            </label>
            <label className={styles.loginForm__checkbox_container}>
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className={styles.loginForm__checkbox}
              />
              <span className={styles.loginForm__checkbox_mark}></span>
              <span className={styles.loginForm__agreement_text}>
                Я соглашаюсь с получением <b>рекламных рассылок </b>
              </span>
            </label>
          </div>
        </div>
      )}
    </>
  )
}

export default PhoneStep
