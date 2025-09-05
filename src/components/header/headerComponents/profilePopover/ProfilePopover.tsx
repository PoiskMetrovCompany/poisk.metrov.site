"use client"

import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"

import React, { FC } from "react"

import styles from "./ProfilePopover.module.scss"

import IconImage from "@/components/ui/IconImage"

interface IProfilePopoverProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  userName?: string
  onSettingsClick?: () => void
  onLogoutClick?: () => void
  children: React.ReactNode
}

const ProfilePopover: FC<IProfilePopoverProps> = ({
  isOpen,
  onOpenChange,
  userName = "Фамилия Имя",
  onSettingsClick,
  onLogoutClick,
  children,
}) => {
  const handleSettingsClick = (): void => {
    if (onSettingsClick) {
      onSettingsClick()
    }
  }

  const handleLogoutClick = (): void => {
    if (onLogoutClick) {
      onLogoutClick()
    }
  }

  return (
    <Popover.Root open={isOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={styles.profile_popover}
          sideOffset={8}
          align="end"
        >
          <div className={styles.profile_popover__header}>
            <div className={styles.profile_popover__user_info}>
              <span className={styles.profile_popover__label}>
                Пользователь
              </span>
              <span className={styles.profile_popover__name}>{userName}</span>
            </div>

            <Popover.Close asChild>
              <button
                className={styles.profile_popover__close}
                type="button"
                aria-label="Закрыть"
              >
                <IconImage
                  iconLink="/images/icons/close.svg"
                  alt="Закрыть"
                  className={styles.profile_popover__close_icon}
                />
              </button>
            </Popover.Close>
          </div>

          <div className={styles.profile_popover__content}>
            <button
              className={clsx(
                styles.profile_popover__action,
                styles.profile_popover__action_settings
              )}
              type="button"
              onClick={handleSettingsClick}
            >
              <IconImage
                iconLink="/images/icons/settings.svg"
                alt="Настройки"
                className={styles.profile_popover__action_icon}
              />
              <span className={styles.profile_popover__action_text}>
                Настройка профиля
              </span>
            </button>

            <div className={styles.profile_popover__divider} />

            <button
              className={clsx(
                styles.profile_popover__action,
                styles.profile_popover__action_logout
              )}
              type="button"
              onClick={handleLogoutClick}
            >
              <IconImage
                iconLink="/images/icons/exit.svg"
                alt="Выйти"
                className={styles.profile_popover__action_icon}
              />
              <span className={styles.profile_popover__action_text}>
                Выйти из личного кабинета
              </span>
            </button>
          </div>

          {/* <Popover.Arrow className={styles.profile_popover__arrow} /> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default ProfilePopover
