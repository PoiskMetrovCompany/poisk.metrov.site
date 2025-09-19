import clsx from "clsx"

import React, { useState } from "react"

// import { useAuthPhone } from "@/hooks/useAuth"
// import { useAuthPincode } from "@/hooks/useAuth"
// import { setAuthToken } from "@/utils/auth"

import styles from "./form.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"

interface PasswordStepProps {
  onAuthSuccess?: () => void
  makeRecover?: () => void
}

const PasswordStep: React.FC<PasswordStepProps> = ({
  onAuthSuccess,
  makeRecover,
}) => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [isLoginValid, setIsLoginValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isAgreed, setIsAgreed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [isVerifiedPassword, setIsVerifiedPassword] = useState(true)
  const [isVerifiedLogin, setIsVerifiedLogin] = useState(true)

  // Хуки для авторизации (закомментированы)
  // const authPhoneMutation = useAuthPhone()
  // const authPincodeMutation = useAuthPincode()

  // Обработчик для поля пароля
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setIsPasswordValid(value.length >= 6) // Минимальная длина пароля
  }

  // Обработчик переключения видимости пароля
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setLogin(inputValue)

    // Проверяем, является ли ввод email или телефоном
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)
    const phoneNumbers = inputValue.replace(/\D/g, "")
    const isPhone =
      phoneNumbers.length === 11 &&
      (phoneNumbers.startsWith("7") || phoneNumbers.startsWith("8"))

    setIsLoginValid(isEmail || isPhone)
  }

  const handleLoginFocus = () => {
    // Убираем автоматическое добавление +7, так как поле может содержать email
  }

  const handleLoginSubmit = () => {
    setIsVerifiedLogin(false)
    setIsVerifiedPassword(false)

    if (isLoginValid && password.length >= 6 && isAgreed) {
      // Закомментированный запрос авторизации
      console.log("🔐 Данные для авторизации:", {
        login,
        password,
      })

      // authPhoneMutation.mutate(
      //   { login, password },
      //   {
      //     onSuccess: (data) => {
      //       console.log("Авторизация успешна:", data)
      //       // const token = data.attributes.token.access_token
      //       // setAuthToken(token)
      //       if (onAuthSuccess) {
      //         onAuthSuccess()
      //       }
      //     },
      //     onError: (error) => {
      //       console.error("Ошибка при авторизации:", error)
      //     },
      //   }
      // )

      // Временная имитация успешной авторизации
      if (onAuthSuccess) {
        onAuthSuccess()
      }
    }
  }

  return (
    <div className={styles.loginForm__form}>
      {/* Поле логина */}
      <div className={styles.loginForm__input_container}>
        <div
          className={clsx(
            styles.loginForm__input_label,
            !isVerifiedLogin && styles.loginForm__input_label_error
          )}
        >
          <label
            className={clsx(
              styles.loginForm__label,
              !isVerifiedLogin && styles.loginForm__label_error
            )}
          >
            Логин
          </label>
        </div>
        <div className={styles.loginForm__input_wrapper}>
          <input
            type="text"
            value={login}
            onChange={handleLoginChange}
            onFocus={handleLoginFocus}
            className={clsx(
              styles.loginForm__input,
              !isVerifiedLogin && styles.loginForm__input_error
            )}
            placeholder="E-mail или телефон"
          />
          {isLoginValid && (
            <IconImage
              className={styles.loginForm__input_wrapper_icon}
              iconLink="/images/icons/ok-orange.svg"
              alt="Валидный логин"
            />
          )}
        </div>
        {!isVerifiedLogin && (
          <span className={styles.loginForm__input_wrapper_error}>
            Аккаунт с таким e-mail не существует
          </span>
        )}
      </div>

      {/* Поле пароля */}
      <div className={styles.loginForm__input_container}>
        <div
          className={clsx(
            styles.loginForm__input_label,
            !isVerifiedPassword && styles.loginForm__input_label_error
          )}
        >
          <label className={styles.loginForm__label}>Пароль</label>
        </div>
        <div className={styles.loginForm__input_wrapper}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            className={clsx(
              styles.loginForm__input,
              !showPassword && styles.loginForm__input_password,
              !isVerifiedPassword && styles.loginForm__input_error
            )}
            placeholder="Введите пароль"
          />
          <button
            type="button"
            className={styles.loginForm__input_wrapper_button}
            onClick={handleTogglePasswordVisibility}
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            <IconImage
              className={styles.loginForm__input_wrapper_button_icon}
              iconLink={
                showPassword
                  ? "/images/icons/profile/show-pass.svg"
                  : "/images/icons/profile/hide-pass.svg"
              }
              alt={showPassword ? "Скрыть пароль" : "Показать пароль"}
            />
          </button>
          {/* {isPasswordValid && (
            <IconImage
              className={styles.loginForm__input_wrapper_icon}
              iconLink="/images/icons/ok-orange.svg"
              alt="Валидный пароль"
            />
          )} */}
        </div>
        {!isVerifiedLogin && (
          <span className={styles.loginForm__input_wrapper_error}>
            Некорректный пароль
          </span>
        )}
      </div>

      {/* Действия формы */}
      <div className={styles.loginForm__form_actions}>
        {/* Кнопка авторизации */}
        <ActionButton
          type={
            isLoginValid && isPasswordValid && isAgreed
              ? "primary"
              : "disabled-filled"
          }
          className={styles.loginForm__submit_button}
          disabled={!isLoginValid || !isPasswordValid || !isAgreed}
          onClick={handleLoginSubmit}
        >
          Войти
        </ActionButton>

        <ActionButton
          type={"outline-gray"}
          className={styles.loginForm__submit_button}
          onClick={() => {
            makeRecover?.()
          }}
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
            <b>политики конфиденциальности и обработки персональных данных</b>
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
  )
}

export default PasswordStep
