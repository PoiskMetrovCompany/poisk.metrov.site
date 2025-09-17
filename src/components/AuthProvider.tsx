"use client"

import { useEffect } from "react"

import { useAuthStore } from "@/stores/useAuthStore"
import { CurrentUserResponse, UserAttributes } from "@/types/User"
import { getAuthToken } from "@/utils/auth"
import { useApiQuery } from "@/utils/hooks/use-api"

interface AuthProviderProps {
  children: React.ReactNode
}

/**
 * Провайдер авторизации - инициализирует состояние авторизации при загрузке приложения
 * Использует только cookies для хранения токена (безопасно)
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { login, logout, isAuthenticated } = useAuthStore()
  const token = getAuthToken()

  // Запрос для получения данных пользователя при наличии токена
  const { data: currentUserData, error: currentUserError } =
    useApiQuery<CurrentUserResponse>(
      ["currentUser"],
      "api/proxy/users/get-current",
      {
        enabled: !!token && !isAuthenticated, // Запрос только если есть токен но нет данных пользователя
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      }
    )

  useEffect(() => {
    // Проверяем наличие токена в cookies при загрузке приложения
    if (token) {
      if (currentUserData?.attributes) {
        login(token, currentUserData.attributes)
      } else if (!isAuthenticated) {
        login(token, {} as UserAttributes) // Временно используем пустой объект, пока не получим данные пользователя
      }
    } else {
      logout()
    }
  }, [token, currentUserData, login, logout, isAuthenticated])

  // // Логируем данные пользователя для проверки
  // useEffect(() => {
  //   if (currentUserData) {
  //     console.log("👤 Данные текущего пользователя:", currentUserData)
  //   }
  //   if (currentUserError) {
  //     console.error(
  //       "❌ Ошибка при получении данных пользователя:",
  //       currentUserError
  //     )
  //   }
  // }, [currentUserData, currentUserError])

  return <>{children}</>
}
