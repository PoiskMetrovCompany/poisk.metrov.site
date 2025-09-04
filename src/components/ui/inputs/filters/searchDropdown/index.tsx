import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"

import React, { FC, useEffect, useRef, useState } from "react"

import styles from "./searchDropdown.module.scss"

import IconImage from "@/components/ui/IconImage"

interface SearchDropdownProps {
  onSearchChange?: (value: string) => void
  value?: string
  className?: string
}

type searchItemType = "metro" | "complex" | "adress"

interface IsearchItem {
  title: string
  address: string
}

const searchItemsMetro: IsearchItem[] = [
  { title: "Речной вокзал", address: "Ленинская линия, Новосибирск" },
]

const searchItemsComplex: IsearchItem[] = [
  {
    title: "Речкуновский парк",
    address: "Новосибирская обл., Бердск, Речкуновский переулок",
  },
  {
    title: "Rich House (Рич Хаус)",
    address: "Новосибирск, Коммунистическая ул., 34",
  },
]

const searchItemsAdress: IsearchItem[] = [
  { title: "Метро Речной вокзал", address: "Ленинская линия, Новосибирск" },
  { title: "Метро Речной вокзал", address: "Ленинская линия, Новосибирск" },
  { title: "Метро Речной вокзал", address: "Ленинская линия, Новосибирск" },
  { title: "Метро Речной вокзал", address: "Ленинская линия, Новосибирск" },
  { title: "Метро Речной вокзал", address: "Ленинская линия, Новосибирск" },
  { title: "Метро Речной вокзал", address: "Ленинская линия, Новосибирск" },
  { title: "Метро Речной вокзал", address: "Ленинская линия, Новосибирск" },
  { title: "Метро Речной вокзал", address: "Ленинская линия, Новосибирск" },
  { title: "Метро Речной вокзал", address: "Ленинская линия, Новосибирск" },
  { title: "Метро Речной вокзал", address: "Ленинская линия, Новосибирск" },
  { title: "Метро Речной вокзал", address: "Ленинская линия, Новосибирск" },
]

const SearchDropdown: FC<SearchDropdownProps> = ({
  onSearchChange,
  value = "",
  className,
}) => {
  const [inputValue, setInputValue] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const popoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Синхронизируем inputValue с value из props
  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue) // Обновляем локальное состояние сразу

    // Очищаем предыдущий таймаут для popover
    if (popoverTimeoutRef.current) {
      clearTimeout(popoverTimeoutRef.current)
    }

    // Очищаем предыдущий таймаут для debounce
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    if (newValue.length > 0) {
      // Добавляем небольшую задержку для открытия popover
      popoverTimeoutRef.current = setTimeout(() => {
        setIsOpen(true)
      }, 100)
    } else {
      setIsOpen(false)
    }

    // Вызываем onSearchChange с debounce для обновления store
    if (onSearchChange) {
      debounceTimeoutRef.current = setTimeout(() => {
        onSearchChange(newValue)
      }, 500)
    }
  }

  const handleInputFocus = () => {
    // Открываем popover при фокусе только если есть текст
    if (inputValue.length > 0) {
      setIsOpen(true)
    }
  }

  const handleInputBlur = () => {
    // Не закрываем popover сразу, чтобы пользователь мог кликнуть на элементы
    // Закрытие будет происходить через onOpenChange
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  const handleItemClick = (itemLabel: string) => {
    setInputValue(itemLabel)
    setIsOpen(false)
    if (onSearchChange) {
      onSearchChange(itemLabel)
    }
    // Возвращаем фокус на input после выбора элемента
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  // Очищаем таймауты при размонтировании
  useEffect(() => {
    return () => {
      if (popoverTimeoutRef.current) {
        clearTimeout(popoverTimeoutRef.current)
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  return (
    <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Popover.Anchor asChild>
        <div className={clsx(styles.searchDropdown__trigger, className)}>
          <IconImage
            className={styles.searchDropdown__trigger__icon}
            iconLink="/images/icons/search-gray.svg"
            alt="search-icon"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Район, метро, улица, ЖК, застройщик"
            className={styles.searchDropdown__trigger__text}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          className={styles.searchDropdown__content}
          sideOffset={8}
          align="start"
          side="bottom"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
        >
          <div className={styles.searchDropdown__content__inner}>
            <div className={styles.searchDropdown__content__inner__block}>
              <div
                className={styles.searchDropdown__content__inner__block__title}
              >
                <IconImage
                  iconLink="/images/icons/search/metro.svg"
                  alt="metro"
                  className={
                    styles.searchDropdown__content__inner__block__title__icon
                  }
                />
                <span>Метро</span>
              </div>
              {searchItemsMetro.map((item, index) => (
                <div
                  key={index}
                  className={styles.searchDropdown__content__inner__block__item}
                  onClick={() => handleItemClick(item.title)}
                >
                  <span
                    className={
                      styles.searchDropdown__content__inner__block__item__title
                    }
                  >
                    {item.title}
                  </span>
                  <span
                    className={
                      styles.searchDropdown__content__inner__block__item__address
                    }
                  >
                    {item.address}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.searchDropdown__content__inner__block}>
              <div
                className={styles.searchDropdown__content__inner__block__title}
              >
                <IconImage
                  iconLink="/images/icons/search/building.svg"
                  alt="building"
                  className={
                    styles.searchDropdown__content__inner__block__title__icon
                  }
                />
                <span>ЖК</span>
              </div>
              {searchItemsComplex.map((item, index) => (
                <div
                  key={index}
                  className={styles.searchDropdown__content__inner__block__item}
                  onClick={() => handleItemClick(item.title)}
                >
                  <span
                    className={
                      styles.searchDropdown__content__inner__block__item__title
                    }
                  >
                    {item.title}
                  </span>
                  <span
                    className={
                      styles.searchDropdown__content__inner__block__item__address
                    }
                  >
                    {item.address}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.searchDropdown__content__inner__block}>
              <div
                className={styles.searchDropdown__content__inner__block__title}
              >
                <IconImage
                  iconLink="/images/icons/search/location.svg"
                  alt="location"
                  className={
                    styles.searchDropdown__content__inner__block__title__icon
                  }
                />
                <span>Адрес</span>
              </div>
              {searchItemsAdress.map((item, index) => (
                <div
                  key={index}
                  className={styles.searchDropdown__content__inner__block__item}
                  onClick={() => handleItemClick(item.title)}
                >
                  <span
                    className={
                      styles.searchDropdown__content__inner__block__item__title
                    }
                  >
                    {item.title}
                  </span>
                  <span
                    className={
                      styles.searchDropdown__content__inner__block__item__address
                    }
                  >
                    {item.address}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Popover.Arrow className={styles.searchDropdown__arrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default SearchDropdown
