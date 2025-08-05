"use client";
import React, { FC } from "react";
import styles from "../header.module.scss";

interface IUserActionsProps {
  favoritesCount?: number;
  isLoggedIn?: boolean;
  onFavoritesClick?: () => void;
  onLoginClick?: () => void;
  onMenuClick?: () => void;
}

const UserActions: FC<IUserActionsProps> = ({
  favoritesCount = 1,
  isLoggedIn = false,
  onFavoritesClick,
  onLoginClick,
  onMenuClick
}) => {
  const handleFavoritesClick = (): void => {
    if (onFavoritesClick) {
      onFavoritesClick();
    }
  };

  const handleLoginClick = (): void => {
    if (onLoginClick) {
      onLoginClick();
    }
  };

  const handleMenuClick = (): void => {
    if (onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <div className={styles["user-actions"]}>
      <button
        className={styles["user-actions__favorites"]}
        type="button"
        onClick={handleFavoritesClick}
      >
        <svg
          className={styles["user-actions__icon"]}
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {favoritesCount > 0 && (
          <span className={styles["user-actions__count"]}>{favoritesCount}</span>
        )}
        <span className={styles["user-actions__label"]}>Избранное</span>
      </button>

      <button
        className={styles["user-actions__login"]}
        type="button"
        onClick={handleLoginClick}
      >
        <svg
          className={styles["user-actions__icon"]}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="7"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles["user-actions__text"]}>
          {isLoggedIn ? "Профиль" : "Войти"}
        </span>
      </button>

      <button
        className={styles["user-actions__showMenu"]}
        type="button"
        onClick={handleMenuClick}
      >
        <svg className="showMenuSvg"
          width="16px"
          height="16px"
          viewBox="0 0 16 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <path fill="#444" d="M0 1h16v2h-16v-2z"></path>
          <path fill="#444" d="M0 5h16v2h-16v-2z"></path>
          <path fill="#444" d="M0 9h16v2h-16v-2z"></path>
          <path fill="#444" d="M0 13h16v2h-16v-2z"></path>
        </svg>
      </button>
    </div>
  );
};

export default UserActions;