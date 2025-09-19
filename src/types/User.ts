// Типы для API пользователя

export interface UserAttributes {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  key: string
  crm_id: number
  api_token: string
  chat_token: string
  name: string
  email: string | null
  role: string
  phone: string
  surname: string
  patronymic: string | null
  crm_city: string
  is_test: number
}

export interface UserRequest {
  identifier: string
  method: string
  path: string
  attributes: unknown[]
  timestamp: string
}

export interface UserMeta {
  copyright: string
  request: UserRequest
}

export interface CurrentUserResponse {
  identifier: string
  attributes: UserAttributes
  meta: UserMeta
}
