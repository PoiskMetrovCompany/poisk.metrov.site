import React, { FC } from "react";

interface ICatalogButton {
  onClick: () => void
}

const CatalogButton: FC<ICatalogButton> = ({ onClick }) => {
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