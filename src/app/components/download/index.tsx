"use client"

import React, { useState } from "react"
import styles from "./download.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"
import clsx from "clsx"
import IconImage from "@/components/ui/IconImage"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"
import Input from "@/components/ui/inputs/inputContainer/fleldset"

const Download = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    checkbox: false,
  })

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value })
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
              className={clsx(
                styles.download__catalogue__buttons__button,
                styles.download__catalogue__buttons__whatsapp
              )}
              size="medium"
            >
              Получить в WhatsApp{" "}
              <IconImage
                iconLink="/images/icons/whatsapp.svg"
                alt="whatsApp"
                className={styles.download__catalogue__buttons__button__icon}
              />
            </ActionButton>
            <ActionButton
              className={clsx(
                styles.download__catalogue__buttons__button,
                styles.download__catalogue__buttons__telegram
              )}
              size="medium"
            >
              Получить в Telegram
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
