"use client"

import React, { useState } from "react"

import { useApiMutation } from "@/utils/hooks/use-api"

import styles from "./download.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"
import Input from "@/components/ui/inputs/inputContainer/fleldset"

interface ApiData {
  name: string
  phone: string
  comment: string
  city: string
}

const Download = () => {
  const [sendMessenger, setSendMessenger] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    checkbox: false,
  })

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value })
  }

  const submitMutation = useApiMutation<ApiData, ApiData>("/crm/store", {
    onSuccess: (data) => {
      console.log("Запрос отправлен", data)
      setFormData({
        name: "",
        phone: "",
        checkbox: false,
      })
      setSendMessenger("")
    },
    onError: (error) => {
      console.log("Ошибка при отправке запроса", error)
    },
  })

  const handleSubmit = (value: string) => {
    if (!formData.checkbox) return

    setSendMessenger(value)
    console.log(value)
    if (!formData.name || !formData.phone) {
      console.log("Пожалуйста, заполните все поля")
      return
    }
    const apiData: ApiData = {
      name: formData.name,
      phone: formData.phone,
      comment: `Пользователь запросил каталог в мессенджер ${value}`,
      city: "novosibirsk",
    }

    submitMutation.mutate(apiData)
  }

  return (
    <div className={styles.download}>
      <div className={styles.download__catalogue}>
        <div className={styles.download__catalogue__header}>
          <h2 className={styles.download__catalogue__header__title}>
            Каталог новостроек
          </h2>
          <div className={styles.download__catalogue__header__description}>
            <h2 className={styles.download__catalogue__header__title}>
              Новосибирска
            </h2>
            <span
              className={styles.download__catalogue__header__description__text}
            >
              от 3 млн ₽
            </span>
          </div>
        </div>
        <div className={styles.download__catalogue__statistics}>
          <Input
            label="Ваше имя"
            name="name"
            placeholder="Введите ваше имя"
            value={formData.name}
            onChange={(value) => handleInputChange("name", value)}
          />
          <Input
            label="Телефон"
            name="phone"
            placeholder="+7"
            value={formData.phone}
            onChange={(value) => handleInputChange("phone", value)}
            type="phone"
          />
        </div>
        <div className={styles.download__catalogue__actions}>
          <div className={styles.download__catalogue__buttons}>
            <ActionButton
              className={styles.download__catalogue__buttons__button}
              size="medium"
              type="whatsapp"
              onClick={() => handleSubmit("whatsapp")}
              loading={sendMessenger === "whatsapp" && submitMutation.isPending}
              disabled={sendMessenger === "whatsapp" && submitMutation.isPending}
            >
              {submitMutation.isPending && sendMessenger === "whatsapp"
                ? "Отправляем в whatsapp"
                : "Получить в WhatsApp"}
              <IconImage
                iconLink="/images/icons/whatsapp.svg"
                alt="whatsApp"
                className={styles.download__catalogue__buttons__button__icon}
              />
            </ActionButton>
            <ActionButton
              className={styles.download__catalogue__buttons__button}
              size="medium"
              type="telegram"
              onClick={() => handleSubmit("telegram")}
              loading={sendMessenger === "telegram" && submitMutation.isPending }
              disabled={sendMessenger === "telegram" && submitMutation.isPending}
            >
              {submitMutation.isPending && sendMessenger === "telegram"
                ? "Отправляем в telegram"
                : "Получить в Telegram"}
              <IconImage
                iconLink="/images/icons/telegram.svg"
                alt="telegram"
                className={styles.download__catalogue__buttons__button__icon}
              />
            </ActionButton>
          </div>
          <CheckboxRow
            checked={formData.checkbox}
            onChange={() => handleInputChange("checkbox", !formData.checkbox)}
            text="Нажимая на кнопку, вы даете согласие на обработку"
            linkText="своих персональных данных"
            linkHref="/privacy-policy"
            name="personalData"
            id="personalData"
          />
        </div>
      </div>
      <div className={styles.download__image} />
    </div>
  )
}

export default Download
