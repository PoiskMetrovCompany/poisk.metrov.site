import React, { FC } from "react";
import { FormRow } from "./FormRow";
import { RadioGroup } from "./RadioGroup";
import { SectionHeader } from "./SectionHeader";
import EducationDataTable from "../EducationDataTable";
import CourseDataTable from "../CourseDataTable";
import Image from "next/image";
import WorkExperienceTable from "../WorkExperienceTable";

interface EducationSectionProps {
  selectedEducationLevel: string;
  setSelectedEducationLevel: React.Dispatch<React.SetStateAction<string>>;
  selectedProfessionalExperience: string;
  setSelectedProfessionalExperience: React.Dispatch<React.SetStateAction<string>>;
  formData: Record<string, any>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  additionalEducationTables: number[];
  additionalCourseTables: number[];
  onAddEducationTable: () => void;
  onAddCourseTable: () => void;
}

export const EducationSection: FC<EducationSectionProps> = ({
  selectedEducationLevel,
  setSelectedEducationLevel,
  selectedProfessionalExperience,
  setSelectedProfessionalExperience,
  formData,
  setFormData,
  additionalEducationTables,
  additionalCourseTables,
  onAddEducationTable,
  onAddCourseTable,
}) => {
  const educationLevelOptions = [
    { value: 'Высшее', label: 'Высшее' },
    { value: 'Неоконченное высшее', label: 'Неоконченное высшее' },
    { value: 'Среднее специальное', label: 'Среднее специальное' },
    { value: 'Среднее общее', label: 'Среднее общее' }
  ];

  const professionalExperienceOptions = [
    { value: 'Нет опыта', label: 'Нет опыта' },
    { value: 'Опыт есть', label: 'Опыт есть' }
  ];

  return (
    <>
      <SectionHeader 
        title="Образование и профессиональный опыт"
        subtitle="Заполните эти данные, чтобы мы могли предложить вам подходящие условия"
      />

      <FormRow className="justify-flex-start">
        <p style={{marginTop: 0, marginLeft: "0.4375rem", color: "rgba(24, 24, 23, 1)"}}>
          1. Какой ваш уровень образования
        </p>
      </FormRow>

      <FormRow className="justify-flex-start" style={{marginTop: "10px"}}>
        <RadioGroup
          name="educationLevel"
          options={educationLevelOptions}
          value={selectedEducationLevel}
          onChange={setSelectedEducationLevel}
        />
      </FormRow>

      <EducationDataTable index={1} formData={formData} setFormData={setFormData} />
      {additionalEducationTables.map(index => (
        <EducationDataTable key={index} index={index} formData={formData} setFormData={setFormData} />
      ))}

      <FormRow style={{marginBottom: 0}}>
        <button className="bigFormButton" onClick={onAddEducationTable}>
          <div className="textCont"></div>
          <Image 
            src="/images/icons/plus.svg" 
            alt="Plus icon" 
            width={24} 
            height={24} 
          />
          Добавить высшее образование
        </button>
      </FormRow>
      <FormRow className="justify-flex-start" style={{marginTop: '10px'}}>
        <p style={{marginTop: 0}}>Добавьте информацию о дополнительном высшем образовании</p>
      </FormRow>

      {additionalCourseTables.map(index => (
        <CourseDataTable key={index} index={index} formData={formData} setFormData={setFormData} />
      ))}

      <FormRow style={{marginBottom: 0}}>
        <button className="bigFormButton" onClick={onAddCourseTable}>
          <div className="textCont"></div>
          <Image 
              src="/images/icons/plus.svg" 
              alt="Plus icon" 
              width={24} 
              height={24} 
          />
          Добавить дополнительное образование
        </button>
      </FormRow>
      <FormRow className="justify-flex-start" style={{marginTop: '10px'}}>
        <p style={{marginTop: 0}}>Добавьте информацию о пройденных курсах повышения квалификации</p>
      </FormRow>

      <FormRow className="justify-flex-start required">
        <p style={{marginTop: 0, marginLeft: "0.4375rem", color: "rgba(24, 24, 23, 1)"}}>
          2. Какой ваш профессиональный опыт?
        </p>
      </FormRow>

      <FormRow className="justify-flex-start" style={{marginTop: "10px"}}>
        <RadioGroup
          name="professionalExperience"
          options={professionalExperienceOptions}
          value={selectedProfessionalExperience}
          onChange={setSelectedProfessionalExperience}
        />
      </FormRow>

      {selectedProfessionalExperience === 'Опыт есть' && (
        <WorkExperienceTable formData={formData} setFormData={setFormData} />
      )}
    </>
  );
};