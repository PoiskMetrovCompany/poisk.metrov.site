"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import React, { useState } from "react"

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

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen && onClose) {
      onClose()
    }
  }

  const isPhoneValid = phone.length >= 10
  const canSubmit = isPhoneValid && isAgreed

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setPhone(value)
  }

  const formatPhoneDisplay = (value: string) => {
    if (!value) return "+7"
    const cleanValue = value.replace(/\D/g, "")
    let formatted = "+7"

    if (cleanValue.length > 0) {
      formatted += ` (${cleanValue.slice(0, 3)}`
      if (cleanValue.length > 3) {
        formatted += `) ${cleanValue.slice(3, 6)}`
      }
      if (cleanValue.length > 6) {
        formatted += `-${cleanValue.slice(6, 8)}`
      }
      if (cleanValue.length > 8) {
        formatted += `-${cleanValue.slice(8, 10)}`
      }
    }

    return formatted
  }

  const triggerElement = trigger || (
    <ActionButton type="primary">Личный кабинет</ActionButton>
  )

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{triggerElement}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title asChild>
            <VisuallyHidden>Личный кабинет</VisuallyHidden>
          </Dialog.Title>
          <Dialog.Description asChild>
            <VisuallyHidden>
              Форма входа в личный кабинет через номер телефона
            </VisuallyHidden>
          </Dialog.Description>

          <div className={styles.dialog}>
            {/* Кнопка закрытия */}
            <button
              onClick={() => handleOpenChange(false)}
              className={styles.closeButton}
              aria-label="Закрыть"
            >
              <IconImage
                iconLink="/images/icons/close.svg"
                alt="Закрыть"
                className={styles.closeIcon}
              />
            </button>

            {/* Контент формы */}
            <div className={styles.formContent}>
              {/* Заголовок и описание */}
              <div className={styles.header}>
                <h2 className={styles.title}>Личный кабинет</h2>
                <div className={styles.description}>
                  <p className={styles.descriptionText}>
                    Войдите в личный кабинет, чтобы получить доступ ко всем
                    возможностям.
                  </p>
                  <p className={styles.descriptionText}>
                    У нас нет паролей - вход осуществляется по номеру телефона,
                    на который мы звоним.
                  </p>
                </div>
              </div>

              {/* Форма */}
              <div className={styles.form}>
                {/* Поле телефона */}
                <div className={styles.inputContainer}>
                  <div className={styles.inputLabel}>
                    <label className={styles.label}>Ваш телефон</label>
                  </div>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      value={formatPhoneDisplay(phone)}
                      onChange={handlePhoneChange}
                      className={styles.input}
                      placeholder="+7"
                      maxLength={18}
                    />
                  </div>
                </div>

                {/* Действия формы */}
                <div className={styles.formActions}>
                  {/* Кнопка отправки */}
                  <ActionButton
                    type={canSubmit ? "primary" : "disabled"}
                    className={styles.submitButton}
                    disabled={!canSubmit}
                  >
                    Получить код
                  </ActionButton>

                  {/* Согласие */}
                  <div className={styles.agreement}>
                    <label className={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxMark}></span>
                      <span className={styles.agreementText}>
                        Нажимая на кнопку, вы даете согласие на обработку своих
                        персональных данных
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default LoginForm
