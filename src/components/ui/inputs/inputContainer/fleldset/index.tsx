import React from "react"
import styles from "./input.module.scss"
interface InputContainerProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  name: string
  type?: "text" | "phone" | "date" | string
}

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  type = "text",
}: InputContainerProps) => {
  const formatPhoneNumber = (input: string): string => {
    const numbers = input.replace(/\D/g, "")

    if (numbers.length === 0) return ""

    let cleanNumbers = numbers

    if (numbers.startsWith("8")) {
      cleanNumbers = "7" + numbers.slice(1)
    } else if (!numbers.startsWith("7")) {
      cleanNumbers = "7" + numbers
    }

    cleanNumbers = cleanNumbers.slice(0, 11)

    if (cleanNumbers.length <= 1) return `+${cleanNumbers}`
    if (cleanNumbers.length <= 4)
      return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(1)}`
    if (cleanNumbers.length <= 7)
      return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(
        1,
        4
      )} ${cleanNumbers.slice(4)}`
    if (cleanNumbers.length <= 9)
      return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(
        1,
        4
      )} ${cleanNumbers.slice(4, 7)} ${cleanNumbers.slice(7)}`

    return `+${cleanNumbers.slice(0, 1)} ${cleanNumbers.slice(
      1,
      4
    )} ${cleanNumbers.slice(4, 7)} ${cleanNumbers.slice(
      7,
      9
    )} ${cleanNumbers.slice(9, 11)}`
  }

  const formatDate = (input: string): string => {
    const numbers = input.replace(/\D/g, "")

    const limitedNumbers = numbers.slice(0, 8)

    if (limitedNumbers.length === 0) return ""
    if (limitedNumbers.length <= 2) return limitedNumbers
    if (limitedNumbers.length <= 4)
      return `${limitedNumbers.slice(0, 2)}.${limitedNumbers.slice(2)}`

    return `${limitedNumbers.slice(0, 2)}.${limitedNumbers.slice(
      2,
      4
    )}.${limitedNumbers.slice(4)}`
  }

  const handleInputChange = (inputValue: string) => {
    let formattedValue = inputValue

    if (type === "phone") {
      formattedValue = formatPhoneNumber(inputValue)
    } else if (type === "date") {
      formattedValue = formatDate(inputValue)
    }

    onChange(formattedValue)
  }

  return (
    <fieldset className={styles.input}>
      <legend className={styles.input__legend}>{label}</legend>
      <input
        className={styles.input__field}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        name={name}
        type="text"
      />
    </fieldset>
  )
}

export default Input
