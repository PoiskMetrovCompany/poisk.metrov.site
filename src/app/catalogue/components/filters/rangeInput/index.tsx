import React, { FC, memo, useState, useEffect, useCallback } from "react"
import styles from "./rangeInput.module.scss"

interface IRangeInput {
  value: [number, number]
  onValueChange: (range: [number, number]) => void
  unit?: string
}

const RangeInput: FC<IRangeInput> = memo(
  ({ value, onValueChange, unit = "₽" }) => {
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

        const numValue = newValue === "" ? 0 : Number(newValue)
        if (!isNaN(numValue)) {
          onValueChange([numValue, value[1] || 0])
        }
      },
      [onValueChange, value[1]]
    )

    const handleToChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setToValue(newValue)

        const numValue = newValue === "" ? 0 : Number(newValue)
        if (!isNaN(numValue)) {
          onValueChange([value[0] || 0, numValue])
        }
      },
      [onValueChange, value[0]]
    )

    return (
      <div className={styles.rangeInput}>
        <div className={styles.rangeInput__form}>
          <span className={styles.rangeInput__form__text}>от</span>
          <input
            className={styles.rangeInput__form__input}
            type="text"
            value={fromValue}
            onChange={handleFromChange}
          />
          <span className={styles.rangeInput__form__type}>{unit}</span>
        </div>
        <div className={styles.rangeInput__form}>
          <span className={styles.rangeInput__form__text}>до</span>
          <input
            className={styles.rangeInput__form__input}
            type="text"
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
