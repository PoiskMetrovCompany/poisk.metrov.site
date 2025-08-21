"use client"

import React, { useState } from "react"
import * as Select from "@radix-ui/react-select"
import Image from "next/image"
import styles from "./propertyTypeSelect.module.scss"
import IconImage from "@/components/ui/IconImage"

interface PropertyTypeSelectProps {
  onValueChange?: (value: string) => void
  defaultValue?: string
  placeholder?: string
  label?: string
  className?: string
}

const propertyTypeOptions = [
  { value: "Жилой комплекс", label: "Жилой комплекс" },
  { value: "Квартира", label: "Квартира" },
  { value: "Апартаменты", label: "Апартаменты" },
]

const PropertyTypeSelect: React.FC<PropertyTypeSelectProps> = ({
  onValueChange,
  defaultValue = "Жилой комплекс",
  placeholder = "Выберите тип недвижимости",
  label,
  className,
}) => {
  const [value, setValue] = useState(defaultValue)

  const handleValueChange = (newValue: string) => {
    setValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <div
      className={`${styles.selectRoot} ${className ? styles[className] : ""}`}
    >
      {label && <div className={styles.selectLabel}>{label}</div>}
      <Select.Root value={value} onValueChange={handleValueChange}>
        <Select.Trigger className={styles.selectTrigger}>
          <Select.Value placeholder={placeholder} />
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
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

export default PropertyTypeSelect
