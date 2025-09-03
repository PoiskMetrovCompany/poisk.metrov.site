"use client"

import * as Select from "@radix-ui/react-select"

import React, { useState } from "react"

import { useFilters } from "@/contexts/FiltersContext"

import styles from "./propertyTypeSelect.module.scss"

import ActionButton from "../../buttons/ActionButton"

import IconImage from "@/components/ui/IconImage"

interface PropertyTypeSelectProps {
  onValueChange?: (value: string) => void
  defaultValue?: string
  placeholder?: string
  label?: string
  className?: string
}

const propertyTypeOptions = [
  { value: "Жилой комплекс", label: "ЖК" },
  { value: "Квартира", label: "Квартира" },
]

const PropertyTypeSelect: React.FC<PropertyTypeSelectProps> = ({
  onValueChange,
  defaultValue = "Жилой комплекс",
  placeholder = "Выберите тип недвижимости",
  label,
  className,
}) => {
  const { selectedPropertyType, setSelectedPropertyType } = useFilters()
  const [isOpen, setIsOpen] = useState(false)

  const handleValueChange = (newValue: string) => {
    setSelectedPropertyType(newValue)
    onValueChange?.(newValue)
  }

  const handleApply = () => {
    setIsOpen(false)
  }

  // Функция для отображения правильного текста в селекте
  const getDisplayValue = (value: string) => {
    if (value === "Жилой комплекс") {
      return "Жилой комплекс"
    }
    return value
  }

  return (
    <div
      className={`${styles.selectRoot} ${className ? styles[className] : ""}`}
    >
      {label && <div className={styles.selectLabel}>{label}</div>}
      <Select.Root
        value={selectedPropertyType}
        onValueChange={handleValueChange}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Select.Trigger className={styles.selectTrigger}>
          <Select.Value placeholder={placeholder}>
            {selectedPropertyType
              ? getDisplayValue(selectedPropertyType)
              : placeholder}
          </Select.Value>
          <Select.Icon className={styles.selectIcon}>
            <IconImage
              iconLink="/images/icons/chevron-down-orange.svg"
              alt="Выберите"
              className={styles.selectIcon_icon}
            />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={styles.selectContent}
            position="popper"
            sideOffset={5}
            side="bottom"
            align="start"
            avoidCollisions={false}
          >
            <Select.Viewport className={styles.selectViewport}>
              {propertyTypeOptions.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={styles.selectItem}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className={styles.selectItemIndicator}>
                    <IconImage
                      iconLink="/images/icons/ok-orange.svg"
                      alt="Выбрано"
                      className={styles.selectItemIndicator_icon}
                    />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            <ActionButton
              className={styles.selectMobileApplyButton}
              onClick={handleApply}
            >
              Применить
            </ActionButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

export default PropertyTypeSelect
