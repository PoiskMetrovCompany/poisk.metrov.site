"use client";
import React, { FC } from "react";
import styles from "./customSelect.module.scss";
import clsx from "clsx";
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
    className?: string;
}

const CustomSelect: FC<ICustomSelectProps> = ({
    label,
    options,
    placeholder,
    value,
    show,
    onToggle,
    onSelect,
    className,
    isLoading = false,
    error = ''
}) => (
    <div className={clsx(styles.customSelectWrapper, className)}>
        {label && (
            <label className={styles.selectLabel}>
                {label}
            </label>
        )}
        <div className={clsx(styles.customSelect)}>
            <div
                className={`${clsx(styles.selectSelected, className)} ${show ? styles.selectArrowActive : ''}`}
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