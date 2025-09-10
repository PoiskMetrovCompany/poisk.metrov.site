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

// Тип для квартиры в ответе API
export interface ApartmentItem {
  id: number
  key: string
  complex_id: number | null
  complex_key: string
  apartment_number: string
  floor: number
  room_count: number
  price: number
  area: number
  living_space: number
  ceiling_height: number
  renovation: string
  balcony: string
  bathroom_unit: string
  created_at: string
  updated_at: string
  residential_complex: unknown | null
}

// Тип для жилого комплекса в ответе API
export interface ComplexItem {
  id: number
  key: string
  name: string
  code: string
  address: string
  latitude: number
  longitude: number
  parking: string
  elevator: string | null
  floors: number | null
  primary_ceiling_height: number | null
  metro_station: string
  metro_time: number
  created_at: string
  updated_at: string
}

// Union тип для элементов данных в зависимости от типа сущности
export type FiltersDataItem = ApartmentItem | ComplexItem

// Базовый интерфейс ответа API
export interface BaseFiltersResponse {
  total: number // Общее количество результатов
  page: number // Текущая страница
  per_page: number // Количество элементов на странице
  success: boolean
  message?: string
}

// Типизированный ответ для квартир
export interface ApartmentFiltersResponse extends BaseFiltersResponse {
  data: ApartmentItem[]
}

// Типизированный ответ для жилых комплексов
export interface ComplexFiltersResponse extends BaseFiltersResponse {
  data: ComplexItem[]
}

// Union тип для ответа API в зависимости от типа сущности
export type FiltersResponse = ApartmentFiltersResponse | ComplexFiltersResponse

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

// Type guards для определения типа данных
export const isApartmentItem = (
  item: FiltersDataItem
): item is ApartmentItem => {
  return "apartment_number" in item && "room_count" in item
}

export const isComplexItem = (item: FiltersDataItem): item is ComplexItem => {
  return "name" in item && "code" in item
}

export const isApartmentResponse = (
  response: FiltersResponse
): response is ApartmentFiltersResponse => {
  return response.data.length > 0 && isApartmentItem(response.data[0])
}

export const isComplexResponse = (
  response: FiltersResponse
): response is ComplexFiltersResponse => {
  return response.data.length > 0 && isComplexItem(response.data[0])
}
