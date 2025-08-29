"use client"

import React, { useState } from "react"

import styles from "./header.module.scss"

import MenuPopup from "../menuPopup"
import MainBar from "./headerComponents/MainBar"
import TopBar from "./headerComponents/TopBar"

interface HeaderProps {
  initialCity: { name: string; id: string; slug: string } | null
}

const Header = ({ initialCity }: HeaderProps) => {
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(false)

  return (
    <>
      <MenuPopup
        isOpen={isMenuPopupOpen}
        onClose={() => setIsMenuPopupOpen(false)}
      />
      <header className={styles.header}>
        <TopBar />
      </header>
      <MainBar onCatalogClick={() => setIsMenuPopupOpen(true)} />
    </>
  )
}

export default Header
