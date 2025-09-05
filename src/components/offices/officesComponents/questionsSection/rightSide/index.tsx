import React, { FC, useState } from "react"

import styles from "./rightSide.module.scss"

import ActionButton from "@/components/ui/buttons/ActionButton"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"
import { FormRow } from "@/components/ui/forms/formRow/FormRow"
import InputContainer from "@/components/ui/inputs/inputContainer"
import TextAreaContainer from "@/components/ui/inputs/textArea"

import { useApiMutation } from "@/utils/hooks/use-api"

interface FormDataQuestions {
  lastName: string
  name: string
  surName: string
  phoneNumber: string
  message: string
  isAgreed: boolean
}

interface ApiRequestData{
    name: string
    phone: string
    comment: string
    city: string
}

const QuestionsForm: FC = () => {
  const [formData, setFormData] = useState<FormDataQuestions>({
    lastName: "",
    name: "",
    surName: "",
    phoneNumber: "",
    message: "",
    isAgreed: false,
  })

  const submitMutation = useApiMutation<ApiRequestData, ApiRequestData>(
    "/crm/store",
    {
        onSuccess: (data) => {
            console.log("Запрос отправлен", data)
            setFormData({
                lastName: "",
                name: "",
                surName: "",
                phoneNumber: "",
                message: "",
                isAgreed: false,
            })
        },
        onError: (error) => {
            console.log("Ошибка при отправке запроса", error)
        }
    }
  )

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isAgreed: checked }))
  }

  const handleSubmit = () => {
    if (!formData.isAgreed) return

    if(!formData.lastName || !formData.name || !formData.surName || !formData.phoneNumber || !formData.message) {
        console.log("Пожалуйста, заполните все поля")
        return
    }

    const apiData: ApiRequestData = {
        name: `${formData.lastName} ${formData.name} ${formData.surName}` . trim(),
        phone: formData.phoneNumber,
        comment: formData.message,
        city: "novosibirsk",
    }

    submitMutation.mutate(apiData)
  }

  return (
    <div className={styles.QuestionsForm}>
      <FormRow className={styles.smallWrap}>
        <InputContainer
          label="Ваша фамилия"
          placeholder="Введите вашу фамилию"
          onChange={(value) => handleInputChange("lastName", value)}
          value={formData.lastName}
          name="lastNameOffices"
          className={styles.w_50}
        />
        <InputContainer
          label="Ваше имя"
          placeholder="Введите ваше имя"
          onChange={(value) => handleInputChange("name", value)}
          value={formData.name}
          name="nameOffices"
          className={styles.w_50}
        />
      </FormRow>

      <FormRow className={styles.smallWrap}>
        <InputContainer
          label="Ваше отчество"
          placeholder="Введите ваше отчество"
          onChange={(value) => handleInputChange("surName", value)}
          value={formData.surName}
          name="surNameOffices"
          className={styles.w_50}
        />
        <InputContainer
          label="Телефон"
          placeholder="+7 "
          onChange={(value) => handleInputChange("phoneNumber", value)}
          value={formData.phoneNumber}
          name="phoneNumberOffices"
          type="phone"
          className={styles.w_50}
        />
      </FormRow>

      <FormRow>
        <TextAreaContainer
          label="Сообщение"
          placeholder=""
          onChange={(value) => handleInputChange("message", value)}
          value={formData.message}
          name="message"
          resize="none"
        />
      </FormRow>

      <FormRow justifyContent="flex-start">
        <ActionButton
          type={formData.isAgreed ? "primary" : "disabled"}
          loading = {submitMutation.isPending}
          disabled = {submitMutation.isPending}
          onClick={handleSubmit}
          size="medium"
          buttonWidth={293}
          className={styles.w_100}
        >
          {submitMutation.isPending ? "Отправка..." : "Отправить"}
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

export default QuestionsForm
