"use client"

import clsx from "clsx"

import React, { FC, useState } from "react"

import { useApiMutation } from "@/utils/hooks/use-api"

import styles from "./rightSide.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"
import { FormRow } from "@/components/ui/forms/formRow/FormRow"
import InputContainer from "@/components/ui/inputs/inputContainer"

interface DreamFlatData {
  firstName: string
  phoneNumber: string
  privacyAgreed: boolean
  marketingAgreed: boolean
}

interface ApiData {
  name: string
  phone: string
  comment: string
  city: string
}

const RightSide: FC = () => {
  const [formData, setFormData] = useState<DreamFlatData>({
    firstName: "",
    phoneNumber: "",
    privacyAgreed: false,
    marketingAgreed: false,
  })

  const submitMutation = useApiMutation<ApiData, ApiData>("/crm/store", {
    onSuccess: (data) => {
      console.log("Запрос отправлен", data)
      setFormData({
        firstName: "",
        phoneNumber: "",
        privacyAgreed: false,
        marketingAgreed: false,
      })
    },
    onError: (error) => {
      console.log("Ошибка отправки запроса", error)
    },
  })

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
    if (!formData.firstName || !formData.phoneNumber) {
      console.log("Пожалуйста заполните все поля")
      return
    }
    const apiData: ApiData = {
      name: formData.firstName,
      phone: formData.phoneNumber,
      comment:
        "Пользователь запросил консультацию по получению персональной скидки от застройщика",
      city: "novosibirsk",
    }
    submitMutation.mutate(apiData)
  }

  return (
    <div className={styles.rightSide}>
      <FormRow className={clsx(styles.mt_0, styles.smallWrap)}>
        <InputContainer
          placeholder="Ваше имя"
          value={formData.firstName}
          onChange={(value) => handleInputChange("firstName", value)}
          name="firstNameDreamFlat"
        />
        <InputContainer
          placeholder="Номер телефона"
          value={formData.phoneNumber}
          onChange={(value) => handleInputChange("phoneNumber", value)}
          name="phoneDreamFlat"
          type="phone"
          className={styles.w_50}
        />

        <ActionButton
          onClick={handleSubmit}
          loading={submitMutation.isPending}
          disabled={submitMutation.isPending}
          size="medium"
          type={formData.privacyAgreed ? "primary" : "gray"}
        >
          {submitMutation.isPending ? "Отправка..." : "Отправить"}
        </ActionButton>
      </FormRow>

      <FormRow
        className={clsx(styles.mt_0, styles.smallWrap)}
        justifyContent="flex-start"
      >
        <CheckboxRow
          privacyChecked={formData.privacyAgreed}
          onPrivacyChange={handlePrivacyChange}
          marketingChecked={formData.marketingAgreed}
          onMarketingChange={handleMarketingChange}
          idPrefix="dreamFlat"
        />
      </FormRow>
    </div>
  )
}

export default RightSide
