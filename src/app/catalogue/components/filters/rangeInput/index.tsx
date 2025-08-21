import React, { FC, memo, useState, useEffect, useCallback } from "react"
import styles from "./rangeInput.module.scss"
import clsx from "clsx"

interface IRangeInput {
  value: [number | null, number | null]
  onValueChange: (range: [number | null, number | null]) => void
  unit?: string
  className?: string
  formClassName?: string
}

const RangeInput: FC<IRangeInput> = memo(
  ({ value, onValueChange, unit = "₽", className, formClassName }) => {
    // Локальное состояние для input полей
    const [fromValue, setFromValue] = useState(value[0]?.toString() || "")
    const [toValue, setToValue] = useState(value[1]?.toString() || "")

    // Обновляем локальное состояние при изменении пропсов
    useEffect(() => {
      setFromValue(value[0]?.toString() || "")
      setToValue(value[1]?.toString() || "")
    }, [value])

    const handleFromChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setFromValue(newValue)

        if (newValue === "") {
          // Если поле пустое, устанавливаем null
          onValueChange([null, value[1]])
        } else {
          const numValue = Number(newValue)
          if (!isNaN(numValue)) {
            onValueChange([numValue, value[1]])
          }
        }
      },
      [onValueChange, value]
    )

    const handleToChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setToValue(newValue)

        if (newValue === "") {
          // Если поле пустое, устанавливаем null
          onValueChange([value[0], null])
        } else {
          const numValue = Number(newValue)
          if (!isNaN(numValue)) {
            onValueChange([value[0], numValue])
          }
        }
      },
      [onValueChange, value]
    )

    return (
      <div className={clsx(styles.rangeInput, className)}>
        <div className={clsx(styles.rangeInput__form, formClassName)}>
          {/* <span className={styles.rangeInput__form__text}>от</span> */}
          <input
            className={styles.rangeInput__form__input}
            type="number"
            value={fromValue}
            placeholder="от"
            onChange={handleFromChange}
          />
          <span className={styles.rangeInput__form__type}>{unit}</span>
        </div>
        <div className={clsx(styles.rangeInput__form, formClassName)}>
          {/* <span className={styles.rangeInput__form__text}>до</span> */}
          <input
            placeholder="до"
            className={styles.rangeInput__form__input}
            type="number"
            value={toValue}
            onChange={handleToChange}
          />
          <span className={styles.rangeInput__form__type}>{unit}</span>
        </div>
      </div>
    )
  }
)

RangeInput.displayName = "RangeInput"

export default RangeInput
