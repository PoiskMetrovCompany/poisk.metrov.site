import { useAuthStore } from "@/stores/useAuthStore"
import { getAuthToken, removeAuthToken } from "@/utils/auth"

/**
 * Хук для удобного использования состояния авторизации
 */
export const useAuthState = () => {
  const { isAuthenticated, token, user, login, logout } = useAuthStore()

  const handleLogout = () => {
    removeAuthToken()
    logout()
  }

  const getToken = () => {
    return token || getAuthToken()
  }

  return {
    isAuthenticated,
    token: getToken(),
    user,
    login,
    logout: handleLogout,
  }
}
