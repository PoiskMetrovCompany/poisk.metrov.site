import React, { FC, useState, useRef, useEffect } from "react"
import styles from "./roomCountDropdown.module.scss"
import IconImage from "@/components/ui/IconImage"
import clsx from "clsx"
import { useScreenSize } from "@/utils/hooks/use-screen-size"

interface RoomCount {
  value: string
  label: string
}

interface RoomCountDropdownProps {
  onRoomCountChange?: (selectedCounts: string[]) => void
  className?: string
  value?: string[]
}

const roomCounts: RoomCount[] = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5+", label: "5+" },
  { value: "studio", label: "Студия" },
]

const RoomCountDropdown: FC<RoomCountDropdownProps> = ({
  onRoomCountChange,
  className,
  value = [],
}) => {
  const [selectedCounts, setSelectedCounts] = useState<string[]>(value)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { isLaptop } = useScreenSize()

  useEffect(() => {
    setSelectedCounts(value)
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

  const handleCountToggle = (countValue: string) => {
    const newSelectedCounts = selectedCounts.includes(countValue)
      ? selectedCounts.filter((count) => count !== countValue)
      : [...selectedCounts, countValue]

    setSelectedCounts(newSelectedCounts)
    onRoomCountChange?.(newSelectedCounts)
  }

  const getDisplayText = () => {
    if (selectedCounts.length === 0)
      return isLaptop ? "Кол-во комнат" : "Комнат"

    // Разделяем числовые значения и студию
    const numericValues = selectedCounts
      .filter((count) => count !== "studio")
      .map((count) => parseInt(count))
      .sort((a, b) => a - b)

    const hasStudio = selectedCounts.includes("studio")

    // Формируем диапазоны из последовательных чисел
    const ranges: string[] = []
    let start = numericValues[0]
    let end = start

    for (let i = 1; i < numericValues.length; i++) {
      if (numericValues[i] === end + 1) {
        end = numericValues[i]
      } else {
        ranges.push(start === end ? start.toString() : `${start}-${end}`)
        start = numericValues[i]
        end = start
      }
    }

    if (numericValues.length > 0) {
      ranges.push(start === end ? start.toString() : `${start}-${end}`)
    }

    // Добавляем студию в конец через запятую
    const result = [...ranges]
    if (hasStudio) {
      result.push("Студия")
    }

    return result.join(", ")
  }

  const getSelectedCount = () => {
    return selectedCounts.length
  }

  return (
    <div
      className={clsx(styles.roomCountDropdown, className)}
      ref={dropdownRef}
    >
      <button
        className={styles.roomCountDropdown__trigger}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className={styles.roomCountDropdown__trigger__content}>
          <span
            className={clsx(
              styles.roomCountDropdown__trigger__text,
              (selectedCounts.length > 0 || isOpen) &&
                styles["roomCountDropdown__trigger__text--selected"],
              isOpen && styles["roomCountDropdown__trigger__text--open"]
            )}
          >
            {getDisplayText()}
          </span>
          {selectedCounts.length > 1 && (
            <span className={styles.roomCountDropdown__trigger__badge}>
              {getSelectedCount()}
            </span>
          )}
          <IconImage
            className={clsx(
              styles.roomCountDropdown__trigger__icon,
              isOpen && styles.roomCountDropdown__trigger__icon__open
            )}
            iconLink="/images/icons/arrow-down.svg"
            alt="arrow-down"
          />
        </div>
      </button>

      {isOpen && (
        <div
          className={styles.roomCountDropdown__content}
          role="listbox"
          aria-multiselectable="true"
        >
          <div className={styles.roomCountDropdown__content__inner}>
            <div className={styles.roomCountDropdown__row}>
              {roomCounts.slice(0, 5).map((count) => (
                <button
                  key={count.value}
                  className={clsx(
                    styles.roomCountDropdown__chip,
                    selectedCounts.includes(count.value) &&
                      styles["roomCountDropdown__chip--selected"]
                  )}
                  onClick={() => handleCountToggle(count.value)}
                  type="button"
                  role="option"
                  aria-selected={selectedCounts.includes(count.value)}
                >
                  {count.label}
                </button>
              ))}
            </div>
            <div className={styles.roomCountDropdown__row}>
              <button
                className={clsx(
                  styles.roomCountDropdown__chip,
                  styles.roomCountDropdown__chip__studio,
                  selectedCounts.includes("studio") &&
                    styles["roomCountDropdown__chip--selected"]
                )}
                onClick={() => handleCountToggle("studio")}
                type="button"
                role="option"
                aria-selected={selectedCounts.includes("studio")}
              >
                Студия
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomCountDropdown
