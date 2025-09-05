"use client";

import React, { FC } from "react";
import styles from "../../carouselBuildings/carouselComponent.module.scss";

interface ICatalogButtonProps {
  onClick?: () => void;
}

const CatalogButton: FC<ICatalogButtonProps> = ({ onClick }) => {
  return (
    <button
      className={`${styles.property_card__button} ${styles.property_card__button_primary}`}
      onClick={onClick}
    >
      Каталог
    </button>
  );
};

export default CatalogButton;