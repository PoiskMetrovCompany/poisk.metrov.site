import * as Accordion from "@radix-ui/react-accordion"
import clsx from "clsx"

import React from "react"

import styles from "./questions.module.scss"

import IconImage from "@/components/ui/IconImage"
import ActionButton from "@/components/ui/buttons/ActionButton"
import Heading2 from "@/components/ui/heading2"

const Questions = () => {
  return (
    <div className={styles.questions}>
      <Heading2 className={styles.questions__heading}>
        Часто задаваемые вопросы{" "}
        <ActionButton
          type="secondary"
          className={clsx(
            styles.questions__content__consultation__button,
            styles.questions__content__consultation__button__heading
          )}
        >
          Получить консультацию
        </ActionButton>
      </Heading2>
      <div className={styles.questions__content}>
        <div className={styles.questions__content__list}>
          <Accordion.Root
            className={styles.questions__content__list__root}
            type="single"
            collapsible
          >
            <Accordion.Item
              className={styles.questions__content__list__root__item}
              value="item-1"
            >
              <Accordion.Header
                className={styles.questions__content__list__root__item__header}
              >
                <Accordion.Trigger
                  className={
                    styles.questions__content__list__root__item__trigger
                  }
                >
                  <div
                    className={
                      styles.questions__content__list__root__item__trigger__text
                    }
                  >
                    <span
                      className={
                        styles.questions__content__list__root__item__trigger__text__number
                      }
                    >
                      1.
                    </span>
                    <span>Какие гарантии вы предоставляете?</span>
                  </div>
                  <IconImage
                    className={
                      styles.questions__content__list__root__item__trigger__arrow
                    }
                    iconLink={"/images/icons/about/accordion-arrow.svg"}
                    alt="arrow-down"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content
                className={styles.questions__content__list__root__item__content}
              >
                <p
                  className={
                    styles.questions__content__list__root__item__content__text
                  }
                >
                  Мы работаем официально и берём на себя ответственность за весь
                  процесс. Заключаем договор, проверяем документы и сопровождаем
                  сделку от начала до конца. Ваша безопасность — наш приоритет.
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
              className={styles.questions__content__list__root__item}
              value="item-2"
            >
              <Accordion.Header
                className={styles.questions__content__list__root__item__header}
              >
                <Accordion.Trigger
                  className={
                    styles.questions__content__list__root__item__trigger
                  }
                >
                  <div
                    className={
                      styles.questions__content__list__root__item__trigger__text
                    }
                  >
                    <span
                      className={
                        styles.questions__content__list__root__item__trigger__text__number
                      }
                    >
                      2.
                    </span>
                    <span>
                      Я уже нашёл квартиру — могу ли просто проконсультироваться
                      по ней?
                    </span>
                  </div>
                  <IconImage
                    className={
                      styles.questions__content__list__root__item__trigger__arrow
                    }
                    iconLink={"/images/icons/about/accordion-arrow.svg"}
                    alt="arrow-down"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content
                className={styles.questions__content__list__root__item__content}
              >
                <p
                  className={
                    styles.questions__content__list__root__item__content__text
                  }
                >
                  Да, конечно. Мы можем проверить выбранную вами квартиру на
                  юридическую чистоту, рассказать о возможных рисках и помочь
                  оформить сделку. Даже если квартира не из нашей базы —
                  консультация и сопровождение доступны
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
              className={styles.questions__content__list__root__item}
              value="item-3"
            >
              <Accordion.Header
                className={styles.questions__content__list__root__item__header}
              >
                <Accordion.Trigger
                  className={
                    styles.questions__content__list__root__item__trigger
                  }
                >
                  <div
                    className={
                      styles.questions__content__list__root__item__trigger__text
                    }
                  >
                    <span
                      className={
                        styles.questions__content__list__root__item__trigger__text__number
                      }
                    >
                      3.
                    </span>
                    <span>
                      Сколько времени занимает оформление после выбора квартиры?
                    </span>
                  </div>
                  <IconImage
                    className={
                      styles.questions__content__list__root__item__trigger__arrow
                    }
                    iconLink={"/images/icons/about/accordion-arrow.svg"}
                    alt="arrow-down"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content
                className={styles.questions__content__list__root__item__content}
              >
                <p
                  className={
                    styles.questions__content__list__root__item__content__text
                  }
                >
                  В среднем процесс занимает от 2 до 4 недель. Всё зависит от
                  способа покупки: при наличном расчёте оформление проходит
                  быстрее, при ипотеке или рассрочке процедура может занять
                  немного больше времени из-за согласования с банком. Мы
                  сопровождаем сделку на всех этапах и стараемся максимально
                  ускорить процесс
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item
              className={styles.questions__content__list__root__item}
              value="item-4"
            >
              <Accordion.Header
                className={styles.questions__content__list__root__item__header}
              >
                <Accordion.Trigger
                  className={
                    styles.questions__content__list__root__item__trigger
                  }
                >
                  <div
                    className={
                      styles.questions__content__list__root__item__trigger__text
                    }
                  >
                    <span
                      className={
                        styles.questions__content__list__root__item__trigger__text__number
                      }
                    >
                      4.
                    </span>
                    <span>
                      Работаете ли вы с ипотекой для ИП или самозанятых?
                    </span>
                  </div>
                  <IconImage
                    className={
                      styles.questions__content__list__root__item__trigger__arrow
                    }
                    iconLink={"/images/icons/about/accordion-arrow.svg"}
                    alt="arrow-down"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content
                className={styles.questions__content__list__root__item__content}
              >
                <p
                  className={
                    styles.questions__content__list__root__item__content__text
                  }
                >
                  Да, у нас есть опыт работы с такими клиентами. Мы подбираем
                  банки, которые принимают доходы ИП и самозанятых, помогаем
                  собрать документы и правильно оформить заявку, чтобы повысить
                  шансы на одобрение
                </p>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>
        <div className={styles.questions__content__consultation}>
          <div className={styles.questions__content__consultation__text}>
            <h3
              className={styles.questions__content__consultation__text__title}
            >
              Остались вопросы?
            </h3>
            <p
              className={
                styles.questions__content__consultation__text__description
              }
            >
              Задайте нам свой вопрос,
              <br /> мы свяжемся с вами
            </p>
          </div>
          <ActionButton
            className={styles.questions__content__consultation__button}
          >
            Получить консультацию
          </ActionButton>
        </div>
      </div>
      <ActionButton
        type="secondary"
        className={clsx(
          styles.questions__content__consultation__button,
          styles.questions__content__consultation__button__mobile
        )}
      >
        Получить консультацию
      </ActionButton>
    </div>
  )
}

export default Questions
