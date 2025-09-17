import { useApiMutation } from "@/utils/hooks/use-api"

// Типы для запроса переключения избранного
export interface SwitchLikeRequest {
  code: string
  type: "apartment" | "building"
  action: "add" | "remove"
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
      onSuccess: (data) => {
        console.log("✅ Избранное обновлено:", data)
      },
      onError: (error) => {
        console.error("❌ Ошибка при обновлении избранного:", error)
      },
      // Инвалидируем только запросы избранного, а не все запросы
      invalidateQueries: ["favourite_list"],
    }
  )
}
