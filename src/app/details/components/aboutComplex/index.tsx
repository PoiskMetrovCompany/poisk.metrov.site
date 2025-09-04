"use client"

import React from "react"
import styles from "./aboutComplex.module.scss"
import Heading2 from "@/components/ui/heading2"
import Link from "next/link"
import { useScreenSize } from "@/utils/hooks/use-screen-size"

const AboutComplex = () => {
  // const { isMobile, isTablet, isLaptop, isDesktop } = useScreenSize()

  // const truncateToFirstSentence = (text: string) => {
  //   const sentences = text.split(".")
  //   return sentences ? sentences[0] + "." + sentences[1] + "." : text
  // }

  // const fullText =
  //   "Квартал обосновался на Ипподромской улице. Эта часть района богата инфраструктурой: вокруг 3 станции метро, ТЦ «Атриум» и «Лента» в 3 минутах ходьбы, целая россыпь школ и детских садов. В архитектуре квартала заложены принципы: добротность, основательность и преемственность. Дома поддерживают архитектурные устои района, при этом «смотрят» на них свежим взглядом. Фасады «нарядные», в них чувствуется душа: большие окна излучают свет, а кирпич бежево-коричневых цветов оставляет тёплые впечатления, будто от встречи с давним другом. Любовь к подвижному образу жизни — то, что важно привить ребёнку. В одном из корпусов Калининского квартала есть бассейн для детей от 3 до 7 лет."

  // const displayText =
  //   isMobile || isTablet || isLaptop || isDesktop
  //     ? fullText
  //     : truncateToFirstSentence(fullText)

  return (
    <div className={styles.aboutComplex}>
      <div className={styles.aboutComplex__header}>
        <Heading2>О комплексе</Heading2>
      </div>
      <div className={styles.aboutComplex__content}>
        <p className={styles.aboutComplex__content__text}>
          Квартал обосновался на Ипподромской улице. Эта часть района богата
          инфраструктурой: вокруг 3 станции метро, ТЦ «Атриум» и «Лента» в 3
          минутах ходьбы, целая россыпь школ и детских садов.
          <b className={styles.aboutComplex__content__text_desktop}>
            В архитектуре квартала заложены принципы: добротность,
            основательность и преемственность. Дома поддерживают архитектурные
            устои района, при этом «смотрят» на них свежим взглядом. Фасады
            «нарядные», в них чувствуется душа: большие окна излучают свет, а
            кирпич бежево-коричневых цветов оставляет тёплые впечатления, будто
            от встречи с давним другом. Любовь к подвижному образу жизни — то,
            что важно привить ребёнку. В одном из корпусов Калининского квартала
            есть бассейн для детей от 3 до 7 лет.
          </b>
        </p>

        <Link href="/" className={styles.aboutComplex__content__link}>
          Подробнее
        </Link>
      </div>
    </div>
  )
}

export default AboutComplex
