"use client"

import React from "react"

import styles from "../header.module.scss"

import ContactInfo from "./ContactInfo"
import Logo from "./Logo"
import Navigation from "./Navigation"
import UserActions from "./UserActions"

interface IMainBarProps {
  onCatalogClick: () => void
}

const MainBar = ({ onCatalogClick }: IMainBarProps) => {
  return (
    <div className={styles.main_bar}>
      <div className={styles.main_bar__container}>
        <div className={styles.main_bar__left}>
          <Logo />
          <Navigation onCatalogClick={onCatalogClick} />
        </div>
        <div className={styles.main_bar__right}>
          <ContactInfo />
          <UserActions />
        </div>
      </div>
    </div>
  )
}

export default MainBar
