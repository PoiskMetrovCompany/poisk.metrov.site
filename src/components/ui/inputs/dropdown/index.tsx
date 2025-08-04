"use client"

import React from "react"
import styles from "./dropdown.module.scss"
import { Select } from "radix-ui"
import Image from "next/image"
import clsx from "clsx"

interface DropdownProps {
  items: { label: string; value: string }[]
  placeholder: string
  value: string
  onChange: (value: string) => void
}

const Dropdown = ({ items, placeholder, value, onChange }: DropdownProps) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className={styles.dropdown} aria-label="Food">
        <Select.Value placeholder={placeholder} className={styles.value} />
        <Select.Icon className={styles.Icon}>
          <Image
            src="/images/arrow-down.svg"
            alt="chevron-down"
            width={12}
            height={8}
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={styles.Content}
          side="bottom"
          align="center"
          position="popper"
          alignOffset={300}
          sideOffset={0}
        >
          <Select.ScrollUpButton className={styles.ScrollButton}>
            <Image
              src="/images/arrow-down.svg"
              alt="chevron-down"
              width={12}
              height={8}
            />
          </Select.ScrollUpButton>
          <Select.Viewport className={styles.Viewport}>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={styles.ScrollButton}>
            <Image
              src="/images/arrow-down.svg"
              alt="chevron-down"
              width={12}
              height={8}
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

interface SelectItemProps extends React.ComponentProps<typeof Select.Item> {
  children: React.ReactNode
  className?: string
}

const SelectItem = React.forwardRef(
  (
    { children, className, ...props }: SelectItemProps,
    forwardedRef: React.Ref<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        className={clsx(styles.Item, className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className={styles.ItemIndicator}>
          <Image src="/images/check.svg" alt="check" width={12} height={12} />
        </Select.ItemIndicator>
      </Select.Item>
    )
  }
)

SelectItem.displayName = "SelectItem"

export default Dropdown
