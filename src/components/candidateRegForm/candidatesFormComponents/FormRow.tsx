import React, { FC, ReactNode } from "react";

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
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(justifyContent && { justifyContent })
  };

  return (
    <div className={`formRow ${className}`} style={combinedStyle}>
      {children}
    </div>
  );
};