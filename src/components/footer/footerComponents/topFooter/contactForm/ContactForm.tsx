"use client"
import React, { FC, useState } from "react"
import clsx from "clsx"
import styles from "./contactForm.module.scss"
import { FormRow } from "@/components/ui/forms/formRow/FormRow"
import InputContainer from "@/components/ui/inputs/inputContainer"
import ArrowButton from "@/components/ui/buttons/smallSubmitBtn"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"
import ActionButton from "@/components/ui/buttons/ActionButton"
import { Form } from "radix-ui"

interface ContactFormData {
  lastName: string
  firstName: string
  middleName: string
  phone: string
  isAgreed: boolean
}

const ContactForm: FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    lastName: "",
    firstName: "",
    middleName: "",
    phone: "",
    isAgreed: false,
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isAgreed: checked }))
  }

  const handleSubmit = () => {
    if (!formData.isAgreed) return

    console.log("Form submitted:", formData)
  }

  return (
    <form className={styles.contactForm}>
      <FormRow className={clsx(styles.smallWrap)}>
        <InputContainer
          label="Ваша фамилия"
          placeholder="Введите вашу фамилию"
          value={formData.lastName}
          onChange={(value) => handleInputChange("lastName", value)}
          name="lastName"
          className={styles.w_50}
        />
        <InputContainer
          label="Ваше имя"
          placeholder="Введите ваше имя"
          value={formData.firstName}
          onChange={(value) => handleInputChange("firstName", value)}
          name="firstName"
          className={styles.w_50}
        />
      </FormRow>

      <FormRow className={clsx(styles.smallWrap)}>
        <InputContainer
          label="Ваше отчество"
          placeholder="Введите ваше отчество"
          value={formData.middleName}
          onChange={(value) => handleInputChange("middleName", value)}
          name="middleName"
          className={styles.w_50}
        />
        <InputContainer
          label="Телефон"
          placeholder="+7"
          value={formData.phone}
          onChange={(value) => handleInputChange("phone", value)}
          name="phone"
          type="phone"
          className={styles.w_50}
        />
        <ArrowButton
          onClick={handleSubmit}
          size="medium"
          absolute={true}
          className={clsx(
            !formData.isAgreed ? styles.contactForm__submitButton_disabled : "",
            styles.position
          )}
        />
      </FormRow>

      <FormRow>
        <ActionButton
          onClick={handleSubmit}
          size="large"
          type="primary"
          svgWidth={20}
          svgHeight={20}
          className={clsx(styles.borderRadius, styles.hideOnDesktop)}
          svgSrc="./svgFiles/nextArrow.svg"
          svgDiscolored={true}
        >
          Отправить
        </ActionButton>
      </FormRow>

      <FormRow className={styles.mt_0} justifyContent="flex-start">
        <CheckboxRow
          checked={formData.isAgreed}
          onChange={handleCheckboxChange}
          text="Нажимая на кнопку, вы даете согласие на обработку"
          linkText="своих персональных данных"
          linkHref="/privacy-policy"
          name="personalData"
          id="personalData"
        />
      </FormRow>
    </form>
  )
}

export default ContactForm
