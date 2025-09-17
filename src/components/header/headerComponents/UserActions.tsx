"use client"

import React, { FC } from "react"

import { useRouter } from "next/navigation"

import { useAuthState } from "@/hooks/useAuthState"
import { IFavoritesCountResponse } from "@/types/api/favoritesCount"
import { useApiQuery } from "@/utils/hooks/use-api"

import styles from "../header.module.scss"

import LoginForm from "../loginForm"

import IconImage from "@/components/ui/IconImage"
import Skeleton from "@/components/ui/skeleton"

interface IUserActionsProps {
  onFavoritesClick?: () => void
  onMenuClick?: () => void
}

const UserActions: FC<IUserActionsProps> = ({
  onFavoritesClick,
  onMenuClick,
}) => {
  const router = useRouter()

  // Используем новую систему авторизации
  const { isAuthenticated, user } = useAuthState()

  const handleFavoritesClick = (): void => {
    if (onFavoritesClick) {
      onFavoritesClick()
    } else {
      router.push("/favourites")
    }
  }

  // Используем ключ пользователя из состояния авторизации
  const userKey = user?.key || ""
  const { data: fCountData, isLoading: fCountLoading } =
    useApiQuery<IFavoritesCountResponse>(
      ["fCount", userKey],
      userKey ? `/api/proxy/favorites/count?user_key=${userKey}` : "",
      {
        enabled: !!userKey,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      }
    )
  const favoritesCount = fCountData?.attributes

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
      {isAuthenticated ? (
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
          iconLink="/images/icons/header/showMenu-2.svg"
          alt="Menu"
        />
      </button>
    </div>
  )
}

export default UserActions
