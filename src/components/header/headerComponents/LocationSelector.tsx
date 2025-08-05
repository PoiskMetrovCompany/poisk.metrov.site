"use client";
import React, { FC, useState } from "react";
import styles from "../header.module.scss";

interface ICity {
  name: string;
  id: string;
}

interface ILocationSelectorProps {
  defaultCity?: string;
  onCityChange?: (city: string) => void;
}

const LocationSelector: FC<ILocationSelectorProps> = ({
  defaultCity = "Новосибирск",
  onCityChange
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>(defaultCity);

  const cities: ICity[] = [
    { name: "Новосибирск", id: "novosibirsk" },
    { name: "Санкт-Петербург", id: "spb" },
  ];

  const handleCitySelect = (city: string): void => {
    setSelectedCity(city);
    setIsOpen(false);
    if (onCityChange) {
      onCityChange(city);
    }
  };

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles["location-selector"]}>
        <svg width="24px" height="24px" viewBox="0 0 100 100" ><path d="M87.13 0a2.386 2.386 0 0 0-.64.088a2.386 2.386 0 0 0-.883.463L11.34 62.373a2.386 2.386 0 0 0 1.619 4.219l37.959-1.479l17.697 33.614a2.386 2.386 0 0 0 4.465-.707L89.486 2.79A2.386 2.386 0 0 0 87.131 0z" fill="#000000"></path></svg>
      <button
        className={styles["location-selector__button"]}
        onClick={toggleDropdown}
        type="button"
      >
        <span className={styles["location-selector__text"]}>{selectedCity}</span>
        <svg 
          className={`${styles["location-selector__arrow"]} ${isOpen ? styles["location-selector__arrow--open"] : ""}`}
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M6 9L12 15L18 9" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className={styles["location-selector__dropdown"]}>
          <ul className={styles["location-selector__list"]}>
            {cities.map((city) => (
              <li key={city.id} className={styles["location-selector__item"]}>
                <button
                  className={`${styles["location-selector__option"]} ${
                    city.name === selectedCity ? styles["location-selector__option--active"] : ""
                  }`}
                  onClick={() => handleCitySelect(city.name)}
                  type="button"
                >
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;