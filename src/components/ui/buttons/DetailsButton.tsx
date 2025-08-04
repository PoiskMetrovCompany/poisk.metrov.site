"use client";

import React, { FC } from "react";

interface IDetailsButtonProps {
  onClick?: () => void;
}

const DetailsButton: FC<IDetailsButtonProps> = ({ onClick }) => {
  return (
    <button
      className="property-card__button property-card__button_secondary"
      onClick={onClick}
    >
      Подробнее
    </button>
  );
};

export default DetailsButton;