"use client"

import clsx from "clsx"
import { Form } from "radix-ui"

import React, { FC, useState } from "react"

import { useApiMutation } from "@/utils/hooks/use-api"

import styles from "./contactForm.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"
import ArrowButton from "@/components/ui/buttons/smallSubmitBtn"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"
import { FormRow } from "@/components/ui/forms/formRow/FormRow"
import InputContainer from "@/components/ui/inputs/inputContainer"

interface ContactFormData {
  lastName: string
  firstName: string
  middleName: string
  phone: string
  privacyAgreed: boolean
  marketingAgreed: boolean
}

interface ApiRequestData {
  name: string
  phone: string
  comment: string
  city: string
}

const ContactForm: FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    lastName: "",
    firstName: "",
    middleName: "",
    phone: "",
    privacyAgreed: false,
    marketingAgreed: false,
  })

  const submitMutation = useApiMutation<ApiRequestData, ApiRequestData>(
    "/crm/store",
    {
      onSuccess: (data) => {
        console.log("Запрос успешен:", data)

        setFormData({
          lastName: "",
          firstName: "",
          middleName: "",
          phone: "",
          privacyAgreed: false,
          marketingAgreed: false,
        })
      },
      onError: (error) => {
        console.log("Ошибка запроса:", error)
      },
    }
  )

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePrivacyChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, privacyAgreed: checked }))
  }

  const handleMarketingChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, marketingAgreed: checked }))
  }

  const handleSubmit = () => {
    if (!formData.privacyAgreed) return

    if (
      !formData.lastName ||
      !formData.firstName ||
      !formData.middleName ||
      !formData.phone
    ) {
      console.log("Пожалуйста, заполните все поля")
      return
    }

    const apiData: ApiRequestData = {
      name: `${formData.lastName} ${formData.firstName} ${formData.middleName}`.trim(),
      phone: formData.phone,
      comment: "Коммент",
      city: "novosibirsk",
    }

    submitMutation.mutate(apiData)
  }

  return (
    <div className={styles.container}>
      <form className={styles.container__contactForm}>
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
        </FormRow>

        <FormRow className={styles.hideOnDesktop}>
          <ActionButton
            onClick={handleSubmit}
            size="large"
            type="primary"
            svgWidth={20}
            svgHeight={20}
            loading={submitMutation.isPending}
            disabled={submitMutation.isPending}
            className={styles.borderRadius}
            svgSrc="./images/icons/header/nextArrow.svg"
            svgDiscolored={true}
          >
            {submitMutation.isPending ? "Отправка..." : "Отправить"}
          </ActionButton>
        </FormRow>

        <FormRow className={styles.mt_0} justifyContent="flex-start">
          <CheckboxRow
            privacyChecked={formData.privacyAgreed}
            onPrivacyChange={handlePrivacyChange}
            marketingChecked={formData.marketingAgreed}
            onMarketingChange={handleMarketingChange}
            idPrefix="footer"
          />
        </FormRow>
      </form>
      <ArrowButton
        onClick={handleSubmit}
        size="medium"
        disabled={submitMutation.isPending}
        loading={submitMutation.isPending}
        className={clsx(
          !formData.privacyAgreed
            ? styles.contactForm__submitButton_disabled
            : "",
          styles.position
        )}
      />
    </div>
  )
}

export default ContactForm
