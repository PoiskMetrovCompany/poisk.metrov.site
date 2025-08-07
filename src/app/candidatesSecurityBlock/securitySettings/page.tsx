"use client";
import React, { FC } from "react";
import BigHeader from "@/components/candidateRegForm/bigHeader";
import CandidatesSettings from "@/components/candidateRegForm/candidatesSettings";

const CandidatesSettingsPage: FC = () => {
    const handleCityChange = (city: string) => {
      console.log('Город изменен на:', city);
    };
  return (
    <>
      <BigHeader onCityChange={handleCityChange} activePage="settings" />
      <CandidatesSettings />
    </>
  );
};

export default CandidatesSettingsPage;