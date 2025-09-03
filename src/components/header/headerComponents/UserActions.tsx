"use client"

import clsx from "clsx"

import React, { FC, useState } from "react"

import Image from "next/image"

import styles from "../header.module.scss"

import ProfilePopover from "./profilePopover/ProfilePopover"

interface IUserActionsProps {
  favoritesCount?: number
  isLoggedIn?: boolean
  onFavoritesClick?: () => void
  onLoginClick?: () => void
  onMenuClick?: () => void
}

const UserActions: FC<IUserActionsProps> = ({
  favoritesCount = 1,
  isLoggedIn = false,
  onFavoritesClick,
  onLoginClick,
  onMenuClick,
}) => {
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false)

  const handleFavoritesClick = (): void => {
    if (onFavoritesClick) {
      onFavoritesClick()
    }
  }

  const handleLoginClick = (): void => {
    if (isLoggedIn) {
      setIsProfilePopoverOpen(true)
    } else if (onLoginClick) {
      onLoginClick()
    }
  }

  const handleMenuClick = (): void => {
    if (onMenuClick) {
      onMenuClick()
    }
  }

  const handleSettingsClick = (): void => {
    // Обработка клика по настройкам профиля
    console.log("Настройки профиля")
  }

  const handleLogoutClick = (): void => {
    // Обработка выхода из личного кабинета
    console.log("Выход из личного кабинета")
    setIsProfilePopoverOpen(false)
  }

  return (
    <div className={styles.user_actions}>
      <button
        className={styles.user_actions__favorites}
        type="button"
        onClick={handleFavoritesClick}
      >
        <Image
          className={styles.user_actions__icon}
          src="/images/icons/header/favorite.svg"
          alt="Favorites"
          width={20}
          height={20}
        />
        {favoritesCount > 0 && (
          <span className={styles.user_actions__count}>{favoritesCount}</span>
        )}
        <span className={styles.user_actions__label}>Избранное</span>
      </button>

      <ProfilePopover
        isOpen={isProfilePopoverOpen}
        onOpenChange={setIsProfilePopoverOpen}
        userName="Фамилия Имя"
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogoutClick}
      >
        <button
          className={styles.user_actions__login}
          type="button"
          onClick={handleLoginClick}
        >
          <Image
            className={styles.user_actions__icon}
            src="/images/icons/header/profile.svg"
            alt="User"
            width={20}
            height={20}
          />
          <span className={styles.user_actions__text}>
            {isLoggedIn ? "Профиль" : "Войти"}
          </span>
        </button>
      </ProfilePopover>

      <button
        className={styles.user_actions__showMenu}
        type="button"
        onClick={handleMenuClick}
      >
        <Image
          className="showMenuSvg"
          src="/images/icons/header/showMenu.svg"
          alt="Menu"
          width={16}
          height={16}
        />
      </button>
    </div>
  )
}

export default UserActions
