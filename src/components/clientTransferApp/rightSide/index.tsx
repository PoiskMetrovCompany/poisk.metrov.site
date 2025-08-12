"use client"
import React, { FC, useRef, useState } from "react"

import styles from "./rightSide.module.scss"
import { FormRow } from "@/components/ui/forms/formRow/FormRow"
import InputContainer from "@/components/ui/inputs/inputContainer"
import ActionButton from "@/components/ui/buttons/ActionButton"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"
import CustomSelect from "@/components/ui/inputs/select/customSelect"
import { Form } from "radix-ui"

interface SellAppFormData {
  estateType: string
  service: string
  lastName: string
  firstName: string
  surName: string
  phoneNumber: string
  clientLastName: string
  clientName: string
  clientSurName: string
  clientPhoneNumber: string
  cityBuy: string
  isAgreed: boolean
}

const ClientTransferForm = () => {
  const [formData, setFormData] = useState<SellAppFormData>({
    estateType: "",
    service: "",
    lastName: "",
    firstName: "",
    surName: "",
    phoneNumber: "",
    clientLastName: "",
    clientName: "",
    clientSurName: "",
    clientPhoneNumber: "",
    cityBuy: "",
    isAgreed: false,
  })

  const [showCityBuyOptions, setShowCityBuyOptions] = useState(false)

  const cityBuyRef = useRef<HTMLDivElement>(null)

  const cityBuyOptions = [
    "Москва",
    "Санкт-Петербург", 
    "Новосибирск",
    "Екатеринбург",
    "Нижний Новгород",
    "Казань",
    "Челябинск",
    "Омск",
    "Самара",
    "Ростов-на-Дону"
  ]

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isAgreed: checked }))
  }

  const handleSubmit = () => {
    if (!formData.isAgreed) return

    console.log("Form submited, need back", formData)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (cityBuyRef.current && !cityBuyRef.current.contains(target)) {
        setShowCityBuyOptions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={styles.rightSide__container}>
      <FormRow justifyContent="flex-start">
        <div className={styles.rightSide__formHeader}>Информация об агенте</div>
      </FormRow>

      <FormRow className={styles.smallWrap}>
        <InputContainer
          label="Ваша фамилия"
          placeholder="Введите вашу фамилию"
          value={formData.lastName}
          onChange={(value) => handleInputChange("lastName", value)}
          name="lastNameTransferApp"
          className={styles.w_50}
        />
        <InputContainer
          label="Ваше имя"
          placeholder="Введите ваше имя"
          value={formData.firstName}
          onChange={(value) => handleInputChange("firstName", value)}
          name="firstNameTransferApp"
          className={styles.w_50}
        />
      </FormRow>

      <FormRow className={styles.smallWrap}>
        <InputContainer
          label="Ваше отчество"
          placeholder="Введите ваше отчество"
          value={formData.surName}
          onChange={(value) => handleInputChange("surName", value)}
          name="surNameTransferApp"
          className={styles.w_50}
        />
        <InputContainer
          label="Телефон"
          placeholder="+7 "
          value={formData.phoneNumber}
          onChange={(value) => handleInputChange("phoneNumber", value)}
          name="phoneNumberTransfer"
          type="phone"
          className={styles.w_50}
        />
      </FormRow>

      <FormRow justifyContent="flex-start">
        <div className={styles.rightSide__formHeader}>Информация о клиенте</div>
      </FormRow>

      <FormRow className={styles.smallWrap}>
        <InputContainer
          label="Фамилия клиента"
          placeholder="Введите фамилию клиента"
          value={formData.clientLastName}
          onChange={(value) => handleInputChange("clientLastName", value)}
          name="clientLastName"
          className={styles.w_50}
        />

        <InputContainer
          label="Имя клиента"
          placeholder="Введите имя клиента"
          value={formData.clientName}
          onChange={(value) => handleInputChange("clientName", value)}
          name="clientName"
          className={styles.w_50}
        />
      </FormRow>

      <FormRow className={styles.smallWrap}>
        <InputContainer
          label="Отчество клиента"
          placeholder="Введите отчество клиента"
          value={formData.clientSurName}
          onChange={(value) => handleInputChange("clientSurName", value)}
          name="clientSurName"
          className={styles.w_50}
        />

        <InputContainer
          label="Телефон клиента"
          placeholder="+7"
          value={formData.clientPhoneNumber}
          onChange={(value) => handleInputChange("clientPhoneNumber", value)}
          name="clientPhoneNumber"
          type="phone"
          className={styles.w_50}
        />
      </FormRow>

      <FormRow>
        <div style={{ width: "100%" }} ref={cityBuyRef}>
          <CustomSelect
            label="Город, в котором планируется покупка"
            options={cityBuyOptions}
            placeholder="Не выбран"
            value={formData.cityBuy}
            show={showCityBuyOptions}
            isLoading={false}
            error=""
            onToggle={() => {
              setShowCityBuyOptions(!showCityBuyOptions)
            }}
            onSelect={(option) => {
              handleInputChange("cityBuy", option)
              setShowCityBuyOptions(false)
            }}
          />
        </div>
      </FormRow>

      <FormRow justifyContent="flex-start">
        <ActionButton
          size="medium"
          type={formData.isAgreed ? "primary" : "disabled"}
          buttonWidth={253}
          onClick={handleSubmit}
        >
          Отправить
        </ActionButton>
      </FormRow>

      <FormRow justifyContent="flex-start" className={styles.mt_0}>
        <CheckboxRow
          checked={formData.isAgreed}
          onChange={handleCheckboxChange}
          text="Нажимая на кнопку вы даете согласие"
          linkText="своих персональных данных"
          linkHref="/privatePolicy"
          name="personalDataDreamFlat"
          id="personalDataDreamFlat"
        />
      </FormRow>
    </div>
  )
}

export default ClientTransferForm