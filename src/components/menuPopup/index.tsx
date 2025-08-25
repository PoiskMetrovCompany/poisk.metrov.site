"use client"
import React from "react"
import { Dialog } from "radix-ui"
import styles from "./menuPopup.module.scss"

import MenuSlider from "./menuSlider"
import MenuInfo from "./menuInfo"

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
            <Dialog.Title className={styles.Title}>Info menu</Dialog.Title>
            <MenuInfo onClick={(e) => e.stopPropagation()} />
            <MenuSlider onClick={(e) => e.stopPropagation()} />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MenuPopup
