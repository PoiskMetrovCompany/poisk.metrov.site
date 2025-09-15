"use client"

import React, { FC, useState } from "react"

import { IFavoritesCountResponse } from "@/types/api/favoritesCount"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "../header.module.scss"

import LoginForm from "../loginForm"
import MobileMenu from "./mobileMenu"

import IconImage from "@/components/ui/IconImage"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleFavoritesClick = (): void => {
    if (onFavoritesClick) {
      onFavoritesClick()
    }
  }

  const USER_KEY = "e8fe3d65-822b-11f0-8411-10f60a82b815"
  const { data: fCountData, isLoading: fCountLoading } =
    useApiQuery<IFavoritesCountResponse>(
      ["fCount"],
      `/favorites/count?user_key=${USER_KEY}`,
      {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      }
    )
  const favoritesCount = fCountData?.attributes

  const handleMenuClick = (): void => {
    setIsMobileMenuOpen(true)
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
        <IconImage
          className={styles.user_actions__icon}
          iconLink="/images/icons/header/favourite-2.svg"
          alt="Favorites"
          // width={20}
          // height={20}
        />
        {fCountLoading ? (
          <Skeleton
            className={styles.user_actions__skeleton}
            width={20}
            height={20}
          />
        ) : (
          <span className={styles.user_actions__count}>{favoritesCount}</span>
        )}

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
          <IconImage
            className={styles.user_actions__icon}
            iconLink="/images/icons/header/profile-2.svg"
            alt="User"
            // width={20}
            // height={20}
          />
          <span className={styles.user_actions__text}>Профиль</span>
        </button>
      ) : (
        <LoginForm
          trigger={
            <button className={styles.user_actions__login} type="button">
              <IconImage
                className={styles.user_actions__icon}
                iconLink="/images/icons/header/profile-2.svg"
                alt="User"
                // width={20}
                // height={20}
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
        <IconImage
          className={styles.user_actions__showMenu__icon}
          iconLink={
            isMobileMenuOpen
              ? "/images/icons/header/closeMenu.svg"
              : "/images/icons/header/showMenu-2.svg"
          }
          alt="Menu"
        />
      </button>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
      />
    </div>
  )
}

export default UserActions
