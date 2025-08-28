"use client"

import React, { useState } from "react"

import styles from "./header.module.scss"

import MenuPopup from "../menuPopup"
import MainBar from "./headerComponents/MainBar"
import TopBar from "./headerComponents/TopBar"

const Header = () => {
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
