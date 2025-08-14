"use client"
import React, { useState } from "react"
import styles from "./request.module.scss"
import Heading2 from "@/components/ui/heading2"
import Heading3 from "@/components/ui/heading3"
import InputContainer from "@/components/ui/inputs/inputContainer"
import Dropdown from "@/components/ui/inputs/dropdown"
import ActionButton from "@/components/ui/buttons/ActionButton"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"

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
            disabled={isDisabled}
            className={styles.request__form__submit__button}
          >
            Отправить заявку
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
