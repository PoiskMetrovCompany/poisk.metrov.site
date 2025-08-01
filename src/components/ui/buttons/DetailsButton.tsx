import React from "react";

const DetailsButton = ({ onClick }) => {
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