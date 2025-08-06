"use client";
import React, { FC } from "react";
import BigHeader from "@/components/candidateRegForm/bigHeader";
import CandidatesSettings from "@/components/candidateRegForm/candidatesSettings";

const CandidatesSettingsPage: FC = () => {
  return (
    <>
      <BigHeader />
      <CandidatesSettings />
    </>
  );
};

export default CandidatesSettingsPage;