"use client";
import React, { FC } from "react";
import styles from "./customSelect.module.scss";

interface ICustomSelectProps {
    label?: string;
    options: string[];
    placeholder: string;
    value: string;
    onChange?: (value: string) => void;
    show: boolean;
    onToggle: () => void;
    onSelect: (option: string) => void;
    isLoading?: boolean;
    error?: string;
}

const CustomSelect: FC<ICustomSelectProps> = ({
    label,
    options,
    placeholder,
    value,
    show,
    onToggle,
    onSelect,
    isLoading = false,
    error = ''
}) => (
    <div className={styles.customSelectWrapper}>
        {label && (
            <label className={styles.selectLabel}>
                {label}
            </label>
        )}
        <div className={styles.customSelect}>
            <div
                className={`${styles.selectSelected} ${show ? styles.selectArrowActive : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isLoading) {
                        onToggle();
                    }
                }}
                style={{
                    opacity: isLoading ? 0.6 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
            >
                {isLoading ? 'Загрузка...' : (error ? 'Ошибка загрузки' : (value || placeholder))}
            </div>
            {!isLoading && !error && (
                <div className={`${styles.selectItems} ${!show ? styles.selectHide : ''}`}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={value === option ? styles.sameAsSelected : ''}
                            onClick={() => onSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

export default CustomSelect;