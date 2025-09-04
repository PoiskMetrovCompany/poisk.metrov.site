"use client"

import React, { useState } from "react"

import { useApiMutation } from "@/utils/hooks/use-api"

import styles from "./request.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"
import Heading2 from "@/components/ui/heading2"
import Heading3 from "@/components/ui/heading3"
import Dropdown from "@/components/ui/inputs/dropdown"
import InputContainer from "@/components/ui/inputs/inputContainer"

interface ApiData {
  last_name: string
  first_name: string
  middle_name: string
  phone: string
  client_last_name: string
  client_first_name: string
  client_middle_name: string
  client_phone: string
  city: string
}

const Request = () => {
  const [formData, setFormData] = useState({
    agentLastname: "",
    agentFirstname: "",
    agentPatronymic: "",
    agentPhone: "",
    clientLastname: "",
    clientFirstname: "",
    clientPatronymic: "",
    clientPhone: "",
    city: "",
    checked: false,
  })

  const isDisabled =
    Object.values(formData).some((value) => value === "") || !formData.checked

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value })
  }

  const submitMutation = useApiMutation<ApiData, ApiData>(
    "/crm/client-transfer",
    {
      onSuccess: (data) => {
        console.log("Запрос отправлен", data)
        setFormData({
          agentLastname: "",
          agentFirstname: "",
          agentPatronymic: "",
          agentPhone: "",
          clientLastname: "",
          clientFirstname: "",
          clientPatronymic: "",
          clientPhone: "",
          city: "",
          checked: false,
        })
      },
      onError: (error) => {
        console.log("Ошибка запроса", error)
      },
    }
  )

  const handleSubmit = () => {
    if (!formData.checked) return
    if (
      !formData.agentLastname ||
      !formData.agentFirstname ||
      !formData.agentPatronymic ||
      !formData.agentPhone ||
      !formData.clientLastname ||
      !formData.clientFirstname ||
      !formData.clientPatronymic ||
      !formData.clientPhone ||
      !formData.city
    ) {
      console.log("Пожалуйста, заполните все поля")
      return
    }

    const ApiData: ApiData = {
      last_name: formData.agentLastname,
      first_name: formData.agentFirstname,
      middle_name: formData.agentPatronymic,
      phone: formData.agentPhone,
      client_last_name: formData.clientLastname,
      client_first_name: formData.clientFirstname,
      client_middle_name: formData.clientPatronymic,
      client_phone: formData.clientPhone,
      city: formData.city,
    }
    submitMutation.mutate(ApiData)
  }

  return (
    <div className={styles.request}>
      <div className={styles.request__header}>
        <Heading2>Оформите заявку на передачу клиента</Heading2>
        <p className={styles.request__header__description}>
          Заполните все необходимые данные и мы свяжемся с вами для уточнения
          деталей
        </p>
      </div>
      <div className={styles.request__form}>
        <div className={styles.request__form__block}>
          <Heading3>Информация об агенте</Heading3>
          <div className={styles.request__form__block__fields}>
            <InputContainer
              label="Ваша фамилия"
              placeholder="Введите вашу фамилию"
              value={formData.agentLastname}
              onChange={(value) => handleInputChange("agentLastname", value)}
              name="lastname"
            />
            <InputContainer
              label="Ваше имя"
              placeholder="Введите ваше имя"
              value={formData.agentFirstname}
              onChange={(value) => handleInputChange("agentFirstname", value)}
              name="firstname"
            />
            <InputContainer
              label="Ваше отчество"
              placeholder="Введите ваше отчество"
              value={formData.agentPatronymic}
              onChange={(value) => handleInputChange("agentPatronymic", value)}
              name="patronymic"
            />
            <InputContainer
              label="Телефон"
              placeholder="+7"
              value={formData.agentPhone}
              onChange={(value) => handleInputChange("agentPhone", value)}
              name="phone"
              type="phone"
            />
          </div>
        </div>
        <div className={styles.request__form__block}>
          <Heading3>Информация о клиенте</Heading3>
          <div className={styles.request__form__block__fields}>
            <InputContainer
              label="Фамилия клиента"
              placeholder="Введите фамилию клиента"
              value={formData.clientLastname}
              onChange={(value) => handleInputChange("clientLastname", value)}
              name="lastname"
            />
            <InputContainer
              label="Имя клиента"
              placeholder="Введите имя клиента"
              value={formData.clientFirstname}
              onChange={(value) => handleInputChange("clientFirstname", value)}
              name="firstname"
            />
            <InputContainer
              label="Отчество клиента"
              placeholder="Введите отчество клиента"
              value={formData.clientPatronymic}
              onChange={(value) => handleInputChange("clientPatronymic", value)}
              name="patronymic"
            />
            <InputContainer
              label="Телефон клиента"
              placeholder="+7"
              value={formData.clientPhone}
              onChange={(value) => handleInputChange("clientPhone", value)}
              name="phone"
              type="phone"
            />
            <Dropdown
              className={styles.request__form__block__fields__dropdown}
              label="Город, в котором планируется покупка"
              items={[
                { label: "Срок сдачи", value: "1" },
                { label: "Срок сдачи2", value: "2" },
              ]}
              placeholder="Не выбран"
              value={formData.city}
              onChange={(value) => handleInputChange("city", value)}
            />
          </div>
        </div>
        <div className={styles.request__form__submit}>
          <ActionButton
            loading={submitMutation.isPending}
            disabled={submitMutation.isPending}
            className={styles.request__form__submit__button}
            onClick={handleSubmit}
            type= {formData.checked ? "primary" : "gray"}
          >
            {submitMutation.isPending ? "Отправка..." : "Отправить"}
          </ActionButton>
          <CheckboxRow
            checked={formData.checked}
            onChange={() => handleInputChange("checked", !formData.checked)}
            text="Нажимая на кнопку, вы даете согласие на обработку"
            linkText="своих персональных данных"
            linkHref="/privacy-policy"
            name="personalData"
            id="personalData"
          />
        </div>
      </div>
    </div>
  )
}

export default Request
