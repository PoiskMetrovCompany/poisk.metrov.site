"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import React from "react"

import styles from "./menuPopup.module.scss"

import MenuInfo from "./menuInfo"
import MenuSlider from "./menuSlider"

interface IMenuPopupProps {
  isOpen: boolean
  onClose: () => void
}

const MenuPopup = ({ isOpen, onClose }: IMenuPopupProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} onClick={onClose}>
          <Dialog.Content className={styles.Content}>
            <Dialog.Title asChild>
              <VisuallyHidden>Info menu</VisuallyHidden>
            </Dialog.Title>
            <Dialog.Description asChild>
              <VisuallyHidden>
                Информационное меню с дополнительными опциями
              </VisuallyHidden>
            </Dialog.Description>
            <MenuInfo onClick={(e) => e.stopPropagation()} onClose={onClose} />
            <MenuSlider onClick={(e) => e.stopPropagation()} />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MenuPopup
