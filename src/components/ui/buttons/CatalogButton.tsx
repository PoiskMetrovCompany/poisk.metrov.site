"use client";

import React, { FC } from "react";

interface ICatalogButtonProps {
  onClick?: () => void;
}

const CatalogButton: FC<ICatalogButtonProps> = ({ onClick }) => {
  return (
    <button
      className="property-card__button property-card__button_primary"
      onClick={onClick}
    >
      Каталог
    </button>
  );
};

export default CatalogButton;