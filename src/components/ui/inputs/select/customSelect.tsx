"use client"

import clsx from "clsx"

import React, { FC, useEffect, useRef, useState } from "react"

import styles from "./customSelect.module.scss"

interface ICustomSelectProps {
  label?: string
  options: string[]
  placeholder: string
  value: string
  show?: boolean
  onChange?: (value: string) => void
  onSelect?: (value: string) => void
  onToggle?: () => void
  isLoading?: boolean
  error?: string | boolean
  className?: string
  labelClassName?: string
  disabled?: boolean
  required?: boolean
  style?: React.CSSProperties
  ropSelect?: boolean
}

const CustomSelect: FC<ICustomSelectProps> = ({
  label,
  options,
  placeholder,
  value,
  show,
  onChange,
  onSelect,
  onToggle,
  className,
  labelClassName,
  isLoading = false,
  error = "",
  disabled = false,
  required = false,
  style,
  ropSelect = false,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  // Use external show prop if provided, otherwise use internal state
  const isOpen = show !== undefined ? show : internalIsOpen

  const hasValidationError = typeof error === "boolean" ? error : false
  const errorMessage = typeof error === "string" ? error : ""

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        if (onToggle) {
          onToggle()
        } else {
          setInternalIsOpen(false)
        }
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onToggle])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        if (onToggle) {
          onToggle()
        } else {
          setInternalIsOpen(false)
        }
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onToggle])

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoading && !disabled) {
      if (onToggle) {
        onToggle()
      } else {
        setInternalIsOpen(!internalIsOpen)
      }
    }
  }

  const handleSelect = (option: string) => {
    if (onSelect) {
      onSelect(option)
    } else if (onChange) {
      onChange(option)
    }

    if (onToggle) {
      onToggle()
    } else {
      setInternalIsOpen(false)
    }
  }

  const getDisplayValue = () => {
    if (isLoading) return "Загрузка..."
    if (errorMessage && !value) return "Ошибка загрузки"
    return value || placeholder
  }

  const shouldShowDropdown = !isLoading && isOpen && options.length > 0

  return (
    <div className={styles.customSelectWrapper} ref={selectRef} style={style}>
      {label && (
        <label
          className={clsx(styles.selectLabel, labelClassName, {
            [styles.required]: required,
            [styles.error]: hasValidationError,
          })}
        >
          {label}
        </label>
      )}
      <div
        className={clsx(styles.customSelect, ropSelect && styles.yellowSelect)}
      >
        <div
          className={clsx(styles.selectSelected, className, {
            [styles.selectArrowActive]: isOpen,
            [styles.disabled]: disabled || isLoading,
            [styles.error]: !!errorMessage || hasValidationError,
            [styles.selectTrigger]: ropSelect,
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
            borderColor: hasValidationError ? "#e74c3c" : undefined,
            borderWidth: hasValidationError ? "1.5px" : undefined,
          }}
        >
          {getDisplayValue()}
        </div>

        {shouldShowDropdown && (
          <div
            className={clsx(
              styles.selectItems,
              ropSelect && styles.selectDropdown
            )}
            role="listbox"
            aria-label={label || placeholder}
            style={{
              position: ropSelect ? "relative" : undefined,
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                className={clsx({
                  [styles.sameAsSelected]: value === option,
                  [styles.selectOption]: ropSelect,
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

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      {hasValidationError && !errorMessage && (
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

export default CustomSelect
