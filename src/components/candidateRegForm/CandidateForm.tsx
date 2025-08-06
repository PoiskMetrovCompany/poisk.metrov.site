"use client";
import React, { FC, useState, useEffect } from "react";
import WorkExperienceTable from "./WorkExperienceTable";
import SpouseTable from "./SpouseTable";
import CourseDataTable from "./CourseDataTable";
import EducationDataTable from "./EducationDataTable";
import RelativeTable from "./RelativeTable";
import ChildrenTable from "./ChildrenTable";
import CustomSelect from "./CustomSelect";

const CandidateForm: FC = () => {
  // Состояния для управления видимостью блоков
  const [surnameChanged, setSurnameChanged] = useState(true);
  const [haveChildren, setHaveChildren] = useState(true);
  const [haveFamilyMembers, setHaveFamilyMembers] = useState(true);
  const [criminalResponsibility, setCriminalResponsibility] = useState(false);
  const [legalEntity, setLegalEntity] = useState(false);
  const [militaryDuty, setMilitaryDuty] = useState(true);
  const [personalDataChecked, setPersonalDataChecked] = useState(false);

  const [selectedVacancy, setSelectedVacancy] = useState('');
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState('');
  const [showVacancyOptions, setShowVacancyOptions] = useState(false);
  const [showMaritalOptions, setShowMaritalOptions] = useState(false);

  const [selectedEducationLevel, setSelectedEducationLevel] = useState('Высшее');

  const [relativeCounter, setRelativeCounter] = useState(1);
  const [childrenCounter, setChildrenCounter] = useState(1);

  const [courseCounter, setCourseCounter] = useState(1);
  const [additionalCourseTables, setAdditionalCourseTables] = useState<number[]>([]);

  // Массивы для хранения дополнительных таблиц
  const [additionalRelativeTables, setAdditionalRelativeTables] = useState<number[]>([]);
  const [additionalChildrenTables, setAdditionalChildrenTables] = useState<number[]>([]);

  // Состояния для образования
  const [educationCounter, setEducationCounter] = useState(1);
  const [additionalEducationTables, setAdditionalEducationTables] = useState<number[]>([]);

  // Новые состояния для API данных
  const [vacancyOptions, setVacancyOptions] = useState<string[]>([]);
  const [isLoadingVacancies, setIsLoadingVacancies] = useState(true);
  const [vacancyError, setVacancyError] = useState('');

  // Состояния для семейного положения из API
  const [maritalStatusApiOptions, setMaritalStatusApiOptions] = useState<string[]>([]);
  const [isLoadingMaritalStatuses, setIsLoadingMaritalStatuses] = useState(true);
  const [maritalStatusError, setMaritalStatusError] = useState('');

  // Состояния для отправки формы
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [selectedProfessionalExperience, setSelectedProfessionalExperience] = useState('Нет опыта');

  //Состояния для селекта города
  const [selectedCity, setSelectedCity] = useState('');
  const [showCityOptions, setShowCityOptions] = useState(false);

  // Централизованное состояние для данных формы
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Функция для получения токена из cookie
  const getAccessTokenFromCookie = (): string | null => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'access_token') {
        return value;
      }
    }
    return null;
  };

  // Функция для форматирования даты из dd.mm.yyyy в yyyy-mm-dd
  const formatDateForDatabase = (dateString: string): string | null => {
    if (!dateString || dateString.trim() === '') {
      return null;
    }

    const ddmmyyyyPattern = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
    const match = dateString.match(ddmmyyyyPattern);

    if (match) {
      const [, day, month, year] = match;
      const formattedDay = day.padStart(2, '0');
      const formattedMonth = month.padStart(2, '0');
      return `${year}-${formattedMonth}-${formattedDay}`;
    }

    const yyyymmddPattern = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
    if (yyyymmddPattern.test(dateString)) {
      return dateString;
    }

    console.warn(`Неверный формат даты: ${dateString}`);
    return null;
  };

  const formatNameInput = (value: string): string => {
    return value.replace(/[^а-яёА-ЯЁa-zA-Z\s\-]/g, '');
  };

  const formatDate = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return numbers.slice(0, 2) + '.' + numbers.slice(2);
    } else {
      return numbers.slice(0, 2) + '.' + numbers.slice(2, 4) + '.' + numbers.slice(4, 8);
    }
  };

  const formatMobilePhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    
    let formattedNumbers = numbers;
    if (numbers.length > 0 && numbers[0] !== '7') {
      formattedNumbers = '7' + numbers;
    }

    if (formattedNumbers.length <= 1) {
      return '+7';
    } else if (formattedNumbers.length <= 4) {
      return '+7 (' + formattedNumbers.slice(1);
    } else if (formattedNumbers.length <= 7) {
      return '+7 (' + formattedNumbers.slice(1, 4) + ') ' + formattedNumbers.slice(4);
    } else if (formattedNumbers.length <= 9) {
      return '+7 (' + formattedNumbers.slice(1, 4) + ') ' + formattedNumbers.slice(4, 7) + '-' + formattedNumbers.slice(7);
    } else {
      return '+7 (' + formattedNumbers.slice(1, 4) + ') ' + formattedNumbers.slice(4, 7) + '-' + formattedNumbers.slice(7, 9) + '-' + formattedNumbers.slice(9, 11);
    }
  };

  const formatHomePhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 3) {
      return numbers;
    } else {
      return numbers.slice(0, 3) + ' ' + numbers.slice(3, 6);
    }
  };

  const formatPassport = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 4) {
      return numbers;
    } else {
      return numbers.slice(0, 4) + ' ' + numbers.slice(4, 10);
    }
  };

  const handleFormDataChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, value: string) => {
    const formattedValue = formatDate(value);
    handleFormDataChange(name, formattedValue);
  };

  const handleMobilePhoneChange = (name: string, value: string) => {
    const formattedValue = formatMobilePhone(value);
    handleFormDataChange(name, formattedValue);
  };

  const handleHomePhoneChange = (name: string, value: string) => {
    const formattedValue = formatHomePhone(value);
    handleFormDataChange(name, formattedValue);
  };

  const handlePassportChange = (name: string, value: string) => {
    const formattedValue = formatPassport(value);
    handleFormDataChange(name, formattedValue);
  };

  const collectEducationData = () => {
    const educationData = [];
    
    if (formData.nameInstitution1) {
      educationData.push({
        institution_name: formData.nameInstitution1 || '',
        start_date: formatDateForDatabase(formData.dateOfEntrance1) || '',
        end_date: formatDateForDatabase(formData.dateOfEnding1) || '',
        education_type: formData.typeOfEducation1 || '',
        specialty: formData.diplomaSpeciality1 || ''
      });
    }
    
    additionalEducationTables.forEach(index => {
      if (formData[`nameInstitution${index}`]) {
        educationData.push({
          institution_name: formData[`nameInstitution${index}`] || '',
          start_date: formatDateForDatabase(formData[`dateOfEntrance${index}`]) || '',
          end_date: formatDateForDatabase(formData[`dateOfEnding${index}`]) || '',
          education_type: formData[`typeOfEducation${index}`] || '',
          specialty: formData[`diplomaSpeciality${index}`] || ''
        });
      }
    });
    
    return educationData;
  };

  const collectCoursesData = () => {
    const coursesData = [];
    
    if (formData.courseName1) {
      coursesData.push({
        institution_name: formData.courseName1 || '',
        course_name: formData.courseTitle1 || '',
        start_date: formatDateForDatabase(formData.courseStartDate1) || '',
        end_date: formatDateForDatabase(formData.courseEndDate1) || ''
      });
    }
    
    additionalCourseTables.forEach(index => {
      if (formData[`courseName${index}`]) {
        coursesData.push({
          institution_name: formData[`courseName${index}`] || '',
          course_name: formData[`courseTitle${index}`] || '',
          start_date: formatDateForDatabase(formData[`courseStartDate${index}`]) || '',
          end_date: formatDateForDatabase(formData[`courseEndDate${index}`]) || ''
        });
      }
    });
    
    return coursesData;
  };

  const collectChildrenData = () => {
    if (!haveChildren) {
      return null;
    }

    const children = [];

    if (formData.FIOChildren1) {
      children.push({
        full_name: formData.FIOChildren1 || '',
        birth_date: formatDateForDatabase(formData.dateOfBirthChildren1) || '',
        phone: formData.phoneNumberChildren1 || '',
        work_study_place: formData.placeOfStudyChildren1 || '',
        residence_address: formData.placeOfLivingChildren1 || ''
      });
    }

    additionalChildrenTables.forEach(index => {
      if (formData[`FIOChildren${index}`]) {
        children.push({
          full_name: formData[`FIOChildren${index}`] || '',
          birth_date: formatDateForDatabase(formData[`dateOfBirthChildren${index}`]) || '',
          phone: formData[`phoneNumberChildren${index}`] || '',
          work_study_place: formData[`placeOfStudyChildren${index}`] || '',
          residence_address: formData[`placeOfLivingChildren${index}`] || ''
        });
      }
    });

    return children.length > 0 ? children : null;
  };

  const collectFamilyMembersData = () => {
    if (!haveFamilyMembers) {
      return null;
    }

    const familyMembers = [];

    if (formData.FIORelative1) {
      familyMembers.push({
        relationship_and_name: formData.FIORelative1 || '',
        birth_date: formatDateForDatabase(formData.dateOfBirthRelative1) || '',
        phone: formData.phoneNumberRelative1 || '',
        work_study_place: formData.placeOfStudyRelative1 || '',
        residence_address: formData.placeOfLivingRelative1 || ''
      });
    }

    additionalRelativeTables.forEach(index => {
      if (formData[`FIORelative${index}`]) {
        familyMembers.push({
          relationship_and_name: formData[`FIORelative${index}`] || '',
          birth_date: formatDateForDatabase(formData[`dateOfBirthRelative${index}`]) || '',
          phone: formData[`phoneNumberRelative${index}`] || '',
          work_study_place: formData[`placeOfStudyRelative${index}`] || '',
          residence_address: formData[`placeOfLivingRelative${index}`] || ''
        });
      }
    });

    return familyMembers.length > 0 ? familyMembers : null;
  };

  // Функция для загрузки вакансий из API
  const loadVacancies = async () => {
    try {
      setIsLoadingVacancies(true);
      setVacancyError('');

      const accessToken = getAccessTokenFromCookie();

      if (!accessToken) {
        setVacancyError('Токен доступа не найден');
        return;
      }

      const response = await fetch('/api/v1/vacancy/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();

      if (data.response && data.attributes) {
        const vacancies = data.attributes.map((vacancy: any) => vacancy.title);
        setVacancyOptions(vacancies);
        (window as any).vacanciesData = data.attributes;
        console.log('Вакансии загружены:', vacancies);
      } else {
        setVacancyError('Ошибка при получении данных вакансий');
      }
    } catch (error: any) {
      console.error('Ошибка при загрузке вакансий:', error);

      if (error.response) {
        if (error.response.status === 401) {
          setVacancyError('Ошибка авторизации. Пожалуйста, войдите в систему заново.');
        } else if (error.response.status === 403) {
          setVacancyError('Нет доступа к данным вакансий');
        } else {
          setVacancyError(error.response.data?.error || 'Ошибка сервера при загрузке вакансий');
        }
      } else {
        setVacancyError('Ошибка при загрузке вакансий');
      }
    } finally {
      setIsLoadingVacancies(false);
    }
  };

  // Функция для загрузки семейного положения из API
  const loadMaritalStatuses = async () => {
    try {
      setIsLoadingMaritalStatuses(true);
      setMaritalStatusError('');

      const accessToken = getAccessTokenFromCookie();

      if (!accessToken) {
        setMaritalStatusError('Токен доступа не найден');
        return;
      }

      const response = await fetch('/api/v1/marital-statuses/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();

      if (data.response && data.attributes) {
        const maritalStatuses = data.attributes.map((status: any) => status.title);
        setMaritalStatusApiOptions(maritalStatuses);
        (window as any).maritalStatusData = data.attributes;
        console.log('Семейное положение загружено:', maritalStatuses);
      } else {
        setMaritalStatusError('Ошибка при получении данных семейного положения');
      }
    } catch (error: any) {
      console.error('Ошибка при загрузке семейного положения:', error);

      if (error.response) {
        if (error.response.status === 401) {
          setMaritalStatusError('Ошибка авторизации. Пожалуйста, войдите в систему заново.');
        } else if (error.response.status === 403) {
          setMaritalStatusError('Нет доступа к данным семейного положения');
        } else {
          setMaritalStatusError(error.response.data?.error || 'Ошибка сервера при загрузке семейного положения');
        }
      } else {
        setMaritalStatusError('Ошибка при загрузке семейного положения');
      }
    } finally {
      setIsLoadingMaritalStatuses(false);
    }
  };

  // Загружаем вакансии при монтировании компонента
  useEffect(() => {
    loadVacancies();
    loadMaritalStatuses();
  }, []);

  // Используем данные из API если они загружены, иначе статичные варианты
  const maritalStatusOptions = maritalStatusApiOptions.length > 0 ? maritalStatusApiOptions : [
    'Не женат/Не замужем',
    'Женат/Замужем',
    'В разводе',
    'Вдовец/Вдова',
    'Гражданский брак'
  ];

  const cityOptions = ['Новосибирск', 'Санкт-Петербург'];

  // Функция для закрытия всех select'ов при клике вне их
  useEffect(() => {
    const handleClickOutside = () => {
      setShowVacancyOptions(false);
      setShowMaritalOptions(false);
      setShowCityOptions(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Функция для добавления таблицы члена семьи
  const addRelativeTable = () => {
    const newCounter = relativeCounter + 1;
    setRelativeCounter(newCounter);
    setAdditionalRelativeTables(prev => [...prev, newCounter]);
  };

  // Функция для добавления таблицы ребенка
  const addChildrenTable = () => {
    const newCounter = childrenCounter + 1;
    setChildrenCounter(newCounter);
    setAdditionalChildrenTables(prev => [...prev, newCounter]);
  };

  // Функция для получения ключа вакансии
  const getVacancyKey = (selectedTitle: string): string => {
    if ((window as any).vacanciesData) {
      const vacancy = (window as any).vacanciesData.find((v: any) => v.title === selectedTitle);
      return vacancy ? vacancy.key : '';
    }
    return '';
  };

  const addEducationTable = () => {
    const newCounter = educationCounter + 1;
    setEducationCounter(newCounter);
    setAdditionalEducationTables(prev => [...prev, newCounter]);
  };

  const addCourseTable = () => {
    const newCounter = courseCounter + 1;
    setCourseCounter(newCounter);
    setAdditionalCourseTables(prev => [...prev, newCounter]);
  };

  // Функция для получения ключа семейного положения
  const getMaritalStatusKey = (selectedTitle: string): string => {
    if ((window as any).maritalStatusData) {
      const status = (window as any).maritalStatusData.find((s: any) => s.title === selectedTitle);
      return status ? status.key : '';
    }
    return '';
  };

  // Функция для разделения ФИО
  const splitFullName = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    return {
      last_name: parts[0] || '',
      first_name: parts[1] || '',
      middle_name: parts[2] || ''
    };
  };

  // Функция для разделения серии и номера паспорта
  const splitPassportData = (passportSeriaNumber: string) => {
    const parts = passportSeriaNumber.replace(/\s+/g, ' ').trim().split(' ');
    return {
      passport_series: parts[0] || '',
      passport_number: parts[1] || ''
    };
  };

  // Функция для разделения адреса на страну и город
  const splitBirthPlace = (birthPlace: string) => {
    if (!birthPlace) return { country: '', city: '' };

    const parts = birthPlace.split(',').map(part => part.trim());
    return {
      country: parts[0] || '',
      city: parts.length > 1 ? parts.slice(1).join(', ') : parts[0] || ''
    };
  };

  // Функция для отправки формы
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError('');

      const accessToken = getAccessTokenFromCookie();

      if (!accessToken) {
        setSubmitError('Токен доступа не найден');
        return;
      }

      // Разделяем ФИО
      const nameData = splitFullName(formData.FIO || '');

      // Разделяем паспортные данные
      const passportData = splitPassportData(formData.passwordSeriaNumber || '');

      // Разделяем место рождения
      const birthPlaceData = splitBirthPlace(formData.birthPlace);

      // Собираем данные детей и членов семьи
      const childrenData = collectChildrenData();
      const familyMembersData = collectFamilyMembersData();

      // Формируем данные для API
      const apiData = {
        vacancies_key: getVacancyKey(selectedVacancy),
        marital_statuses_key: getMaritalStatusKey(selectedMaritalStatus),
        status: "active", // По умолчанию
        first_name: nameData.first_name,
        last_name: nameData.last_name,
        middle_name: nameData.middle_name,
        reason_for_changing_surnames: surnameChanged ? (formData.reasonOfChange || '') : null,
        city_work: selectedCity, 
        birth_date: formatDateForDatabase(formData.birthDate),
        country_birth: birthPlaceData.country,
        city_birth: birthPlaceData.city,
        level_educational: selectedEducationLevel,
        courses: JSON.stringify(collectCoursesData()),
        educational_institution: JSON.stringify(collectEducationData()),
        organization_name: formData.companyName || '',
        organization_phone: formData.companyPhone || '',
        field_of_activity: formData.companyActivity || '',
        organization_address: formData.companyAddress || '',
        organization_job_title: formData.position || '',
        organization_price: formData.salary || '',
        date_of_hiring: formatDateForDatabase(formData.hireDate),
        date_of_dismissal: formatDateForDatabase(formData.dismissalDate),
        reason_for_dismissal: formData.dismissalReason || '',
        recommendation_contact: formData.referenceContact || '',
        mobile_phone_candidate: formData.mobileNumber || '',
        home_phone_candidate: formData.domesticNumber || '',
        mail_candidate: formData.email || '',
        inn: formData.INN || '',
        passport_series: passportData.passport_series,
        passport_number: passportData.passport_number,
        passport_issued: formData.issuedBy || '',
        passport_issue_date: formatDateForDatabase(formData.dateOfIssue),
        permanent_registration_address: formData.adressOfPermanentReg || '',
        temporary_registration_address: formData.adressOfTemporaryReg || '',
        actual_residence_address: formData.adressOfFactialLiving || '',
        family_partner: (selectedMaritalStatus === 'Состою в зарегистрированном браке') ? JSON.stringify({
          full_name: formData.FIOSuprug || '',
          birth_date: formatDateForDatabase(formData.dateOfBirthTable) || '',
          phone: formData.phoneNumberTable || '',
          work_study_place: formData.placeOfStudy || '',
          residence_address: formData.placeOfLiving || ''
        }) : JSON.stringify({}),
        adult_family_members: familyMembersData ? JSON.stringify(familyMembersData) : JSON.stringify([]),
        adult_children: childrenData ? JSON.stringify(childrenData) : JSON.stringify([]),
        serviceman: militaryDuty,
        law_breaker: criminalResponsibility ? (formData.whyPrisoner || 'Да') : 'Нет',
        legal_entity: legalEntity ? (formData.LegalEntity || 'Да') : 'Нет',
        is_data_processing: personalDataChecked,
        comment: 'Коммент'
      };

      console.table(apiData);

      const response = await fetch('/api/v1/candidates/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(apiData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        console.log('Анкета успешно отправлена:', result);
      } else {
        console.error('Ошибка при отправке:', result);
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat();
          setSubmitError(`Ошибки в форме: ${(errorMessages as string[]).slice(0, 3).join(', ')}${errorMessages.length > 3 ? '...' : ''}`);
        } else {
          setSubmitError(result.message || 'Ошибка при отправке анкеты');
        }
      }
    } catch (error: any) {
      console.error('Ошибка при отправке анкеты:', error);
      setSubmitError('Ошибка соединения с сервером');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header>
        <img src="/img/Logo с текстом.png" alt="Картинка с логотипом агенства и подписью Поиск метров" />
      </header>

      {!submitSuccess && (
        <article>
          <h1>Анкета кандидата</h1>
          <p style={{margin: "0 20px"}}>Заполните анкету, чтобы подать заявку на вакансию</p>
        </article>
      )}

      <main>
        <section>
          {submitSuccess ? (
            <div className="center-card" style={{maxHeight: '364px'}}>
              <div style={{marginTop: 0}} className="formRow justify-center">
                <div className="successMarker">
                  <svg width="56" height="56" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#e8f5e8" stroke="#4caf50" strokeWidth="2"/>
                    <polyline points="12,20 17,25 28,14" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>
              <div className="formRow justify-center">
                <h1>Анкета успешно отправлена</h1>
              </div>
              <div className="formRow justify-center">
                <p>Мы успешно получили вашу анкету</p>
              </div>
              <div className="formRow justify-center">
                <button
                  id="closeNotification"
                  className="formBtn btn-active"
                  onClick={() => window.location.reload()}
                >
                  Закрыть
                </button>
              </div>
            </div>
          ) : (
            <div className="center-card big">
              <h1>Общие сведения</h1>
              <p>Мы не передаём эти данные третьим лицам и используем их только для целей адаптации и сопровождения кандидатов</p>

              <div className="formRow">
                <div className="input-container">
                  <label htmlFor="Vacancy" className="formLabel">Вакансия</label>
                  <CustomSelect
                    options={vacancyOptions}
                    placeholder="Выберите вакансию, на которую подаетесь"
                    value={selectedVacancy}
                    show={showVacancyOptions}
                    isLoading={isLoadingVacancies}
                    error={vacancyError}
                    onToggle={() => {
                      setShowVacancyOptions(!showVacancyOptions);
                      setShowMaritalOptions(false);
                      setShowCityOptions(false); 
                    }}
                    onSelect={(option) => {
                      setSelectedVacancy(option);
                      setShowVacancyOptions(false);
                    }}
                  />
                  {vacancyError && (
                    <div className="error-message" style={{ marginTop: '5px', fontSize: '14px', color: '#e74c3c' }}>
                      {vacancyError}
                      <button
                        onClick={loadVacancies}
                        style={{
                          marginLeft: '10px',
                          background: 'none',
                          border: 'none',
                          color: '#3498db',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        Повторить
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="formRow">
                <div className="input-container">
                  <label htmlFor="City" className="formLabel">Город работы</label>
                  <CustomSelect
                    options={cityOptions}
                    placeholder="Выберите город в котором хотите работать"
                    value={selectedCity}
                    show={showCityOptions}
                    isLoading={false}
                    error=""
                    onToggle={() => {
                      setShowCityOptions(!showCityOptions);
                      setShowVacancyOptions(false);
                      setShowMaritalOptions(false);
                    }}
                    onSelect={(option) => {
                      setSelectedCity(option);
                      setShowCityOptions(false);
                    }}
                  />
                </div>
              </div>

              <div className="formRow">
                <div className="input-container">
                  <label htmlFor="FIO" className="formLabel">ФИО</label>
                  <input
                    type="text"
                    name="FIO"
                    className="formInput big"
                    placeholder="Иванов Иван Иванович"
                    value={formData.FIO || ''}
                    onChange={(e) => handleFormDataChange('FIO', formatNameInput(e.target.value))}
                  />
                </div>
              </div>

              <div className="formRow justify-flex-start">
                <div className="input-container big">
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="surnameChanged"
                      checked={surnameChanged}
                      onChange={() => setSurnameChanged(true)}
                    />
                    <span className="radiomark"></span>
                    Я менял(-а) фамилию
                  </label>

                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="surnameChanged"
                      checked={!surnameChanged}
                      onChange={() => setSurnameChanged(false)}
                    />
                    <span className="radiomark"></span>
                    Я не менял(-а) фамилию
                  </label>
                </div>
              </div>

              {surnameChanged && (
                <div className="toggle-block" style={{width: '100%'}}>
                  <div className="formRow">
                    <div className="input-container">
                      <label htmlFor="reasonOfChange" className="formLabel">Причина изменения фамилии</label>
                      <input
                        type="text"
                        name="reasonOfChange"
                        className="formInput big"
                        placeholder="Опишите, почему поменяли фамилию"
                        value={formData.reasonOfChange || ''}
                        onChange={(e) => handleFormDataChange('reasonOfChange', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="formRow justify-space-between">
                <div className="input-container w-49">
                  <label htmlFor="birthDate" className="formLabel">Дата рождения</label>
                  <input
                    style={{width: '100%'}}
                    type="text"
                    name="birthDate"
                    className="formInput"
                    placeholder="01.01.1990"
                    maxLength={10}
                    value={formData.birthDate || ''}
                    onChange={(e) => handleDateChange('birthDate', e.target.value)}
                  />
                </div>

                <div className="input-container w-49">
                  <label htmlFor="birthPlace" className="formLabel">Место рождения</label>
                  <input
                    style={{width: '100%'}}
                    type="text"
                    name="birthPlace"
                    className="formInput"
                    placeholder="Страна, город"
                    value={formData.birthPlace || ''}
                    onChange={(e) => handleFormDataChange('birthPlace', e.target.value)}
                  />
                </div>
              </div>

              <div className="formRow justify-space-between">
                <div className="input-container w-49">
                  <label htmlFor="mobileNumber" className="formLabel">Мобильный телефон</label>
                  <input
                    style={{width: '100%'}}
                    type="text"
                    name="mobileNumber"
                    className="formInput"
                    placeholder="+7 (905) 123-45-67"
                    maxLength={18}
                    value={formData.mobileNumber || ''}
                    onChange={(e) => handleMobilePhoneChange('mobileNumber', e.target.value)}
                  />
                </div>

                <div className="input-container w-49">
                  <label htmlFor="domesticNumber" className="formLabel">Домашний телефон</label>
                  <input
                    style={{width: '100%'}}
                    type="text"
                    name="domesticNumber"
                    className="formInput"
                    placeholder="999 999"
                    maxLength={7}
                    value={formData.domesticNumber || ''}
                    onChange={(e) => handleHomePhoneChange('domesticNumber', e.target.value)}
                  />
                </div>
              </div>

              <div className="formRow justify-space-between">
                <div className="input-container w-49">
                  <label htmlFor="email" className="formLabel">E-mail</label>
                  <input
                    style={{width: '100%'}}
                    type="email"
                    name="email"
                    className="formInput"
                    placeholder="example@gmail.com"
                    value={formData.email || ''}
                    onChange={(e) => handleFormDataChange('email', e.target.value)}
                  />
                </div>

                <div className="input-container w-49">
                  <label htmlFor="INN" className="formLabel">ИНН</label>
                  <input
                    style={{width: '100%'}}
                    type="tel"
                    name="INN"
                    className="formInput"
                    placeholder="123456789012"
                    maxLength={12}
                    value={formData.INN || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      handleFormDataChange('INN', value);
                    }}
                  />
                </div>
              </div>

              <div className="formRow flex-direction-column" style={{marginTop: '50px'}}>
                <h3>Образование и профессиональный опыт</h3>
                <h4>Заполните эти данные, чтобы мы могли предложить вам подходящие условия</h4>
              </div>

              <div className="formRow justify-flex-start">
                <p style={{marginTop: 0, marginLeft: "0.4375rem", color: "rgba(24, 24, 23, 1)"}}>1. Какой ваш уровень образования</p>
              </div>

              <div className="formRow justify-flex-start" style={{marginTop: "10px"}}>
                <div className="input-container big" style={{gap: "20px", display: "flex"}}>
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="educationLevel"
                      checked={selectedEducationLevel === 'Высшее'}
                      onChange={() => setSelectedEducationLevel('Высшее')}
                    />
                    <span className="radiomark"></span>
                    Высшее
                  </label>

                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="educationLevel"
                      checked={selectedEducationLevel === 'Неоконченное высшее'}
                      onChange={() => setSelectedEducationLevel('Неоконченное высшее')}
                    />
                    <span className="radiomark"></span>
                    Неоконченное высшее
                  </label>

                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="educationLevel"
                      checked={selectedEducationLevel === 'Среднее специальное'}
                      onChange={() => setSelectedEducationLevel('Среднее специальное')}
                    />
                    <span className="radiomark"></span>
                    Среднее специальное
                  </label>

                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="educationLevel"
                      checked={selectedEducationLevel === 'Среднее общее'}
                      onChange={() => setSelectedEducationLevel('Среднее общее')}
                    />
                    <span className="radiomark"></span>
                    Среднее общее
                  </label>
                </div>
              </div>

              <EducationDataTable index={1} formData={formData} setFormData={setFormData} />
              {additionalEducationTables.map(index => (
                <EducationDataTable key={index} index={index} formData={formData} setFormData={setFormData} />
              ))}

              <div className="formRow" style={{marginBottom: 0}}>
                <button className="bigFormButton" onClick={addEducationTable}>
                  <div className="textCont"></div>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Добавить высшее образование
                </button>
              </div>
              <div className="formRow justify-flex-start" style={{marginTop: '10px'}}>
                <p style={{marginTop: 0}}>Добавьте информацию о дополнительном высшем образовании</p>
              </div>

              {additionalCourseTables.map(index => (
                <CourseDataTable key={index} index={index} formData={formData} setFormData={setFormData} />
              ))}

              <div className="formRow" style={{marginBottom: 0}}>
                <button className="bigFormButton" onClick={addCourseTable}>
                  <div className="textCont"></div>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Добавить дополнительное образование
                </button>
              </div>
              <div className="formRow justify-flex-start" style={{marginTop: '10px'}}>
                <p style={{marginTop: 0}}>Добавьте информацию о пройденных курсах повышения квалификации</p>
              </div>

              <div className="formRow justify-flex-start">
                <p style={{marginTop: 0, marginLeft: "0.4375rem", color: "rgba(24, 24, 23, 1)"}}>2. Какой ваш профессиональный опыт?</p>
              </div>

              <div className="formRow justify-flex-start" style={{marginTop: "10px"}}>
                <div className="input-container big" style={{gap: "20px", display: "flex"}}>
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="professionalExperience"
                      checked={selectedProfessionalExperience === 'Нет опыта'}
                      onChange={() => setSelectedProfessionalExperience('Нет опыта')}
                    />
                    <span className="radiomark"></span>
                    Нет опыта
                  </label>

                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="professionalExperience"
                      checked={selectedProfessionalExperience === 'Опыт есть'}
                      onChange={() => setSelectedProfessionalExperience('Опыт есть')}
                    />
                    <span className="radiomark"></span>
                    Опыт есть
                  </label>
                </div>
              </div>

              {selectedProfessionalExperience === 'Опыт есть' && (
                <WorkExperienceTable formData={formData} setFormData={setFormData} />
              )}

              <div className="formRow" style={{marginTop: '50px'}}>
                <h3>Паспортные данные</h3>
              </div>

              <div className="formRow justify-space-between">
                <div className="input-container w-49">
                  <label htmlFor="passwordSeriaNumber" className="formLabel">Серия и номер</label>
                  <input
                    style={{width: '100%'}}
                    type="text"
                    name="passwordSeriaNumber"
                    className="formInput"
                    placeholder="1234 567890"
                    maxLength={11}
                    value={formData.passwordSeriaNumber || ''}
                    onChange={(e) => handlePassportChange('passwordSeriaNumber', e.target.value)}
                  />
                </div>

                <div className="input-container w-49">
                  <label htmlFor="dateOfIssue" className="formLabel">Дата выдачи</label>
                  <input
                    style={{width: '100%'}}
                    type="text"
                    name="dateOfIssue"
                    className="formInput"
                    placeholder="01.01.1990"
                    maxLength={10}
                    value={formData.dateOfIssue || ''}
                    onChange={(e) => handleDateChange('dateOfIssue', e.target.value)}
                  />
                </div>
              </div>

              <div className="formRow">
                <div className="input-container">
                  <label htmlFor="issuedBy" className="formLabel">Кем выдан</label>
                  <input
                    style={{width: '100%'}}
                    type="text"
                    name="issuedBy"
                    className="formInput"
                    placeholder="ОФУМС России"
                    value={formData.issuedBy || ''}
                    onChange={(e) => handleFormDataChange('issuedBy', e.target.value)}
                  />
                </div>
              </div>

              <div className="formRow">
                <div className="input-container">
                  <label htmlFor="adressOfPermanentReg" className="formLabel">Адрес постоянной регистрации</label>
                  <input
                    style={{width: '100%'}}
                    type="text"
                    name="adressOfPermanentReg"
                    className="formInput"
                    placeholder="Адрес постоянной регистрации"
                    value={formData.adressOfPermanentReg || ''}
                    onChange={(e) => handleFormDataChange('adressOfPermanentReg', e.target.value)}
                  />
                </div>
              </div>

              <div className="formRow">
                <div className="input-container">
                  <label htmlFor="adressOfTemporaryReg" className="formLabel">Адрес временной регистрации</label>
                  <input
                    style={{width: '100%'}}
                    type="text"
                    name="adressOfTemporaryReg"
                    className="formInput"
                    placeholder="Адрес временной регистрации"
                    value={formData.adressOfTemporaryReg || ''}
                    onChange={(e) => handleFormDataChange('adressOfTemporaryReg', e.target.value)}
                  />
                </div>
              </div>

              <div className="formRow">
                <div className="input-container">
                  <label htmlFor="adressOfFactialLiving" className="formLabel">Адрес фактического проживания</label>
                  <input
                    style={{width: '100%'}}
                    type="text"
                    name="adressOfFactialLiving"
                    className="formInput"
                    placeholder="Адрес фактического проживания"
                    value={formData.adressOfFactialLiving || ''}
                    onChange={(e) => handleFormDataChange('adressOfFactialLiving', e.target.value)}
                  />
                </div>
              </div>

              <div className="formRow flex-direction-column" style={{marginTop: '50px'}}>
                <h3>Состав семьи</h3>
                <h4>Заполните эти данные, чтобы мы могли предложить вам подходящие условия</h4>
              </div>

              <div className="formRow">
                <div className="input-container">
                  <label htmlFor="maritalStatus" className="formLabel">Семейное положение</label>
                  <CustomSelect
                    options={maritalStatusOptions}
                    placeholder="Выберите ваше семейное положение"
                    value={selectedMaritalStatus}
                    show={showMaritalOptions}
                    isLoading={isLoadingMaritalStatuses}
                    error={maritalStatusError}
                    onToggle={() => {
                      setShowMaritalOptions(!showMaritalOptions);
                      setShowVacancyOptions(false);
                      setShowCityOptions(false); 
                    }}
                    onSelect={(option) => {
                      setSelectedMaritalStatus(option);
                      setShowMaritalOptions(false);
                    }}
                  />
                </div>
              </div>

              <SpouseTable
                formData={formData}
                setFormData={setFormData}
                isVisible={selectedMaritalStatus === 'Состою в зарегистрированном браке'}
              />

              <div className="formRow flex-direction-column">
                <h3>1. Дети старше 18 лет</h3>
              </div>

              <div className="formRow justify-flex-start">
                <div className="input-container big">
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="haveChildren"
                      checked={haveChildren}
                      onChange={() => setHaveChildren(true)}
                    />
                    <span className="radiomark"></span>
                    У меня есть дети старше 18 лет
                  </label>

                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="haveChildren"
                      checked={!haveChildren}
                      onChange={() => setHaveChildren(false)}
                    />
                    <span className="radiomark"></span>
                    У меня нет детей старше 18 лет
                  </label>
                </div>
              </div>

              {haveChildren && (
                <div className="toggle-block" style={{width: '100%'}}>
                  <ChildrenTable index={1} formData={formData} setFormData={setFormData} />

                  {additionalChildrenTables.map(index => (
                    <ChildrenTable key={index} index={index} formData={formData} setFormData={setFormData} />
                  ))}

                  <div className="formRow" style={{marginBottom: 0}}>
                    <button className="bigFormButton" onClick={addChildrenTable}>
                      <div className="textCont"></div>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Добавить совершеннолетнего ребенка
                    </button>
                  </div>
                  <div className="formRow justify-flex-start" style={{marginTop: '10px'}}>
                    <p style={{marginTop: 0, textAlign: "left"}}>Добавьте всех ближайших совершеннолетних членов семьи: родителей, братьев/сестер</p>
                  </div>
                </div>
              )}

              <div className="formRow flex-direction-column" style={{marginTop: '50px'}}>
                <h3>Юридический статус</h3>
                <h4>Ответьте на следующие вопросы, которые помогут нам оценить ваше соответствие вакансии</h4>
              </div>

              <div className="formRow justify-flex-start">
                <p style={{marginTop: 0, color: '#181817', fontSize: '18px', textAlign: "left"}}>1. Являетесь ли военнообязанным(-ой)?</p>
              </div>
              <div className="formRow justify-flex-start" style={{marginTop: 0, fontSize: '18px'}}>
                <div className="input-container big">
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="militaryDuty"
                      checked={militaryDuty}
                      onChange={() => setMilitaryDuty(true)}
                    />
                    <span className="radiomark"></span>
                    Да, являюсь
                  </label>

                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="militaryDuty"
                      checked={!militaryDuty}
                      onChange={() => setMilitaryDuty(false)}
                    />
                    <span className="radiomark"></span>
                    Нет, не являюсь
                  </label>
                </div>
              </div>

              <div className="formRow justify-flex-start" style={{marginTop: '50px'}}>
                <p style={{marginTop: 0, color: '#181817', fontSize: '18px', textAlign: "left"}}>2. Привлекались ли вы когда-либо к уголовной ответственности?</p>
              </div>
              <div className="formRow justify-flex-start" style={{marginTop: 0, fontSize: '18px'}}>
                <div className="input-container big">
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="criminalResponsibility"
                      checked={criminalResponsibility}
                      onChange={() => setCriminalResponsibility(true)}
                    />
                    <span className="radiomark"></span>
                    Да, привлекался
                  </label>

                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="criminalResponsibility"
                      checked={!criminalResponsibility}
                      onChange={() => setCriminalResponsibility(false)}
                    />
                    <span className="radiomark"></span>
                    Нет, не привлекался
                  </label>
                </div>
              </div>

              {criminalResponsibility && (
                <div className="toggle-block" style={{width: '100%'}}>
                  <div className="formRow">
                    <div className="input-container">
                      <label htmlFor="whyPrisoner" className="formLabel">Причины привлечения</label>
                      <input
                        style={{width: '100%'}}
                        type="text"
                        name="whyPrisoner"
                        className="formInput"
                        placeholder="Опишите, за что привлекались к ответственности"
                        value={formData.whyPrisoner || ''}
                        onChange={(e) => handleFormDataChange('whyPrisoner', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="formRow justify-flex-start" style={{marginTop: '50px'}}>
                <p style={{marginTop: 0, color: '#181817', fontSize: '18px', textAlign: "left"}}>3. Являетесь ли вы (со-)учредителем юридического лица?</p>
              </div>
              <div className="formRow justify-flex-start" style={{marginTop: 0, fontSize: '18px'}}>
                <div className="input-container big">
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="legalEntity"
                      checked={legalEntity}
                      onChange={() => setLegalEntity(true)}
                    />
                    <span className="radiomark"></span>
                    Да, являюсь
                  </label>

                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="legalEntity"
                      checked={!legalEntity}
                      onChange={() => setLegalEntity(false)}
                    />
                    <span className="radiomark"></span>
                    Нет, не являюсь
                  </label>
                </div>
              </div>

              {legalEntity && (
                <div className="toggle-block" style={{width: '100%'}}>
                  <div className="formRow">
                    <div className="input-container">
                      <label htmlFor="LegalEntityActivity" className="formLabel">Укажите наименование и сферу деятельности</label>
                      <input
                        style={{width: '100%'}}
                        type="text"
                        name="LegalEntity"
                        className="formInput"
                        placeholder="Наименование и сфера деятельности юрлица"
                        value={formData.LegalEntity || ''}
                        onChange={(e) => handleFormDataChange('LegalEntity', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="checkboxRow" style={{maxWidth: 'none', alignItems: 'center'}}>
                <label className="custom-checkbox" htmlFor="personalData">
                  <input
                    type="checkbox"
                    name="personalData"
                    id="personalData"
                    checked={personalDataChecked}
                    onChange={(e) => setPersonalDataChecked(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                </label>
                <label htmlFor="personalData">Я даю согласие на обработку <span>своих персональных данных</span></label>
              </div>

              <div className="formRow" style={{marginTop: '0px'}}>
                <button
                  className={personalDataChecked ? "formBtn btn-active" : "formBtn btn-inactive"}
                  disabled={!personalDataChecked || isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить анкету'}
                </button>
              </div>

              {submitError && (
                <div className="formRow">
                  <div style={{ color: '#e74c3c', fontSize: '14px', marginTop: '10px' }}>
                    {submitError}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default CandidateForm;