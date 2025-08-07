"use client";

import React, { FC } from "react";
import styles from "../../carouselBuildings/carouselComponent.module.scss";

interface IDetailsButtonProps {
  onClick?: () => void;
}

const DetailsButton: FC<IDetailsButtonProps> = ({ onClick }) => {
  return (
    <button
      className={`${styles.property_card__button} ${styles.property_card__button_secondary}`}
      onClick={onClick}
    >
      Подробнее
    </button>
  );
};

export default DetailsButton;