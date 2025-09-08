// Типы для данных кандидатов

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

export interface ICandidate {
  id: number
  key: string
  vacancy: ICandidateVacancy
  marital_statuses: ICandidateMaritalStatus
  status: string
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
  family_partner: any[]
  adult_family_members: any[]
  adult_children: any[]
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
