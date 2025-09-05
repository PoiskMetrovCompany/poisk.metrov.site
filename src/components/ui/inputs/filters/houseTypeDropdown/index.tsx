import * as Select from "@radix-ui/react-select"
import clsx from "clsx"

import React, { FC, useEffect, useRef, useState } from "react"

import styles from "./houseTypeDropdown.module.scss"

import IconImage from "@/components/ui/IconImage"

interface HouseType {
  value: string
  label: string
}

interface HouseTypeDropdownProps {
  onHouseTypeChange?: (selectedType: string) => void
  className?: string
  value?: string
}

const houseTypes: HouseType[] = [
  { value: "Жилой комплекс", label: "ЖК" },
  { value: "Квартира", label: "Квартира" },
]

const HouseTypeDropdown: FC<HouseTypeDropdownProps> = ({
  onHouseTypeChange,
  className,
  value = "",
}) => {
  const [selectedType, setSelectedType] = useState<string>(value)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedType(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
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

  const handleTypeSelect = (typeValue: string) => {
    const newSelectedType = selectedType === typeValue ? "" : typeValue
    setSelectedType(newSelectedType)
    onHouseTypeChange?.(newSelectedType)
    setIsOpen(false)
  }

  const getDisplayText = () => {
    if (!selectedType) return "Тип жилья"

    const selectedLabel = houseTypes.find(
      (t) => t.value === selectedType
    )?.label
    return selectedLabel || "Тип жилья"
  }

  return (
    <div
      className={clsx(styles.houseTypeDropdown, className)}
      ref={dropdownRef}
    >
      <button
        className={styles.houseTypeDropdown__trigger}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className={styles.houseTypeDropdown__trigger__content}>
          <span
            className={clsx(
              styles.houseTypeDropdown__trigger__text,
              (selectedType || isOpen) &&
                styles["houseTypeDropdown__trigger__text--selected"],
              isOpen && styles["houseTypeDropdown__trigger__text--open"]
            )}
          >
            {getDisplayText()}
          </span>
          <IconImage
            className={clsx(
              styles.houseTypeDropdown__trigger__icon,
              isOpen && styles.houseTypeDropdown__trigger__icon__open
            )}
            iconLink="/images/icons/arrow-down.svg"
            alt="arrow-down"
          />
        </div>
      </button>

      {isOpen && (
        <div
          className={styles.houseTypeDropdown__content}
          role="listbox"
          aria-multiselectable="false"
        >
          <div className={styles.houseTypeDropdown__content__inner}>
            {houseTypes.map((type) => (
              <label
                key={type.value}
                className={styles.houseTypeDropdown__item}
                role="option"
                aria-selected={selectedType === type.value}
              >
                <div className={styles.houseTypeDropdown__checkboxWrapper}>
                  <input
                    type="radio"
                    checked={selectedType === type.value}
                    onChange={() => handleTypeSelect(type.value)}
                    className={styles.houseTypeDropdown__checkbox}
                    aria-label={`Выбрать ${type.label}`}
                  />
                  {selectedType === type.value && (
                    <IconImage
                      className={styles.houseTypeDropdown__checkboxIcon}
                      iconLink="/images/icons/checkMark-white.svg"
                      alt="check"
                    />
                  )}
                </div>
                <span className={styles.houseTypeDropdown__item__label}>
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default HouseTypeDropdown
