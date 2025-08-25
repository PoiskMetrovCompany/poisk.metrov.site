"use client"

import React from "react"
import styles from "./dropdown.module.scss"
import * as Select from "@radix-ui/react-select"
import Image from "next/image"
import clsx from "clsx"

interface DropdownProps {
  className?: string
  label?: string
  items: { label: string; value: string }[]
  placeholder: string
  value: string
  onChange: (value: string) => void
}

const Dropdown = ({
  className,
  items,
  placeholder,
  value,
  onChange,
  label,
}: DropdownProps) => {
  return (
    <Select.Root open={true} value={value} onValueChange={onChange}>
      <Select.Trigger
        className={clsx(styles.dropdown, className)}
        aria-label="Food"
      >
        {label && <legend className={styles.label}>{label}</legend>}
        <Select.Value placeholder={placeholder} className={styles.value} />
        <Select.Icon className={styles.Icon}>
          <Image
            src="/images/icons/arrow-down.svg"
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
          sideOffset={4}
        >
          <Select.ScrollUpButton className={styles.ScrollButton}>
            <Image
              src="/images/icons/arrow-down.svg"
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
              src="/images/icons/arrow-down.svg"
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
          {/* <Image
            src="/images/icons/check.svg"
            alt="check"
            width={12}
            height={12}
          /> */}
        </Select.ItemIndicator>
      </Select.Item>
    )
  }
)

SelectItem.displayName = "SelectItem"

export default Dropdown
