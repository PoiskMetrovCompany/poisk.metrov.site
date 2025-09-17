import {
  AuthPhoneRequest,
  AuthPhoneResponse,
  AuthPincodeRequest,
  AuthPincodeResponse,
} from "@/types/Auth"
import { useApiMutation } from "@/utils/hooks/use-api"

// Хук для отправки номера телефона (первый шаг авторизации)
export function useAuthPhone() {
  return useApiMutation<AuthPhoneResponse, AuthPhoneRequest>(
    "/auth/authentication"
  )
}

// Хук для подтверждения авторизации с pincode (второй шаг авторизации)
export function useAuthPincode() {
  return useApiMutation<AuthPincodeResponse, AuthPincodeRequest>(
    "/auth/authorization"
  )
}
