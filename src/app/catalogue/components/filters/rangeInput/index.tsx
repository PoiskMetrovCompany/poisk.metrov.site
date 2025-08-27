import clsx from "clsx"

import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import styles from "./rangeInput.module.scss"

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

    // Используем ref для отслеживания предыдущего значения
    const prevValueRef = useRef<[number | null, number | null]>(value)

    // Обновляем локальное состояние при изменении пропсов
    useEffect(() => {
      const prevValue = prevValueRef.current
      // Проверяем, действительно ли значения изменились
      if (prevValue[0] !== value[0] || prevValue[1] !== value[1]) {
        setFromValue(value[0]?.toString() || "")
        setToValue(value[1]?.toString() || "")
        prevValueRef.current = value
      }
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
