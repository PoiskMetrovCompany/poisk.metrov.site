"use client"
import React, { FC } from "react"

interface IRelativeTableProps {
  index: number
  formData: Record<string, any>
  setFormData: (
    updater: (prev: Record<string, any>) => Record<string, any>
  ) => void
  requiredFields?: string[]
  errors?: Record<string, boolean>
}

const RelativeTable: FC<IRelativeTableProps> = ({
  index,
  formData,
  setFormData,
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

  const formatNameInput = (value: string): string => {
    return value.replace(/[^а-яёА-ЯЁa-zA-Z\s\-]/g, "")
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
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
    const alwaysRequiredTypes = [
      "FIORelative",
      "dateOfBirthRelative",
      "phoneNumberRelative",
      "placeOfStudyRelative",
    ]

    const isAlwaysRequired = alwaysRequiredTypes.some((type) =>
      fieldName.startsWith(type)
    )

    return requiredFields.includes(fieldName) || isAlwaysRequired
  }

  const hasError = (fieldName: string): boolean => {
    return Boolean(errors[fieldName])
  }

  const hasRequiredFieldsErrors = (): boolean => {
    const fieldsToCheck = [
      `FIORelative${index}`,
      `dateOfBirthRelative${index}`,
      `phoneNumberRelative${index}`,
      `placeOfStudyRelative${index}`,
      `placeOfLivingRelative${index}`
    ]
    
    return fieldsToCheck.some(fieldName => 
      isRequired(fieldName) && hasError(fieldName)
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

  return (
    <div>
      <div
        className="formRow table-container"
        style={{
          opacity: 1,
          transform: "translateY(0)",
          maxHeight: "220px",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <table className="inputTable">
          <caption
            className={`tableLabel ${
              requiredFields.length > 0 ? "required" : "required"
            }`}
          >
            Данные члена семьи
          </caption>
          <tbody>
            <tr>
              <td
                colSpan={2}
                style={{
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                  borderColor: hasError(`FIORelative${index}`)
                    ? "#e74c3c"
                    : undefined,
                }}
              >
                {renderInputWithRequired(
                  `FIORelative${index}`,
                  "Степень родства, ФИО члена семьи",
                  formData[`FIORelative${index}`] || "",
                  (e) => {
                    const formattedValue = formatNameInput(e.target.value)
                    handleInputChange(`FIORelative${index}`, formattedValue)
                  }
                )}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  borderColor: hasError(`dateOfBirthRelative${index}`)
                    ? "#e74c3c"
                    : undefined,
                }}
              >
                {renderInputWithRequired(
                  `dateOfBirthRelative${index}`,
                  "Дата рождения",
                  formData[`dateOfBirthRelative${index}`] || "",
                  (e) =>
                    handleDateChange(
                      `dateOfBirthRelative${index}`,
                      e.target.value
                    ),
                  10
                )}
              </td>
              <td
                className={hasError(`phoneNumberRelative${index}`) ? "error" : ""}
                style={{
                  borderColor: hasError(`phoneNumberRelative${index}`)
                    ? "#e74c3c"
                    : undefined,
                }}
              >
                {renderInputWithRequired(
                  `phoneNumberRelative${index}`,
                  "Номер телефона",
                  formData[`phoneNumberRelative${index}`] || "",
                  (e) =>
                    handlePhoneChange(
                      `phoneNumberRelative${index}`,
                      e.target.value
                    ),
                  18
                )}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  borderColor: hasError(`placeOfStudyRelative${index}`)
                    ? "#e74c3c"
                    : undefined,
                }}
              >
                {renderInputWithRequired(
                  `placeOfStudyRelative${index}`,
                  "Место учебы/работы, рабочий телефон",
                  formData[`placeOfStudyRelative${index}`] || "",
                  (e) =>
                    handleInputChange(
                      `placeOfStudyRelative${index}`,
                      e.target.value
                    )
                )}
              </td>
              <td
                className="place-of-living-cell"
                style={{
                  borderBottomRightRadius: "16px",
                  borderColor: hasError(`placeOfLivingRelative${index}`)
                    ? "#e74c3c"
                    : undefined,
                }}
              >
                {renderInputWithRequired(
                  `placeOfLivingRelative${index}`,
                  "Место проживания",
                  formData[`placeOfLivingRelative${index}`] || "",
                  (e) =>
                    handleInputChange(
                      `placeOfLivingRelative${index}`,
                      e.target.value
                    )
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {hasRequiredFieldsErrors() && (
        <div style={{
          color: '#e74c3c',
          fontSize: '14px',
          marginTop: '5px',
          fontWeight: '400',
          textAlign: "left",
          marginLeft: "32px",
        }}>
          Обязательно для заполнения
        </div>
      )}
    </div>
  )
}

export default RelativeTable