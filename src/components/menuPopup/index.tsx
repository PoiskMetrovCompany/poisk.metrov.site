"use client"
import React, { useState } from "react"
import { Dialog } from "radix-ui"
import styles from "./menuPopup.module.scss"
import ActionButton from "../ui/buttons/ActionButton"
import clsx from "clsx"
import IconImage from "../ui/IconImage"

enum tabType {
  residentialComplex = "ЖК",
  flats = "Квартиры",
  apartments = "Апартаменты",
  houses = "Дома",
}

const MenuPopup = () => {
  const [isOpen, setIsOpen] = useState(true)

  const [selectedType, setSelectedType] = useState(tabType.residentialComplex)

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
            <div className={styles.Content__info}>
              <div className={styles.Content__info__content}>
                <div className={styles.Content__info__content__switcher}>
                  {Object.values(tabType).map((type) => (
                    <button
                      key={type}
                      className={clsx(
                        styles.Content__info__content__switcher__item,
                        {
                          [styles.Content__info__content__switcher__item__selected]:
                            selectedType === type,
                        }
                      )}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className={styles.Content__info__content__statistics}>
                  <div
                    className={
                      styles.Content__info__content__statistics__general
                    }
                  >
                    <div
                      className={
                        styles.Content__info__content__statistics__general__item
                      }
                    >
                      <div>
                        <IconImage
                          iconLink="/images/icons/house.svg"
                          alt="house"
                          className={
                            styles.Content__info__content__statistics__general__item__icon
                          }
                        />
                      </div>
                      <span
                        className={
                          styles.Content__info__content__statistics__general__item__value
                        }
                      >
                        100
                      </span>
                    </div>
                    <div
                      className={
                        styles.Content__info__content__statistics__general__item
                      }
                    >
                      <span
                        className={
                          styles.Content__info__content__statistics__general__item__value
                        }
                      >
                        100
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <ActionButton
                type="gray"
                className={styles.Content__info__button}
              >
                Перейти в каталог
              </ActionButton>
            </div>
            <div className={styles.Content__slider}>slider</div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MenuPopup
