"use client"

import React, { useCallback, useMemo } from "react"

import { useRouter } from "next/navigation"

import { useScreenSize } from "@/utils/hooks/use-screen-size"

import styles from "../header.module.scss"

interface INavItem {
  text: string
  href: string
  onClick?: (href: string) => void
}

interface INavigationProps {
  onCatalogClick: () => void
}

const Navigation = ({ onCatalogClick }: INavigationProps) => {
  const { isLaptop } = useScreenSize()
  const router = useRouter()

  const catalogClick = (href: string) => {
    if (isLaptop) {
      onCatalogClick()
    } else {
      router.push(href)
    }
  }

  const navigationClick = useCallback(
    (item: INavItem) => {
      if (item.onClick) {
        item.onClick(item.href)
      } else {
        router.push(item.href)
      }
    },
    [router]
  )

  const navItems: INavItem[] = [
    { text: "Каталог недвижимости", href: "/catalogue", onClick: catalogClick },
    { text: "Продать", href: "/sell" },
    { text: "Ипотека", href: "/mortgage" },
  ]

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        {navItems.map((item, index) => (
          <li key={index} className={styles.navigation__item}>
            <button
              className={styles.navigation__button}
              type="button"
              onClick={() => navigationClick(item)}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
