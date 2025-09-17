// Типы для API авторизации

export interface AuthPhoneRequest {
  phone: string
}

export interface AuthPhoneResponse {
  success: boolean
  message?: string
}

export interface AuthPincodeRequest {
  phone: string
  pincode: string
}

export interface AuthToken {
  type: string
  access_token: string
}

export interface AuthUser {
  [key: string]: unknown
}

export interface AuthPincodeResponse {
  attributes: {
    status: string
    user: AuthUser
    token: AuthToken
  }
}
