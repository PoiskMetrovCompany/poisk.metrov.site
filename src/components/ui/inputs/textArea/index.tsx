"use client";
import React, { FC } from "react";
import styles from "./textAreaContainer.module.scss";
import clsx from "clsx";

type ResizeType = "X" | "Y" | "XY" | "none";

interface TextAreaContainerProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  name: string;
  prefix?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  resize?: ResizeType;
}

const TextAreaContainer: FC<TextAreaContainerProps> = ({
  label,
  placeholder,
  value,
  onChange,
  name,
  prefix,
  required = false,
  disabled = false,
  className,
  resize = "Y"
}) => {
  const getResizeStyle = () => {
    switch (resize) {
      case "X":
        return "horizontal";
      case "Y":
        return "vertical";
      case "XY":
        return "both";
      case "none":
        return "none";
      default:
        return "vertical";
    }
  };

  return (
    <div className={clsx(styles.textAreaContainer, className)}>
      <label
        htmlFor={name}
        className={styles.textAreaContainer__label}
      >
        {label}
      </label>
      <div className={styles.textAreaContainer__wrapper}>
        {prefix && (
          <span className={styles.textAreaContainer__prefix}>
            {prefix}
          </span>
        )}
        <textarea
          id={name}
          name={name}
          className={styles.textAreaContainer__textarea}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          style={{ resize: getResizeStyle() }}
        />
      </div>
    </div>
  );
};

export default TextAreaContainer;