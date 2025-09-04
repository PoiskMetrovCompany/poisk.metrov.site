import clsx from "clsx"

import React, { FC, useEffect, useMemo, useRef, useState } from "react"

import { useScreenSize } from "@/utils/hooks/use-screen-size"

import styles from "./roomCountDropdown.module.scss"

import IconImage from "@/components/ui/IconImage"

interface RoomCount {
  value: string
  label: string
}

interface RoomCountDropdownProps {
  showCount?: boolean
  onRoomCountChange?: (selectedCount: string) => void
  className?: string
  contentClassName?: string
  value?: string
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
  showCount = true,
  className,
  contentClassName,
  value = "",
}) => {
  const [selectedCount, setSelectedCount] = useState<string>(value)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { isLaptop } = useScreenSize()

  const valueString = useMemo(() => value, [value])

  useEffect(() => {
    setSelectedCount(value)
  }, [valueString])

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

  const handleCountSelect = (countValue: string) => {
    const newSelectedCount = selectedCount === countValue ? "" : countValue
    setSelectedCount(newSelectedCount)
    onRoomCountChange?.(newSelectedCount)
    setIsOpen(false)
  }

  const getDisplayText = () => {
    if (!selectedCount) return isLaptop ? "Кол-во комнат" : "Комнат"

    const count = roomCounts.find((c) => c.value === selectedCount)
    return count ? count.label : selectedCount
  }

  const getSelectedCount = () => {
    return selectedCount ? 1 : 0
  }

  return (
    <div
      className={clsx(styles.roomCountDropdown, className)}
      ref={dropdownRef}
    >
      <button
        className={clsx(styles.roomCountDropdown__trigger, className)}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className={styles.roomCountDropdown__trigger__content}>
          <span
            className={clsx(
              styles.roomCountDropdown__trigger__text,
              (selectedCount || isOpen) &&
                styles["roomCountDropdown__trigger__text--selected"],
              isOpen && styles["roomCountDropdown__trigger__text--open"]
            )}
          >
            {getDisplayText()}
          </span>
          {selectedCount && showCount && (
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
          className={clsx(styles.roomCountDropdown__content, contentClassName)}
          role="listbox"
          aria-multiselectable="false"
        >
          <div className={styles.roomCountDropdown__content__inner}>
            <div className={styles.roomCountDropdown__row}>
              {roomCounts.slice(0, 5).map((count) => (
                <button
                  key={count.value}
                  className={clsx(
                    styles.roomCountDropdown__chip,
                    selectedCount === count.value &&
                      styles["roomCountDropdown__chip--selected"]
                  )}
                  onClick={() => handleCountSelect(count.value)}
                  type="button"
                  role="option"
                  aria-selected={selectedCount === count.value}
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
                  selectedCount === "studio" &&
                    styles["roomCountDropdown__chip--selected"]
                )}
                onClick={() => handleCountSelect("studio")}
                type="button"
                role="option"
                aria-selected={selectedCount === "studio"}
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
