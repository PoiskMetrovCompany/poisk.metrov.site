import React, { FC, useState } from "react";
import clsx from "clsx";
import styles from "./filtersButton.module.scss";

interface FiltersButtonProps {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const FiltersButton: FC<FiltersButtonProps> = ({
  text,
  isActive = false,
  onClick,
  className
}) => {
  const [internalActive, setInternalActive] = useState(false);
  
  const active = isActive || internalActive;
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setInternalActive(!internalActive);
    }
  };

  return (
    <button
      className={clsx(
        styles.filtersButton,
        {
          [styles.filtersButton_active]: active,
        },
        className
      )}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default FiltersButton;