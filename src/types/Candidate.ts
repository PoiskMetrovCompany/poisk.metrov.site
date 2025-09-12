export enum CandidateStatus {
  NEW_APPLICATION = "Новая анкета",
  IN_REVIEW = "На рассмотрении",
  APPROVED = "Одобрен",
  REJECTED = "Отклонен",
  HIRED = "Принят на работу",
}

export enum VacancyType {
  ACCOUNTANT = "Бухгалтер",
  TEST_ROLE = "Тестовая роль",
  MANAGER = "Менеджер",
  DEVELOPER = "Разработчик",
}

export interface IVacancyItem {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  key: string
  title: string
}

export interface IVacanciesResponse {
  response: boolean
  attributes: IVacancyItem[]
}

export interface IMaritalStatusItem {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  key: string
  title: string
}

export interface IMaritalStatusesResponse {
  response: boolean
  attributes: IMaritalStatusItem[]
}

export interface ICandidateFormData extends Record<string, any> {
  surnameChanged: boolean
  haveChildren: boolean
  haveFamilyMembers: boolean
  criminalResponsibility: boolean
  legalEntity: boolean
  militaryDuty: boolean
  personalDataChecked: boolean
  selectedVacancy: string
  selectedMaritalStatus: string
  selectedEducationLevel: string
  firstName: string
  lastName: string
  middleName: string
  reasonForChangingSurnames: string | null
  cityWork: string
  birthDate: string | null
  countryBirth: string
  cityBirth: string
  levelEducational: string
  courses: string
  educationalInstitution: string
  organizationName: string
  organizationPhone: string
  fieldOfActivity: string
  organizationAddress: string
  organizationJobTitle: string
  organizationPrice: string
  dateOfHiring: string | null
  dateOfDismissal: string | null
  reasonForDismissal: string
  recommendationContact: string
  mobilePhoneCandidate: string
  homePhoneCandidate: string
  mailCandidate: string
  inn: string
  passportSeries: string
  passportNumber: string
  passportIssued: string
  passportIssueDate: string | null
  permanentRegistrationAddress: string
  temporaryRegistrationAddress: string
  actualResidenceAddress: string
  familyPartner: string
  adultFamilyMembers: string
  adultChildren: string
  serviceman: boolean
  lawBreaker: string
  legalEntityValue: string
  isDataProcessing: boolean
  comment: string
}

export interface ICandidateFormResponse {
  request: boolean
  attributes?: {
    id?: number
    key?: string
    message?: string
  }
  error?: string
}

export interface IRopItem {
  title: string
  key: string
}

export interface IROPAccount {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  key: string
  role: string
  phone: string | null
  email: string | null
  secret: string
  last_name: string | null
  first_name: string | null
  middle_name: string | null
}

export interface IROPAccountsResponse {
  request: boolean
  attributes: IROPAccount[]
}

export interface ICandidateTableData {
  id: number
  key: string
  last_name: string
  first_name: string
  middle_name: string
  created_at: string
  status: string
  comment: string
  work_team: string | null
  vacancy: {
    attributes: {
      title: string
    }
  }
}

export interface ICandidateTableResponse {
  response: boolean
  attributes: {
    data: ICandidateTableData[]
    current_page: number
    last_page: number
    total: number
    per_page: number
    from: number
    to: number
  }
}

export interface ICandidateTableItem {
  id: string
  name: string
  rop: string
  datetime: string
  vacancy: string
  status: string
  statusID: string
  hasVacancyComment: string
  vacancyKey: string
  fullData: ICandidateTableData
}

export interface IApiError {
  response?: {
    status: number
    data?: {
      error?: string
      message?: string
    }
  }
  request?: unknown
  message: string
}

export interface IMaskInstance {
  destroy: () => void
  unmaskedValue: string
}

export interface IUserAttributes {
  phone?: string
  [key: string]: unknown
}

export interface IAuthResponse {
  request: boolean
  attributes: {
    access_token?: string
    user: {
      role: string
    }
    [key: string]: unknown
  }
}

export interface ICandidateVacancy {
  key: string
  attributes: {
    id: number
    created_at: string
    updated_at: string
    deleted_at: string | null
    key: string
    title: string
  }
}

export interface ICandidateMaritalStatus {
  key: string
  attributes: {
    id: number
    created_at: string
    updated_at: string
    deleted_at: string | null
    key: string
    title: string
  }
}

export interface IFamilyPartner {
  id: number
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
  relationship: string
}

export interface IAdultFamilyMember {
  id: number
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
  relationship: string
}

export interface IAdultChild {
  id: number
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
}

export interface ICandidate {
  id: number
  key: string
  vacancy: ICandidateVacancy
  marital_statuses: ICandidateMaritalStatus
  work_team: string | null
  status: CandidateStatus
  first_name: string
  last_name: string
  middle_name: string
  reason_for_changing_surnames: string | null
  city_work: string
  birth_date: string
  country_birth: string
  city_birth: string
  level_educational: string
  courses: string
  educational_institution: string
  organization_name: string | null
  organization_phone: string | null
  field_of_activity: string | null
  organization_address: string | null
  organization_job_title: string | null
  organization_price: string | null
  date_of_hiring: string | null
  date_of_dismissal: string | null
  reason_for_dismissal: string | null
  recommendation_contact: string | null
  mobile_phone_candidate: string
  home_phone_candidate: string
  mail_candidate: string
  inn: string
  passport_series: string
  passport_number: string
  passport_issued: string
  permanent_registration_address: string
  temporary_registration_address: string
  actual_residence_address: string
  family_partner: IFamilyPartner[]
  adult_family_members: IAdultFamilyMember[]
  adult_children: IAdultChild[]
  serviceman: number
  law_breaker: string
  legal_entity: string
  is_data_processing: number
  comment: string
  created_at: string
}

export interface ICandidatesResponse {
  response: boolean
  attributes: {
    current_page: number
    data: ICandidate[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
    meta: {
      current_page: number
      from: number
      last_page: number
      links: {
        url: string | null
        label: string
        active: boolean
      }[]
      path: string
      per_page: number
      to: number
      total: number
    }
  }
}
