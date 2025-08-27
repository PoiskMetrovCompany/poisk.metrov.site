import React, { FC, useState } from "react"
import { FormRow } from "@/components/ui/forms/formRow/FormRow"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"
import ActionButton from "@/components/ui/buttons/ActionButton"
import InputContainer from "@/components/ui/inputs/inputContainer"
import styles from "./rightSide.module.scss"
import TextAreaContainer from "@/components/ui/inputs/textArea"

interface FormDataQuestions {
    lastName: string
    name: string
    surName: string
    phoneNumber: string
    message: string
    isAgreed: boolean
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
                    onClick={handleSubmit}
                    size="medium"
                    buttonWidth={293}
                    className={styles.w_100}
                >
                    Отправить Сообщение
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