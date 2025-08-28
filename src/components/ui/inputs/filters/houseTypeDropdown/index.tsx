import React, { FC, useState, useRef, useEffect } from "react"
import * as Select from "@radix-ui/react-select"
import styles from "./houseTypeDropdown.module.scss"
import IconImage from "@/components/ui/IconImage"
import clsx from "clsx"

interface HouseType {
  value: string
  label: string
}

interface HouseTypeDropdownProps {
  onHouseTypeChange?: (selectedTypes: string[]) => void
  className?: string
  value?: string[]
}

const houseTypes: HouseType[] = [
  { value: "residential-complex", label: "ЖК" },
  { value: "apartment", label: "Квартира" },
  { value: "apartments", label: "Апартаменты" },
  { value: "house", label: "Дома" },
]

const HouseTypeDropdown: FC<HouseTypeDropdownProps> = ({
  onHouseTypeChange,
  className,
  value = [],
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(value)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedTypes(value)
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

  const handleTypeToggle = (typeValue: string) => {
    const newSelectedTypes = selectedTypes.includes(typeValue)
      ? selectedTypes.filter((type) => type !== typeValue)
      : [...selectedTypes, typeValue]

    setSelectedTypes(newSelectedTypes)
    onHouseTypeChange?.(newSelectedTypes)
  }

  const getDisplayText = () => {
    if (selectedTypes.length === 0) return "Тип жилья"

    const selectedLabels = selectedTypes
      .map((typeValue) => houseTypes.find((t) => t.value === typeValue)?.label)
      .filter(Boolean)

    return selectedLabels.join(", ")
  }

  const getSelectedCount = () => {
    return selectedTypes.length
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
              (selectedTypes.length > 0 || isOpen) &&
                styles["houseTypeDropdown__trigger__text--selected"],
              isOpen && styles["houseTypeDropdown__trigger__text--open"]
            )}
          >
            {getDisplayText()}
          </span>
          {selectedTypes.length > 1 && (
            <span className={styles.houseTypeDropdown__trigger__badge}>
              {getSelectedCount()}
            </span>
          )}
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
          aria-multiselectable="true"
        >
          <div className={styles.houseTypeDropdown__content__inner}>
            {houseTypes.map((type) => (
              <label
                key={type.value}
                className={styles.houseTypeDropdown__item}
                role="option"
                aria-selected={selectedTypes.includes(type.value)}
              >
                <div className={styles.houseTypeDropdown__checkboxWrapper}>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type.value)}
                    onChange={() => handleTypeToggle(type.value)}
                    className={styles.houseTypeDropdown__checkbox}
                    aria-label={`Выбрать ${type.label}`}
                  />
                  {selectedTypes.includes(type.value) && (
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
