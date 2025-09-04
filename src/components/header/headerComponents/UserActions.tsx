"use client"

import clsx from "clsx"

import React, { FC, useState } from "react"

import Image from "next/image"

import { IFavoritesCountResponse } from "@/types/api/favoritesCount"

import styles from "../header.module.scss"

import ProfilePopover from "./profilePopover/ProfilePopover"

import LoginForm from "../loginForm"
import { useApiQuery } from "@/utils/hooks/use-api"
import Skeleton from "@/components/ui/skeleton"

interface IUserActionsProps {
  isLoggedIn?: boolean
  onFavoritesClick?: () => void
  onMenuClick?: () => void
}

const UserActions: FC<IUserActionsProps> = ({
  isLoggedIn = false,
  onFavoritesClick,
  onMenuClick,
}) => {
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false)

  const handleFavoritesClick = (): void => {
    if (onFavoritesClick) {
      onFavoritesClick()
    }
  }

  const USER_KEY = "e8fe3d65-822b-11f0-8411-10f60a82b815"
  const {
    data: fCountData,
    isLoading: fCountLoading,
    isError: fCountError
  } = useApiQuery<IFavoritesCountResponse>(
    ["fCount"],`/favorites/count?user_key=${USER_KEY}`,{
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000
    }
  )
  let favoritesCount = fCountData?.attributes
  
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
        {fCountLoading ? <Skeleton className={styles.user_actions__skeleton} width={20} height={20}/> : <span className={styles.user_actions__count}>{favoritesCount}</span>}
      
        <span className={styles.user_actions__label}>Избранное</span>
      </button>
      {/* <ProfilePopover
        isOpen={isProfilePopoverOpen}
        onOpenChange={setIsProfilePopoverOpen}
        userName="Фамилия Имя"
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogoutClick}
      > */}
      {/* </ProfilePopover> */}
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
