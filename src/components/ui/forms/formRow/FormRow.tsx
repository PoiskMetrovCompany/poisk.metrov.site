import React, { FC, ReactNode } from "react";
import styles from "./formRow.module.scss";
import clsx from "clsx";

interface FormRowProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
}

export const FormRow: FC<FormRowProps> = ({
  children,
  className = "",
  style,
  justifyContent
}) => {
  
  const getJustifyClass = () => {
    switch (justifyContent) {
      case 'space-between':
        return styles['justify-space-between'];
      case 'space-around':
        return styles['justify-space-around'];
      case 'flex-start':
        return styles['justify-flex-start'];
      default:
        return '';
    }
  };

  const customStyle: React.CSSProperties = {
    ...style,
    ...(justifyContent && 
        !['space-between', 'space-around', 'flex-start'].includes(justifyContent) && 
        { justifyContent }
    )
  };

  return (
    <div 
      className={clsx(
        styles.formRow,
        getJustifyClass(),
        className
      )} 
      style={Object.keys(customStyle).length > 0 ? customStyle : style}
    >
      {children}
    </div>
  );
};