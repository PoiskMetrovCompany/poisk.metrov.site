import { useApiMutation } from "@/utils/hooks/use-api"

// Типы для запроса переключения избранного
export interface SwitchLikeRequest {
  code: string
  type: "apartment" | "building"
  action: "add" | "remove"
  user_key: string
}

export interface SwitchLikeResponse {
  success: boolean
  message?: string
}

// Хук для переключения избранного
export function useSwitchLike() {
  return useApiMutation<SwitchLikeResponse, SwitchLikeRequest>(
    "/favorites/switch-like",
    {
      onError: (error) => {
        console.error("❌ Ошибка при обновлении избранного:", error)
      },
      // Инвалидируем запросы избранного и счетчика
      invalidateQueries: ["favourite_list", "fCount"],
    }
  )
}
