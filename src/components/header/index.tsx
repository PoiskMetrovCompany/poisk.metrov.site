"use client"

import React, { useState } from "react"

import styles from "./header.module.scss"

import MenuPopup from "../menuPopup"
import MainBar from "./headerComponents/MainBar"
import TopBar from "./headerComponents/TopBar"

interface HeaderProps {
  initialCity: { name: string; id: string; slug: string } | null
  hideTopBar?: boolean
}

const Header = ({ initialCity, hideTopBar = false }: HeaderProps) => {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false)

  return (
    <>
      <MenuPopup
        isOpen={isMenuPopupOpen}
        onClose={() => setIsMenuPopupOpen(false)}
      />
      <header className={styles.header}>
        {!hideTopBar && <TopBar initialCity={initialCity} />}
      </header>
      <MainBar onCatalogClick={() => setIsMenuPopupOpen(true)} />
    </>
  )
}

export default Header
