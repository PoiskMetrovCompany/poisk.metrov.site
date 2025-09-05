import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import React, { FC, useState } from "react"

import styles from "./filterDialog.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"

interface FilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentValues: {
    houseType: string
    roomCount: string
    priceRange: [number | null, number | null]
    searchValue: string
  }
  onHouseTypeChange: (type: string) => void
  onRoomCountChange: (count: string) => void
  onPriceChange: (range: [number | null, number | null]) => void
  onSearchChange: (value: string) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

const houseTypes = [
  { value: "Жилой комплекс", label: "ЖК" },
  { value: "Квартира", label: "Квартира" },
]

const roomCounts = [
  { value: "studio", label: "Студия" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5+", label: "5+" },
]

const FilterDialog: FC<FilterDialogProps> = ({
  open,
  onOpenChange,
  currentValues,
  onHouseTypeChange,
  onRoomCountChange,
  onPriceChange,
  onSearchChange,
  onApplyFilters,
  onResetFilters,
}) => {
  const [localPriceMin, setLocalPriceMin] = useState<string>(
    currentValues.priceRange[0]?.toString() || ""
  )
  const [localPriceMax, setLocalPriceMax] = useState<string>(
    currentValues.priceRange[1]?.toString() || ""
  )

  const handleApplyFilters = () => {
    // Применяем цены перед закрытием
    const minPrice = localPriceMin ? parseInt(localPriceMin) : null
    const maxPrice = localPriceMax ? parseInt(localPriceMax) : null
    onPriceChange([minPrice, maxPrice])

    onApplyFilters()
    onOpenChange(false)
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  const handleReset = () => {
    setLocalPriceMin("")
    setLocalPriceMax("")
    onResetFilters()
  }

  const handleHouseTypeToggle = (value: string) => {
    const newType = currentValues.houseType === value ? "" : value
    onHouseTypeChange(newType)
  }

  const handleRoomCountToggle = (value: string) => {
    const newCount = currentValues.roomCount === value ? "" : value
    onRoomCountChange(newCount)
  }

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPriceMin(e.target.value)
  }

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPriceMax(e.target.value)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content
          className={styles.dialogContent}
          onEscapeKeyDown={handleClose}
          onInteractOutside={handleClose}
        >
          <Dialog.Title asChild>
            <VisuallyHidden>Фильтры поиска недвижимости</VisuallyHidden>
          </Dialog.Title>
          <Dialog.Description asChild>
            <VisuallyHidden>
              Настройте фильтры для поиска: тип жилья, количество комнат и
              ценовой диапазон
            </VisuallyHidden>
          </Dialog.Description>

          <div className={styles.filterDialog}>
            {/* Header с кнопкой закрытия */}
            <div className={styles.filterDialog__header}>
              <h2 className={styles.filterDialog__header__title}>Фильтры</h2>
              <button
                onClick={handleClose}
                className={styles.filterDialog__header__close}
                aria-label="Закрыть фильтры"
              >
                <IconImage
                  iconLink="/images/icons/close.svg"
                  alt="Закрыть"
                  className={styles.filterDialog__header__close__icon}
                />
              </button>
            </div>

            {/* Контент с фильтрами */}
            <div className={styles.filterDialog__content}>
              {/* Тип жилья */}
              <div className={styles.filterDialog__row}>
                <div className={styles.filterDialog__row__label}>
                  <h3>Тип жилья</h3>
                </div>
                <div className={styles.filterDialog__row__controls}>
                  <div className={styles.filterDialog__chips}>
                    {houseTypes.map((type) => (
                      <button
                        key={type.value}
                        className={`${styles.filterDialog__chip} ${
                          currentValues.houseType === type.value
                            ? styles.filterDialog__chip_active
                            : ""
                        }`}
                        onClick={() => handleHouseTypeToggle(type.value)}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Количество комнат */}
              <div className={styles.filterDialog__row}>
                <div className={styles.filterDialog__row__label}>
                  <h3>Количество комнат</h3>
                </div>
                <div className={styles.filterDialog__row__controls}>
                  <div className={styles.filterDialog__chips}>
                    {roomCounts.map((room) => (
                      <button
                        key={room.value}
                        className={`${styles.filterDialog__chip} ${
                          currentValues.roomCount === room.value
                            ? styles.filterDialog__chip_active
                            : ""
                        }`}
                        onClick={() => handleRoomCountToggle(room.value)}
                      >
                        {room.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Цена */}
              <div className={styles.filterDialog__row}>
                <div className={styles.filterDialog__row__label}>
                  <h3>Цена</h3>
                </div>
                <div className={styles.filterDialog__row__controls}>
                  <div className={styles.filterDialog__priceInputs}>
                    <input
                      type="number"
                      placeholder="От"
                      value={localPriceMin}
                      onChange={handlePriceMinChange}
                      className={styles.filterDialog__priceInput}
                    />
                    <input
                      type="number"
                      placeholder="До"
                      value={localPriceMax}
                      onChange={handlePriceMaxChange}
                      className={styles.filterDialog__priceInput}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer с кнопками */}
            <div className={styles.filterDialog__footer}>
              <ActionButton
                type="gray"
                onClick={handleReset}
                className={styles.filterDialog__footer__reset}
              >
                Сбросить
              </ActionButton>
              <ActionButton
                type="primary"
                onClick={handleApplyFilters}
                className={styles.filterDialog__footer__apply}
              >
                Показать результаты
              </ActionButton>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default FilterDialog
