import React from "react"
import styles from "./aboutObject.module.scss"
import Heading2 from "@/components/ui/heading2"
import IconImage from "@/components/ui/IconImage"
import { IAboutObjectItem } from "@/types/Object"

interface AboutObjectProps {
  items: IAboutObjectItem[]
}

const AboutObject = ({ items }: AboutObjectProps) => {
  return (
    <div className={styles.aboutObject}>
      <div className={styles.aboutObject__header}>
        <Heading2>Об объекте</Heading2>
      </div>
      <div className={styles.aboutObject__content}>
        {items.map((item) => (
          <div className={styles.aboutObject__content__item} key={item.title}>
            <IconImage
              iconLink={item.icon}
              alt={item.alt || "icon"}
              className={styles.aboutObject__content__item__icon}
            />
            <div className={styles.aboutObject__content__item__text}>
              <span className={styles.aboutObject__content__item__text_title}>
                {item.title}
              </span>
              <p
                className={styles.aboutObject__content__item__text_description}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}

        {/* <div className={styles.aboutObject__content__item}>
          <IconImage
            iconLink="/images/icons/elevator.svg"
            alt="icon"
            className={styles.aboutObject__content__item__icon}
          />
          <div className={styles.aboutObject__content__item__text}>
            <span className={styles.aboutObject__content__item__text_title}>
              Пассажирский
            </span>
            <p className={styles.aboutObject__content__item__text_description}>
              Лифт
            </p>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default AboutObject
