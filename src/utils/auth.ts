// Утилиты для работы с авторизацией и cookies

const AUTH_TOKEN_KEY = "access_token"
const TOKEN_EXPIRY_DAYS = 180 // 6 месяцев

/**
 * Сохраняет токен авторизации в cookies
 * @param token - токен доступа
 */
export const setAuthToken = (token: string): void => {
  if (typeof window === "undefined") return

  const expirationDate = new Date()
  expirationDate.setTime(
    expirationDate.getTime() + TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000
  )

  document.cookie = `${AUTH_TOKEN_KEY}=${token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict; Secure`
}

/**
 * Получает токен авторизации из cookies
 * @returns токен доступа или null
 */
export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null

  const cookies = document.cookie.split(";")
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith(`${AUTH_TOKEN_KEY}=`)
  )

  if (tokenCookie) {
    return tokenCookie.split("=")[1]
  }

  return null
}

/**
 * Удаляет токен авторизации из cookies
 */
export const removeAuthToken = (): void => {
  if (typeof window === "undefined") return

  document.cookie = `${AUTH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

/**
 * Проверяет, есть ли токен авторизации
 * @returns true если токен существует
 */
export const hasAuthToken = (): boolean => {
  return getAuthToken() !== null
}

/**
 * Проверяет, истек ли токен (базовая проверка по наличию)
 * @returns true если токен валиден
 */
export const isTokenValid = (): boolean => {
  const token = getAuthToken()
  return token !== null && token.length > 0
}
