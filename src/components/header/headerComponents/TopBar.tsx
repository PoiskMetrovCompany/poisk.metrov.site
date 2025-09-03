"use client"

import React, { FC } from "react"

import styles from "../header.module.scss"

import LocationSelector from "./LocationSelector"
import Logo from "./Logo"

interface ITopBarLink {
  text: string
  href: string
}
interface TopBarProps {
  initialCity: { name: string; id: string; slug: string } | null
}

const TopBar: FC<TopBarProps> = ({ initialCity }) => {
  const links: ITopBarLink[] = [
    { text: "О компании", href: "/about" },
    { text: "Партнерам", href: "/partners" },
    { text: "Офисы", href: "/offices" },
  ]

  return (
    <div id="1" className={styles.top_bar}>
      <div className={styles.top_bar__container}>
        <div className={styles.top_bar__left}>
          <LocationSelector initialCity={initialCity} />
        </div>
        <div className={styles.top_bar__right}>
          <nav className={styles.top_bar__nav}>
            <ul className={styles.top_bar__list}>
              {links.map((link, index) => (
                <li key={index} className={styles.top_bar__item}>
                  <a href={link.href} className={styles.top_bar__link}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default TopBar
