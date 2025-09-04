"use client"
import React, { useState } from "react"
import styles from "./header.module.scss"
import TopBar from "./headerComponents/TopBar"
import MainBar from "./headerComponents/MainBar"
import MenuPopup from "../menuPopup"

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
        <MainBar onCatalogClick={() => setIsMenuPopupOpen(true)} />
      </header>
    </>
  )
}
export default Header
