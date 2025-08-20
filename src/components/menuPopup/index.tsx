"use client"
import React, { useState } from "react"
import { Dialog } from "radix-ui"
import styles from "./menuPopup.module.scss"

import MenuSlider from "./menuSlider"
import MenuInfo from "./menuInfo"

const MenuPopup = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {/* <Dialog.Trigger asChild>
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
      </Dialog.Trigger> */}
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay}>
          <Dialog.Content className={styles.Content}>
            <Dialog.Title className={styles.Title}>Info menu</Dialog.Title>
            <MenuInfo />
            <MenuSlider />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MenuPopup
