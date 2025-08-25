import React from "react"
import styles from "./filter.module.scss"
import IconImage from "@/components/ui/IconImage"
import Link from "next/link"
import { useScreenSize } from "@/utils/hooks/use-screen-size"

const data = [
  {
    icon: "/images/icons/filter/building.svg",
    title: "Квартиры в центре",
    link: "/catalogue",
  },
  {
    icon: "/images/icons/filter/rocket.svg",
    title: "Квартиры до 5 млн",
    link: "/catalogue",
  },
  {
    icon: "/images/icons/filter/home.svg",
    title: "Пентхаусы",
    link: "/catalogue",
  },
  {
    icon: "/images/icons/filter/location.svg",
    title: "Квартиры у воды",
    link: "/catalogue",
  },
  {
    icon: "/images/icons/filter/key.svg",
    title: "Квартиры с отделкой",
    link: "/catalogue",
  },
  {
    icon: "/images/icons/filter/leaf.svg",
    title: "ЖК с парками",
    link: "/catalogue",
  },
  {
    icon: "/images/icons/filter/umbrella.svg",
    title: "Квартиры c террасой",
    link: "/catalogue",
  },
]

const truncateTitle = (title: string): string => {
  return title
    .replace(/^Квартиры\s+/, "") 
    .replace(/^ЖК\s+/, "") 
}

const FilterLinks = () => {
  const { isTablet } = useScreenSize()

  return (
    <div className={styles.filterLinks}>
      {data.map((item) => {
        const displayTitle = isTablet ? item.title : truncateTitle(item.title)

        return (
          <Link
            href={item.link}
            className={styles.filterLinks__link}
            key={item.title}
          >
            <IconImage
              iconLink={item.icon}
              alt={item.title}
              className={styles.filterLinks__link__icon}
            />
            <p className={styles.filterLinks__link__title}>{displayTitle}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default FilterLinks
