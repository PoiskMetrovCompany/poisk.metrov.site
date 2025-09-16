"use client"

import * as Dialog from "@radix-ui/react-dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import clsx from "clsx"

import React, { FC } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useLocationStore } from "@/stores/useLocationStore"
import { CityResponse } from "@/types/api"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "./mobileMenu.module.scss"

import IconImage from "@/components/ui/IconImage"
import IconButton from "@/components/ui/buttons/IconButton"
import Skeleton from "@/components/ui/skeleton"

interface IMobileMenuProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  initialCity: { name: string; id: string; slug: string } | null
}

const MobileMenu: FC<IMobileMenuProps> = ({
  isOpen,
  onOpenChange,
  initialCity,
}) => {
  const { selectedCity, setSelectedCity } = useLocationStore()
  const router = useRouter()

  const {
    data: citiesData,
    isLoading,
    error,
  } = useApiQuery<CityResponse>(["cities"], "/city")

  const cities = citiesData?.attributes || []
  const currentCity = selectedCity || initialCity

  const handleCitySelect = (cityName: string): void => {
    const city = cities.find((c) => c.title === cityName)
    if (city) {
      setSelectedCity({
        name: city.title,
        id: city.id.toString(),
        slug: city.slug,
      })

      try {
        const cookieValue = encodeURIComponent(
          JSON.stringify({
            name: city.title,
            id: city.id.toString(),
            slug: city.slug,
          })
        )
        document.cookie = `selectedCity=${cookieValue}; Path=/; Max-Age=${60 * 60 * 24 * 365}`
      } catch {}
    }
  }

  const handleNavigation = (href: string): void => {
    router.push(href)
    onOpenChange(false)
  }

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
              {isLoading ? (
                <>
                  <Skeleton width={120} height={32} />
                  <Skeleton width={120} height={32} />
                  <Skeleton width={120} height={32} />
                </>
              ) : error ? (
                <div className={styles.mobileMenu__error}>
                  Ошибка загрузки городов
                </div>
              ) : cities.length === 0 ? (
                // <div className={styles.mobileMenu__error}>
                //   Города не найдены
                // </div>
                <>
                  <button
                    className={clsx(
                      styles.mobileMenu__tab,
                      "Новосибирск" === currentCity?.name &&
                        styles.mobileMenu__tab_active
                    )}
                    onClick={() => handleCitySelect("Новосибирск")}
                    type="button"
                  >
                    Новосибирск
                  </button>
                  <button
                    className={clsx(
                      styles.mobileMenu__tab,
                      "Санкт-Петербург" === currentCity?.name &&
                        styles.mobileMenu__tab_active
                    )}
                    onClick={() => handleCitySelect("Санкт-Петербург")}
                    type="button"
                  >
                    Санкт-Петербург
                  </button>
                  <button
                    className={clsx(
                      styles.mobileMenu__tab,
                      "Санкт-Петербург" === currentCity?.name &&
                        styles.mobileMenu__tab_active
                    )}
                    onClick={() => handleCitySelect("Санкт-Петербург")}
                    type="button"
                  >
                    Крым
                  </button>
                </>
              ) : (
                cities.slice(0, 3).map((city) => (
                  <button
                    key={city.id}
                    className={clsx(
                      styles.mobileMenu__tab,
                      city.title === currentCity?.name &&
                        styles.mobileMenu__tab_active
                    )}
                    onClick={() => handleCitySelect(city.title)}
                    type="button"
                  >
                    {city.title}
                  </button>
                ))
              )}
            </div>

            <div
              className={clsx(
                styles.mobileMenu__items,
                styles.mobileMenu__items_mobile
              )}
            >
              <button
                className={styles.mobileMenu__item}
                onClick={() => handleNavigation("/catalogue")}
                type="button"
              >
                <span className={styles.mobileMenu__itemText}>
                  Каталог недвижимости
                </span>
                <IconImage
                  iconLink="/images/icons/header/mobile-arrow.svg"
                  alt="arrow"
                  className={styles.mobileMenu__itemIcon}
                />
              </button>

              <button
                className={styles.mobileMenu__item}
                onClick={() => handleNavigation("/sell")}
                type="button"
              >
                <span className={styles.mobileMenu__itemText}>Продать</span>
                <IconImage
                  iconLink="/images/icons/header/mobile-arrow.svg"
                  alt="arrow"
                  className={styles.mobileMenu__itemIcon}
                />
              </button>

              <button
                className={styles.mobileMenu__item}
                onClick={() => handleNavigation("/mortgage")}
                type="button"
              >
                <span className={styles.mobileMenu__itemText}>Ипотека</span>
                <IconImage
                  iconLink="/images/icons/header/mobile-arrow.svg"
                  alt="arrow"
                  className={styles.mobileMenu__itemIcon}
                />
              </button>
            </div>

            <div className={clsx(styles.mobileMenu__divider)} />

            <div className={styles.mobileMenu__items}>
              <button
                className={styles.mobileMenu__item}
                onClick={() => handleNavigation("/about")}
                type="button"
              >
                <span className={styles.mobileMenu__itemText}>О компании</span>
                <IconImage
                  iconLink="/images/icons/header/mobile-arrow.svg"
                  alt="arrow"
                  className={styles.mobileMenu__itemIcon}
                />
              </button>

              <button
                className={styles.mobileMenu__item}
                onClick={() => handleNavigation("/partners")}
                type="button"
              >
                <span className={styles.mobileMenu__itemText}>Партнёрам</span>
                <IconImage
                  iconLink="/images/icons/header/mobile-arrow.svg"
                  alt="arrow"
                  className={styles.mobileMenu__itemIcon}
                />
              </button>

              <button
                className={styles.mobileMenu__item}
                onClick={() => handleNavigation("/offices")}
                type="button"
              >
                <span className={styles.mobileMenu__itemText}>Офисы</span>
                <IconImage
                  iconLink="/images/icons/header/mobile-arrow.svg"
                  alt="arrow"
                  className={styles.mobileMenu__itemIcon}
                />
              </button>
            </div>

            <div
              className={clsx(
                styles.mobileMenu__divider,
                styles.mobileMenu__divider_last
              )}
            />

            <div className={styles.mobileMenu__contact}>
              <div className={styles.mobileMenu__phone}>
                <a
                  href="tel:+79994484695"
                  className={styles.mobileMenu__phoneNumber}
                >
                  +7 999 448 46-95
                </a>
                <a
                  href="tel:+79994484695"
                  className={styles.mobileMenu__callButton}
                >
                  <IconImage
                    iconLink="/images/icons/header/phone.svg"
                    alt="arrow"
                    className={styles.mobileMenu__callButton__icon}
                  />

                  <span className={styles.mobileMenu__callButtonText}>
                    Заказать звонок
                  </span>
                </a>
              </div>

              <div className={styles.mobileMenu__social}>
                <Link
                  href="https://t.me/poisk_metrov"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Перейти в Telegram"
                >
                  <IconButton
                    size="sm"
                    type="secondary"
                    iconLink="/images/icons/header/telegram.svg"
                    alt="telegram"
                    className={styles.mobileMenu__socialButton__icon}
                  />
                </Link>
                <Link
                  href="https://wa.me/79994484695"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Перейти в WhatsApp"
                >
                  <IconButton
                    size="sm"
                    type="secondary"
                    iconLink="/images/icons/header/whatsapp.svg"
                    alt="whatsapp"
                    className={styles.mobileMenu__socialButton__icon}
                  />
                </Link>
                <Link
                  href="https://instagram.com/poisk_metrov"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Перейти в Instagram"
                >
                  <IconButton
                    size="sm"
                    type="secondary"
                    iconLink="/images/icons/header/inst.svg"
                    alt="instagram"
                    className={styles.mobileMenu__socialButton__icon}
                  />
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MobileMenu
