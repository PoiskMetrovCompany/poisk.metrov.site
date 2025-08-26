"use client"
import React, { useState } from "react"
import styles from "./LeftFormLK.module.scss"
import { FormRow } from "@/components/ui/forms/formRow/FormRow"
import InputContainer from "@/components/ui/inputs/inputContainer"
import ActionButton from "@/components/ui/buttons/ActionButton"
import { Form } from "radix-ui"

interface LKFormData {
  phone: string
  lastName: string
  name: string
  surName: string
  email: string
}

const LeftFormLK = () => {
  const [formData, setFormData] = useState<LKFormData>({
    phone: "",
    lastName: "",
    name: "",
    surName: "",
    email: "",
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    console.log("Изменения сохранены")
  }

  return (
    <div className={styles.LK__container__leftForm}>
      <div className={styles.LK__container__leftForm__form}>
        <FormRow>
          <InputContainer
            label="Ваш телефон"
            placeholder="+7 (999) 123-45-67"
            value={formData.phone}
            type="phone"
            onChange={(value) => handleInputChange("phone", value)}
            name="LKFormPhone"
          />
        </FormRow>

        <FormRow className={styles.smallWrap}>
          <InputContainer
            label="Ваша фамилия"
            placeholder="Фамилия"
            value={formData.lastName}
            onChange={(value) => handleInputChange("lastName", value)}
            name="LKFormLastName"
            className={styles.w_50}
          />
          <InputContainer
            label="Ваше имя"
            placeholder="Имя"
            value={formData.name}
            onChange={(value) => handleInputChange("name", value)}
            name="LKFormName"
            className={styles.w_50}
          />
        </FormRow>
        <FormRow className={styles.smallWrap}>
          <InputContainer
            label="Ваше отчество"
            placeholder="Введите ваше отчество"
            value={formData.surName}
            onChange={(value) => handleInputChange("surName", value)}
            name="LKFormSurName"
            className={styles.w_50}
          />
          <InputContainer
            label="Email"
            placeholder="Введите ваш email"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            name="LKFormEmail"
            className={styles.w_50}
          />
        </FormRow>
        <FormRow justifyContent="flex-start">
          <ActionButton buttonWidth={292} type="gray" size="small">
            Сохранить изменения
          </ActionButton>
        </FormRow>
      </div>
    </div>
  )
}

export default LeftFormLK
