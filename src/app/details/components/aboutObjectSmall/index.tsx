import React from "react"
import styles from "./aboutObjectSmall.module.scss"
import Heading2 from "@/components/ui/heading2"
import IconImage from "@/components/ui/IconImage"
import { IAboutObjectItem } from "@/types/Object"

interface AboutObjectSmallProps {
  items: IAboutObjectItem[]
}

const AboutObjectSmall = ({ items }: AboutObjectSmallProps) => {
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutObjectSmall
