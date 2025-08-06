"use client";

import React, { FC } from "react";
import styles from "../../../layouts/carouselComponent.module.scss";

interface IDetailsButtonProps {
  onClick?: () => void;
}

const DetailsButton: FC<IDetailsButtonProps> = ({ onClick }) => {
  return (
    <button
      className={`${styles['property-card__button']} ${styles['property-card__button_secondary']}`}
      onClick={onClick}
    >
      Подробнее
    </button>
  );
};

export default DetailsButton;