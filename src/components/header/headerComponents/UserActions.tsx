"use client"

import clsx from "clsx"

import React, { FC } from "react"

import Image from "next/image"

import styles from "../header.module.scss"

import LoginForm from "../loginForm"

interface IUserActionsProps {
  favoritesCount?: number
  isLoggedIn?: boolean
  onFavoritesClick?: () => void
  onMenuClick?: () => void
}

const UserActions: FC<IUserActionsProps> = ({
  favoritesCount = 1,
  isLoggedIn = false,
  onFavoritesClick,
  onMenuClick,
}) => {
  const handleFavoritesClick = (): void => {
    if (onFavoritesClick) {
      onFavoritesClick()
    }
  }

  const handleMenuClick = (): void => {
    if (onMenuClick) {
      onMenuClick()
    }
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

      {isLoggedIn ? (
        <button className={styles.user_actions__login} type="button">
          <Image
            className={styles.user_actions__icon}
            src="/images/icons/header/profile.svg"
            alt="User"
            width={20}
            height={20}
          />
          <span className={styles.user_actions__text}>Профиль</span>
        </button>
      ) : (
        <LoginForm
          trigger={
            <button className={styles.user_actions__login} type="button">
              <Image
                className={styles.user_actions__icon}
                src="/images/icons/header/profile.svg"
                alt="User"
                width={20}
                height={20}
              />
              <span className={styles.user_actions__text}>Войти</span>
            </button>
          }
        />
      )}

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
