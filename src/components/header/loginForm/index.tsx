"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import clsx from "clsx"

import React, { useCallback, useEffect, useState } from "react"

import { useAuthStore } from "@/stores/useAuthStore"
import { CurrentUserResponse } from "@/types/User"
import { getAuthToken } from "@/utils/auth"
// import { formatPhoneNumber } from "@/utils/formatPhoneNumber" // Не используется, логика перенесена в handlePhoneChange
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "./form.module.scss"

import PasswordStep from "./PasswordStep"
import PhoneStep from "./PhoneStep"
import Recover from "./Recover"

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

  const [loginType, setLoginType] = useState<"phone" | "password" | "recover">(
    "phone"
  )

  // Zustand store для управления авторизацией
  const { login } = useAuthStore()

  // Состояние для отслеживания успешной авторизации
  const [authSuccess, setAuthSuccess] = useState(false)

  // Запрос для получения данных пользователя после успешной авторизации
  const { data: currentUserData } = useApiQuery<CurrentUserResponse>(
    ["currentUser"],
    "/users/get-current",
    {
      enabled: authSuccess, // Запрос только после успешной авторизации
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    }
  )

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
      if (!newOpen) {
        // Сброс состояния при закрытии
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

  const triggerElement = trigger || (
    <ActionButton type="primary">Личный кабинет</ActionButton>
  )

  // Используем Zustand state для открытия формы
  const isFormOpen = isLoginFormOpen || open

  const makeRecover = () => {
    setLoginType("recover")
  }

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
                iconLink="/images/icons/close-modal.svg"
                alt="Закрыть"
                className={styles.loginForm__close_icon}
              />
            </button>

            {/* Контент формы */}
            <div className={styles.loginForm__form_content}>
              {/* Заголовок и описание */}
              <div className={styles.loginForm__header}>
                <IconImage
                  className={styles.loginForm__logo}
                  iconLink="/images/icons/logo.svg"
                  alt="Logo"
                />
                <div className={styles.loginForm__description}>
                  <h2 className={styles.loginForm__description_title}>
                    {loginType === "recover"
                      ? "Восстановление доступа"
                      : "Вход или регистрация"}
                  </h2>
                  <p className={styles.loginForm__description_text}>
                    {loginType === "recover"
                      ? "Введите E-mail, привязанный к аккаунту. На него придет код подтверждения"
                      : "Введите номер телефона, чтобы авторизоваться и получить доступ ко всем возможностям сервиса"}
                  </p>
                </div>
              </div>

              {loginType !== "recover" && (
                <div className={styles.loginForm__switch}>
                  <button
                    className={clsx(
                      styles.loginForm__switch_button,
                      loginType === "phone" &&
                        styles.loginForm__switch_button_active
                    )}
                    onClick={() => setLoginType("phone")}
                  >
                    По телефону
                  </button>
                  <button
                    className={clsx(
                      styles.loginForm__switch_button,
                      loginType === "password" &&
                        styles.loginForm__switch_button_active
                    )}
                    onClick={() => setLoginType("password")}
                  >
                    По паролю
                  </button>
                </div>
              )}

              {loginType === "phone" ? (
                <PhoneStep
                  makeRecover={makeRecover}
                  onAuthSuccess={() => setAuthSuccess(true)}
                />
              ) : loginType === "password" ? (
                <PasswordStep makeRecover={makeRecover} />
              ) : (
                <Recover />
              )}
            </div>

            {loginType === "recover" && (
              <button className={styles.loginForm__dialog__support}>
                <IconImage
                  iconLink="/images/icons/profile/chat.svg"
                  alt="Support"
                  className={styles.loginForm__dialog__support_icon}
                />
                <span className={styles.loginForm__dialog__support_text}>
                  Обратиться в поддержку
                </span>
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default LoginForm
