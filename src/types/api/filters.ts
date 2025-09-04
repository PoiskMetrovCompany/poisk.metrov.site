// Типы для API фильтров на основе сваггера

export interface FiltersRequest {
  // Обязательные параметры
  entity_type: string // "Квартиры" | "Жилые комплексы"

  // Параметры квартир
  count_rooms?: number // Количество комнат
  pricing?: string // Цена или диапазон цен (формат: число или 'мин-макс')
  floors?: string // Этаж или диапазон этажей (формат: число или 'мин-макс')
  area_total?: string // Общая площадь или диапазон площадей (формат: число или 'мин-макс')
  living_area?: string // Жилая площадь или диапазон жилых площадей (формат: число или 'мин-макс')
  ceiling_height?: string // Высота потолков (числовое значение, например: "2.7")
  finishing?: string // Тип отделки
  parking?: string // Наличие парковки
  elevator?: string // Наличие лифта
  to_metro?: number // Максимальное расстояние до метро (в минутах)

  // Дополнительные параметры
  layout?: string // Планировка
  bathroom?: string // Санузел
  apartments?: string // Тип квартиры
  peculiarities?: string // Особенности
  montage_type?: string // Тип монтажа
  developer?: string // Застройщик
  due_date?: string // Срок сдачи (формат даты)
  floor_counts?: string // Количество этажей
  search?: string // Свободный текстовый поиск: район, метро, улица, застройщик, ЖК
}

export interface FiltersResponse {
  data: unknown[] // Результаты фильтрации
  total: number // Общее количество результатов
  page: number // Текущая страница
  per_page: number // Количество элементов на странице
  success: boolean
  message?: string
}

// Вспомогательные типы для преобразования формы в API запрос
export interface FiltersFormToApiMapper {
  // Преобразование данных формы в параметры API
  mapFormToApi(formData: unknown): FiltersRequest
}

// Константы для значений фильтров
export const ENTITY_TYPES = {
  APARTMENTS: "Квартиры",
  COMPLEXES: "Жилые комплексы",
} as const

export const FINISHING_TYPES = {
  ROUGH: "Чистовая",
  FINISHED: "С отделкой",
  WITHOUT_FINISHING: "Без отделки",
} as const

export const PARKING_TYPES = {
  AVAILABLE: "Есть",
  NOT_AVAILABLE: "Нет",
} as const

export const ELEVATOR_TYPES = {
  AVAILABLE: "Есть",
  NOT_AVAILABLE: "Нет",
} as const
