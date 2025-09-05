"use client"
import React, { FC } from "react"

interface ISpouseTableProps {
  formData: Record<string, any>
  setFormData: (name: string, value: string) => void // Изменили тип для соответствия новому обработчику
  isVisible: boolean
  requiredFields?: string[]
  errors?: Record<string, boolean>
}

const SpouseTable: FC<ISpouseTableProps> = ({
  formData,
  setFormData,
  isVisible,
  requiredFields = [],
  errors = {},
}) => {
  const formatDate = (value: string): string => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) {
      return numbers
    } else if (numbers.length <= 4) {
      return numbers.slice(0, 2) + "." + numbers.slice(2)
    } else {
      return (
        numbers.slice(0, 2) +
        "." +
        numbers.slice(2, 4) +
        "." +
        numbers.slice(4, 8)
      )
    }
  }

  const formatMobilePhone = (value: string): string => {
    const numbers = value.replace(/\D/g, "")
    let formattedNumbers = numbers
    if (numbers.length > 0 && numbers[0] !== "7") {
      formattedNumbers = "7" + numbers
    }

    if (formattedNumbers.length <= 1) {
      return "+7"
    } else if (formattedNumbers.length <= 4) {
      return "+7 (" + formattedNumbers.slice(1)
    } else if (formattedNumbers.length <= 7) {
      return (
        "+7 (" + formattedNumbers.slice(1, 4) + ") " + formattedNumbers.slice(4)
      )
    } else if (formattedNumbers.length <= 9) {
      return (
        "+7 (" +
        formattedNumbers.slice(1, 4) +
        ") " +
        formattedNumbers.slice(4, 7) +
        "-" +
        formattedNumbers.slice(7)
      )
    } else {
      return (
        "+7 (" +
        formattedNumbers.slice(1, 4) +
        ") " +
        formattedNumbers.slice(4, 7) +
        "-" +
        formattedNumbers.slice(7, 9) +
        "-" +
        formattedNumbers.slice(9, 11)
      )
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(name, value) // Используем новый интерфейс
  }

  const handleDateChange = (name: string, value: string) => {
    const formattedValue = formatDate(value)
    handleInputChange(name, formattedValue)
  }

  const handlePhoneChange = (name: string, value: string) => {
    const formattedValue = formatMobilePhone(value)
    handleInputChange(name, formattedValue)
  }

  const isRequired = (fieldName: string): boolean => {
    const alwaysRequiredFields = [
      "FIOSuprug",
      "dateOfBirthTable",
      "phoneNumberTable",
      "placeOfStudy",
    ]
    return (
      requiredFields.includes(fieldName) ||
      alwaysRequiredFields.includes(fieldName)
    )
  }

  const hasError = (fieldName: string): boolean => {
    return Boolean(errors[fieldName])
  }

  const hasRequiredFieldsErrors = (): boolean => {
    const fieldsToCheck = [
      "FIOSuprug",
      "dateOfBirthTable",
      "phoneNumberTable",
      "placeOfStudy",
      "placeOfLiving",
    ]

    return fieldsToCheck.some(
      (fieldName) => isRequired(fieldName) && hasError(fieldName)
    )
  }

  const renderInputWithRequired = (
    name: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    maxLength?: number
  ) => {
    const required = isRequired(name)
    const error = hasError(name)

    return (
      <div className="custom-input-container">
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          className={`${value ? "has-value" : ""} ${error ? "error" : ""}`}
          style={{
            borderColor: error ? "#e74c3c" : undefined,
            borderWidth: error ? "1.5px" : undefined,
          }}
        />
        <label
          htmlFor={name}
          className={`custom-placeholder ${required ? "required" : ""} ${
            error ? "error" : ""
          }`}
        >
          {placeholder}
          {required && <span className="required-star"> *</span>}
        </label>
      </div>
    )
  }

  if (!isVisible) return null

  return (
    <div style={{ width: "100%" }}>
      <div
        className="formRow"
        style={{
          opacity: 1,
          maxHeight: "500px",
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <table className="inputTable">
          <caption className="tableLabel required">Данные супруга(-и)</caption>
          <tbody>
            <tr>
              <td
                colSpan={2}
                style={{
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                  borderColor: hasError("FIOSuprug") ? "#e74c3c" : undefined,
                }}
              >
                {renderInputWithRequired(
                  "FIOSuprug",
                  "ФИО супруга(-и)",
                  formData.FIOSuprug || "",
                  (e) => handleInputChange("FIOSuprug", e.target.value)
                )}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  borderColor: hasError("dateOfBirthTable")
                    ? "#e74c3c"
                    : undefined,
                }}
              >
                {renderInputWithRequired(
                  "dateOfBirthTable",
                  "Дата рождения",
                  formData.dateOfBirthTable || "",
                  (e) => handleDateChange("dateOfBirthTable", e.target.value),
                  10
                )}
              </td>
              <td
                style={{
                  borderColor: hasError("phoneNumberTable")
                    ? "#e74c3c"
                    : undefined,
                }}
              >
                {renderInputWithRequired(
                  "phoneNumberTable",
                  "Номер телефона",
                  formData.phoneNumberTable || "",
                  (e) => handlePhoneChange("phoneNumberTable", e.target.value),
                  18
                )}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  borderBottomLeftRadius: "16px",
                  borderColor: hasError("placeOfStudy") ? "#e74c3c" : undefined,
                }}
              >
                {renderInputWithRequired(
                  "placeOfStudy",
                  "Место учебы/работы, рабочий телефон",
                  formData.placeOfStudy || "",
                  (e) => handleInputChange("placeOfStudy", e.target.value)
                )}
              </td>
              <td
                style={{
                  borderBottomRightRadius: "16px",
                  borderColor: hasError("placeOfLiving") ? "#e74c3c" : undefined,
                }}
              >
                {renderInputWithRequired(
                  "placeOfLiving",
                  "Место проживания",
                  formData.placeOfLiving || "",
                  (e) => handleInputChange("placeOfLiving", e.target.value)
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {hasRequiredFieldsErrors() && (
        <div
          style={{
            color: "#e74c3c",
            fontSize: "14px",
            marginTop: "5px",
            fontWeight: "400",
            textAlign: "left",
            marginLeft: "32px",
          }}
        >
          Обязательно для заполнения
        </div>
      )}
    </div>
  )
}

export default SpouseTable