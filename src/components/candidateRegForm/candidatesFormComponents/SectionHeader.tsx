import React, { FC } from "react";
import { FormRow } from "./FormRow";
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <FormRow className="flex-direction-column" style={{ marginTop: '50px' }}>
      <h3>{title}</h3>
      {subtitle && <h4>{subtitle}</h4>}
    </FormRow>
  );
};