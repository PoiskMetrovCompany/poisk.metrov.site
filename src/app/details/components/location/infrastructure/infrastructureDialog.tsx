"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import React, { useState } from "react"

import styles from "./infrastructure.module.scss"

import Infrastructure from "."

import ActionButton from "@/components/ui/buttons/ActionButton"

interface InfrastructureDialogProps {
  selectedInfrastructure: string[]
  toggleInfrastructure: (type: string) => void
}

const InfrastructureDialog = ({
  selectedInfrastructure,
  toggleInfrastructure,
}: InfrastructureDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <ActionButton
          type="gray"
          className={styles.infrastructure__buttonMobile}
          svgClassName={styles.infrastructure__buttonMobile__icon}
          svgSrc={"/images/icons/settings.svg"}
          svgWidth={24}
          svgHeight={24}
        >
          Фильтры
        </ActionButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <Dialog.Title className={styles.Title}>Инфраструктура</Dialog.Title>
          <Dialog.Description asChild>
            <VisuallyHidden>
              Выберите типы инфраструктуры для фильтрации объектов
            </VisuallyHidden>
          </Dialog.Description>
          <Infrastructure
            selectedInfrastructure={selectedInfrastructure}
            toggleInfrastructure={toggleInfrastructure}
            onClose={() => {
              setIsOpen(false)
            }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default InfrastructureDialog
