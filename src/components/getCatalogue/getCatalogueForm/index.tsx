import React, { FC, useState } from "react"
import styles from "./leftSide.module.scss"
import ActionButton from "@/components/ui/buttons/ActionButton"
import { FormRow } from "@/components/ui/forms/formRow/FormRow"
import InputContainer from "@/components/ui/inputs/inputContainer"
import CheckboxRow from "@/components/ui/checkbox/personalProcessing"

import clsx from "clsx"

interface FormDataGetCatalogue {
  firstName: string;
  phoneNumber: string;
  isAgreed: boolean;
}

interface GetCatalogueFormProps {
  className?: string;
}

const GetCatalogueForm: FC<GetCatalogueFormProps> = ({ className }) => {
  const [formData, setFormData] = useState<FormDataGetCatalogue>({
    firstName: "",
    phoneNumber: "",
    isAgreed: false
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isAgreed: checked }))
  }

  const handleSubmit = () => {
    if (!formData.isAgreed) return
    console.log("Form submitted, need back", formData)
  }

  return (
    <div className={clsx(styles.leftSide, className)}>
      <div className={styles.leftSide__header}>
        Получить каталог
      </div>
      <div className={styles.leftSide__description}>
        Оставьте номер телефона, и мы отправим каталог вам{" "}
        <span className={styles.leftSide__marker}>на мессенджер</span>
      </div>
      <FormRow className={styles.smallWrap}>
        <InputContainer
          label="Ваше имя"
          placeholder="Ваше имя"
          value={formData.firstName}
          onChange={(value) => handleInputChange("firstName", value)}
          name="firstNameGetCatalogue"
        />
        <InputContainer
          label="Телефон"
          placeholder=""
          value={formData.phoneNumber}
          onChange={(value) => handleInputChange("phoneNumber", value)}
          name="phone"
          prefix="+7"
          className={styles.w_50}
        />
      </FormRow>
      <FormRow className={clsx(styles.smallWrap)}>
        <ActionButton
          type="whatsapp"
          size="medium"
          className={styles.getCatalogue__button}
          svgSrc="/images/icons/whatsapp.svg"
          svgAlt="Whatsapp"
          svgHeight={30}
          svgWidth={30}
        >
          <span className={styles.buttonText__full}>Получить в WhatsApp</span>
          <span className={styles.buttonText__short}>в WhatsApp</span>
        </ActionButton>
        <ActionButton
          type="telegram"
          size="medium"
          svgSrc="/images/icons/telegram.svg"
          svgHeight={30}
          svgWidth={30}
          className={styles.getCatalogue__button}
        >
          <span className={styles.buttonText__full}>Получить в Telegram</span>
          <span className={styles.buttonText__short}>в Telegram</span>
        </ActionButton>
      </FormRow>

      <FormRow justifyContent="flex-start">
          <ActionButton
            type="primary"
            size="medium"
            svgHeight={30}
            svgWidth={30}
            buttonWidth={159}
            onClick={handleSubmit}
            className={clsx(styles.fullWidth)}
          >
            Отправить
          </ActionButton>

      </FormRow>

      <FormRow className={clsx(styles.mt_0, styles.smallWrap)} justifyContent="flex-start">
          <CheckboxRow
            checked={formData.isAgreed}
            onChange={handleCheckboxChange}
            text="Нажимая на кнопку вы даете согласие"
            linkText="своих персональных данных"
            linkHref="/privatePolicy"
            name="getCatalogue"
            id="getCatalogue"
          />
        </FormRow>
    </div>
  )
}

export default GetCatalogueForm