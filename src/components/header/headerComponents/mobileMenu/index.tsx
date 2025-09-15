"use client"

import * as Dialog from "@radix-ui/react-dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"

import React, { FC } from "react"

import styles from "./mobileMenu.module.scss"

import IconImage from "@/components/ui/IconImage"
import IconButton from "@/components/ui/buttons/IconButton"

interface IMobileMenuProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const MobileMenu: FC<IMobileMenuProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.mobileMenu__overlay} />
        <Dialog.Content className={styles.mobileMenu__content}>
          <VisuallyHidden.Root>
            <Dialog.Title>Мобильное меню</Dialog.Title>
          </VisuallyHidden.Root>
          <div className={styles.mobileMenu__navigation}>
            <div className={styles.mobileMenu__tabs}>
              <button className={styles.mobileMenu__tab_active}>
                Новосибирск
              </button>
              <button className={styles.mobileMenu__tab}>
                Санкт-Петербург
              </button>
              <button className={styles.mobileMenu__tab}>Крым</button>
            </div>

            <div className={styles.mobileMenu__divider} />

            <div className={styles.mobileMenu__items}>
              <div className={styles.mobileMenu__item}>
                <span className={styles.mobileMenu__itemText}>О компании</span>
                <IconImage
                  iconLink="/images/icons/header/mobile-arrow.svg"
                  alt="arrow"
                  className={styles.mobileMenu__itemIcon}
                />
              </div>

              <div className={styles.mobileMenu__item}>
                <span className={styles.mobileMenu__itemText}>Партнёрам</span>
                <IconImage
                  iconLink="/images/icons/header/mobile-arrow.svg"
                  alt="arrow"
                  className={styles.mobileMenu__itemIcon}
                />
              </div>

              <div className={styles.mobileMenu__item}>
                <span className={styles.mobileMenu__itemText}>Офисы</span>
                <IconImage
                  iconLink="/images/icons/header/mobile-arrow.svg"
                  alt="arrow"
                  className={styles.mobileMenu__itemIcon}
                />
              </div>
            </div>

            <div className={styles.mobileMenu__divider} />

            <div className={styles.mobileMenu__contact}>
              <div className={styles.mobileMenu__phone}>
                <span className={styles.mobileMenu__phoneNumber}>
                  +7 999 448 46-95
                </span>
                <button className={styles.mobileMenu__callButton}>
                  <IconImage
                    iconLink="/images/icons/header/phone.svg"
                    alt="arrow"
                    className={styles.mobileMenu__callButton__icon}
                  />

                  <span className={styles.mobileMenu__callButtonText}>
                    Заказать звонок
                  </span>
                </button>
              </div>

              <div className={styles.mobileMenu__social}>
                <IconButton
                  size="sm"
                  type="secondary"
                  iconLink="/images/icons/header/telegram.svg"
                  alt="telegram"
                  className={styles.mobileMenu__socialButton__icon}
                />
                <IconButton
                  size="sm"
                  type="secondary"
                  iconLink="/images/icons/header/whatsapp.svg"
                  alt="whatsapp"
                  className={styles.mobileMenu__socialButton__icon}
                />

                <IconButton
                  size="sm"
                  type="secondary"
                  iconLink="/images/icons/header/inst.svg"
                  alt="instagram"
                  className={styles.mobileMenu__socialButton__icon}
                />
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MobileMenu
