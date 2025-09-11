"use client"

import React, { FC, useRef, useState } from "react"

import styles from "./rightSide.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"
import { FormRow } from "@/components/ui/forms/formRow/FormRow"
import InputContainer from "@/components/ui/inputs/inputContainer"
import CustomSelect from "@/components/ui/inputs/select/customSelect"

interface SellAppFormData {
  estateType: string
  service: string
  lastName: string
  firstName: string
  surName: string
  phoneNumber: string
  privacyAgreed: boolean
  marketingAgreed: boolean
}

const FormSendSellApp = () => {
  const [formData, setFormData] = useState<SellAppFormData>({
    estateType: "",
    service: "",
    lastName: "",
    firstName: "",
    surName: "",
    phoneNumber: "",
    privacyAgreed: false,
    marketingAgreed: false,
  })

  const [showEstateTypeOptions, setShowEstateTypeOptions] = useState(false)
  const [showServiceOptions, setShowServiceOptions] = useState(false)

  const estateTypeRef = useRef<HTMLDivElement>(null)
  const serviceRef = useRef<HTMLDivElement>(null)

  const estateTypeOptions = [
    "Квартира",
    "Дом",
    "Участок",
    "Коммерческая недвижимость",
    "Гараж",
  ]

  const serviceOptions = [
    "Продажа",
    "Покупка",
    "Аренда",
    "Сдача в аренду",
    "Оценка недвижимости",
  ]

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

    console.log("Form submited, need back", formData)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (estateTypeRef.current && !estateTypeRef.current.contains(target)) {
        setShowEstateTypeOptions(false)
      }
      if (serviceRef.current && !serviceRef.current.contains(target)) {
        setShowServiceOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={styles.rightSide__container}>
      <FormRow>
        <div style={{ width: "100%" }} ref={estateTypeRef}>
          <CustomSelect
            label="Тип недвижимости"
            options={estateTypeOptions}
            placeholder="Не выбран"
            value={formData.estateType}
            show={showEstateTypeOptions}
            isLoading={false}
            error=""
            onToggle={() => {
              setShowEstateTypeOptions(!showEstateTypeOptions)
              setShowServiceOptions(false)
            }}
            onSelect={(option: string) => {
              handleInputChange("estateType", option)
              setShowEstateTypeOptions(false)
            }}
          />
        </div>
      </FormRow>

      <FormRow>
        <div style={{ width: "100%" }} ref={serviceRef}>
          <CustomSelect
            label="Выбрать услугу"
            options={serviceOptions}
            placeholder="Не выбрана"
            value={formData.service}
            show={showServiceOptions}
            isLoading={false}
            error=""
            onToggle={() => {
              setShowServiceOptions(!showServiceOptions)
              setShowEstateTypeOptions(false)
            }}
            onSelect={(option: string) => {
              handleInputChange("service", option)
              setShowServiceOptions(false)
            }}
          />
        </div>
      </FormRow>

      <FormRow className={styles.smallWrap}>
        <InputContainer
          label="Ваша фамилия"
          placeholder="Введите вашу фамилию"
          value={formData.lastName}
          onChange={(value) => handleInputChange("lastName", value)}
          name="lastNameSellApp"
          className={styles.w_50}
        />
        <InputContainer
          label="Ваше имя"
          placeholder="Введите ваше имя"
          value={formData.firstName}
          onChange={(value) => handleInputChange("firstName", value)}
          name="firstNameSellApp"
          className={styles.w_50}
        />
      </FormRow>

      <FormRow className={styles.smallWrap}>
        <InputContainer
          label="Ваше отчество"
          placeholder="Введите ваше отчество"
          value={formData.surName}
          onChange={(value) => handleInputChange("surName", value)}
          name="surNameSellApp"
          className={styles.w_50}
        />
        <InputContainer
          label="Телефон"
          placeholder="+7 "
          value={formData.phoneNumber}
          onChange={(value) => handleInputChange("phoneNumber", value)}
          name="phoneNumber"
          type="phone"
          className={styles.w_50}
        />
      </FormRow>

      <FormRow justifyContent="flex-start">
        <ActionButton
          size="medium"
          type={formData.privacyAgreed ? "primary" : "disabled"}
          buttonWidth={253}
          onClick={handleSubmit}
          className={styles.button}
        >
          Отправить
        </ActionButton>
      </FormRow>

      <FormRow justifyContent="flex-start" className={styles.mt_0}>
        <CheckboxRow
          privacyChecked={formData.privacyAgreed}
          onPrivacyChange={handlePrivacyChange}
          marketingChecked={formData.marketingAgreed}
          onMarketingChange={handleMarketingChange}
          idPrefix="sellApp"
        />
      </FormRow>
    </div>
  )
}

export default FormSendSellApp