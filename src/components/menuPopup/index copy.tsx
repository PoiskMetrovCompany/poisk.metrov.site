"use client"
import React, { useState } from "react"
import Image from "next/image"
import { Dialog } from "radix-ui"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
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
                    {[...new Array(3)].map((_, index) => (
                      <div
                        className={
                          styles.Content__info__content__statistics__general__item
                        }
                        key={index}
                      >
                        <div
                          className={
                            styles.Content__info__content__statistics__general__item__icon
                          }
                        >
                          <IconImage
                            iconLink="/images/temporary/hot.svg"
                            alt="house"
                            className={
                              styles.Content__info__content__statistics__general__item__icon__image
                            }
                          />
                        </div>
                        <div
                          className={
                            styles.Content__info__content__statistics__general__item__text
                          }
                        >
                          <span
                            className={
                              styles.Content__info__content__statistics__general__item__text__title
                            }
                          >
                            Популярные
                          </span>
                          <span
                            className={
                              styles.Content__info__content__statistics__general__item__text__value
                            }
                          >
                            46 проектов
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div
                    className={styles.Content__info__content__statistics__cards}
                  >
                    {[...new Array(6)].map((_, index) => (
                      <div
                        className={
                          styles.Content__info__content__statistics__cards__item
                        }
                        key={index}
                      >
                        <IconImage
                          iconLink="/images/temporary/location.webp"
                          alt="house"
                          className={
                            styles.Content__info__content__statistics__cards__item__image
                          }
                        />
                        <div
                          className={
                            styles.Content__info__content__statistics__cards__item__text
                          }
                        >
                          <span
                            className={
                              styles.Content__info__content__statistics__cards__item__text__title
                            }
                          >
                            ЖК у воды
                          </span>
                          <span
                            className={
                              styles.Content__info__content__statistics__cards__item__text__value
                            }
                          >
                            11 548 предложений
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <ActionButton
                type="secondary"
                className={styles.Content__info__button}
              >
                Перейти в каталог
              </ActionButton>
            </div>
            <div className={styles.Content__slider}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{ clickable: true }}
                // autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className={styles.Content__slider__swiper}
              >
                <SwiperSlide className={styles.Content__slider__slide}>
                  <div className={styles.Content__slider__slide__content}>
                    <div className={styles.Content__slider__slide__image}></div>
                    {/* <IconImage
                      iconLink="/images/temporary/promo-house.png"
                      alt="Промо дом"
                      className={styles.Content__slider__slide__image}
                    /> */}
                    <div className={styles.Content__slider__slide__text}>
                      <h3 className={styles.Content__slider__slide__title}>
                        Жилые комплексы премиум-класса
                      </h3>
                      <p className={styles.Content__slider__slide__description}>
                        Откройте для себя лучшие предложения недвижимости в
                        Москве
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className={styles.Content__slider__slide}>
                  <div className={styles.Content__slider__slide__content}>
                    {/* <Image
                      src="/images/temporary/promo-house.png"
                      alt="Промо дом"
                      width={400}
                      height={300}
                      className={styles.Content__slider__slide__image}
                    /> */}
                    <div className={styles.Content__slider__slide__text}>
                      <h3 className={styles.Content__slider__slide__title}>
                        Комфортное проживание
                      </h3>
                      <p className={styles.Content__slider__slide__description}>
                        Современные решения для вашего идеального дома
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>

              <div
                className={`swiper-button-prev ${styles.Content__slider__navigationButton} ${styles.Content__slider__navigationButtonPrev}`}
              >
                <div className={styles.Content__slider__navigationButton__icon}>
                  <Image
                    src="/images/icons/arrow-slider.svg"
                    alt="arrow-left"
                    fill
                  />
                </div>
              </div>
              <div
                className={`swiper-button-next ${styles.Content__slider__navigationButton} ${styles.Content__slider__navigationButtonNext}`}
              >
                <div className={styles.Content__slider__navigationButton__icon}>
                  <Image
                    src="/images/icons/arrow-slider.svg"
                    alt="arrow-right"
                    fill
                    className={
                      styles.Content__slider__navigationButton__icon__icon_next
                    }
                  />
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MenuPopup
