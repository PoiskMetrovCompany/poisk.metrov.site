"use client";

import React, { FC } from "react";
import styles from "../../../layouts/carouselComponent.module.scss";

interface ICatalogButtonProps {
  onClick?: () => void;
}

const CatalogButton: FC<ICatalogButtonProps> = ({ onClick }) => {
  return (
    <button
      className={`${styles['property-card__button']} ${styles['property-card__button_primary']}`}
      onClick={onClick}
    >
      Каталог
    </button>
  );
};

export default CatalogButton;