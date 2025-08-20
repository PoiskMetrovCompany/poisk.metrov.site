"use client"
import React, { FC, useState, useEffect, useRef } from "react"
import styles from "./customSelect.module.scss"
import clsx from "clsx"

interface ICustomSelectProps {
  label?: string
  options: string[]
  placeholder: string
  value: string
  onChange?: (value: string) => void
  isLoading?: boolean
  error?: string
  className?: string
  disabled?: boolean
  required?: boolean
  style?: React.CSSProperties // Добавляем поддержку style
}

const CustomSelect: FC<ICustomSelectProps> = ({
  label,
  options,
  placeholder,
  value,
  onChange,
  className,
  isLoading = false,
  error = "",
  disabled = false,
  required = false,
  style, // Добавляем style в деструктуризацию
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Убираем проверку на error - позволяем открывать даже при ошибке
    if (!isLoading && !disabled) {
      setIsOpen(!isOpen)
    }
  }

  const handleSelect = (option: string) => {
    if (onChange) {
      onChange(option)
    }
    setIsOpen(false)
  }

  const getDisplayValue = () => {
    if (isLoading) return "Загрузка..."
    if (error && !value) return "Ошибка загрузки" // Показываем ошибку только если нет выбранного значения
    return value || placeholder
  }

  // Исправляем условие показа dropdown - убираем проверку на error
  const shouldShowDropdown = !isLoading && isOpen && options.length > 0

  return (
    <div
      className={clsx(styles.customSelectWrapper, className)}
      ref={selectRef}
      style={style} // Применяем переданные стили
    >
      {label && (
        <label
          className={clsx(styles.selectLabel, { [styles.required]: required })}
        >
          {label}
        </label>
      )}
      <div className={clsx(styles.customSelect)}>
        <div
          className={clsx(styles.selectSelected, {
            [styles.selectArrowActive]: isOpen,
            [styles.disabled]: disabled || isLoading,
            [styles.error]: !!error,
          })}
          onClick={handleToggle}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleToggle(e as any)
            }
          }}
          style={{
            opacity: isLoading || disabled ? 0.6 : 1,
            cursor: isLoading || disabled ? "not-allowed" : "pointer",
          }}
        >
          {getDisplayValue()}
        </div>

        {shouldShowDropdown && (
          <div
            className={styles.selectItems}
            role="listbox"
            aria-label={label || placeholder}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className={clsx({
                  [styles.sameAsSelected]: value === option,
                })}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={value === option}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleSelect(option)
                  }
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
}

export default CustomSelect