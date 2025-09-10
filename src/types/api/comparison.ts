export interface ComparisonAttributeValue<T> {
  value: T
  difference: boolean
}

export interface ComparisonLocation {
  code: string
  district: string
  address: string
}

export interface ComparisonExtra {
  location: ComparisonLocation
  images: string[]
}

// Типы для сравнения квартир (Apartments)
export interface ApartmentImages {
  plan: string
  floor_plan: string
}

export interface ApartmentComplex {
  name: string
  code: string
  address: string
}

export interface ApartmentGeo {
  latitude: number | null
  longitude: number | null
}

export interface ApartmentExtra {
  apartment_number: string
  images: ApartmentImages
  complex: ApartmentComplex
  geo: ApartmentGeo
}

export interface ApartmentAttribute {
  offer_id: string
  key: string
  price: ComparisonAttributeValue<number>
  area: ComparisonAttributeValue<number>
  living_space: ComparisonAttributeValue<number>
  kitchen_space: ComparisonAttributeValue<number>
  room_count: ComparisonAttributeValue<number>
  floor: ComparisonAttributeValue<number>
  floors_total: ComparisonAttributeValue<number | null>
  ceiling_height: ComparisonAttributeValue<number>
  apartment_type: ComparisonAttributeValue<string>
  bathroom_unit: ComparisonAttributeValue<string>
  building_section: ComparisonAttributeValue<string | null>
  built_year: ComparisonAttributeValue<number | null>
  ready_quarter: ComparisonAttributeValue<string | null>
  extra: ApartmentExtra
}

export interface ComparisonPriceByType {
  studio?: number
  "1_rooms_min"?: number
  "2_rooms_min"?: number
  "3_rooms_min"?: number
  "4_rooms_min"?: number
  "5_rooms_min"?: number
  "6_rooms_min"?: number
}

export interface ComparisonAttribute {
  code: string
  key: string
  name: ComparisonAttributeValue<string>
  builder: ComparisonAttributeValue<string>
  address: ComparisonAttributeValue<string>
  parking: ComparisonAttributeValue<string>
  elevator: ComparisonAttributeValue<string | null>
  floors: ComparisonAttributeValue<number | null>
  primary_ceiling_height: ComparisonAttributeValue<number | null>
  metro_station: ComparisonAttributeValue<string>
  metro_time: ComparisonAttributeValue<number>
  latitude: ComparisonAttributeValue<number>
  longitude: ComparisonAttributeValue<number>
  due_date: ComparisonAttributeValue<string | null>
  housing_class: ComparisonAttributeValue<string>
  sections: ComparisonAttributeValue<number>
  floors_total: ComparisonAttributeValue<number | null>
  district: ComparisonAttributeValue<string>
  metro: ComparisonAttributeValue<string>
  elevators: ComparisonAttributeValue<string | null>
  storerooms: ComparisonAttributeValue<string | null>
  pram_room: ComparisonAttributeValue<string | null>
  total_apartments: ComparisonAttributeValue<number>
  on_sale_apartments: ComparisonAttributeValue<number>
  apartment_area_min: ComparisonAttributeValue<number | null>
  apartment_area_max: ComparisonAttributeValue<number | null>
  price_by_type: ComparisonAttributeValue<ComparisonPriceByType | []>
  extra: ComparisonExtra
}

export interface ComparisonRequest {
  identifier: string
  method: string
  path: string
  attributes: {
    user_key: string
    type_comparison: string
  }
  timestamp: string
}

export interface ComparisonMeta {
  copyright: string
  request: ComparisonRequest
}

// Обновленный тип для поддержки обоих типов сравнения
export interface ComparisonResponse {
  identifier: string
  attributes: ComparisonAttribute[] | ApartmentAttribute[]
  meta: ComparisonMeta
}

// Специфичные типы для каждого вида сравнения
export interface ComplexesComparisonResponse {
  identifier: string
  attributes: ComparisonAttribute[]
  meta: ComparisonMeta
}

export interface ApartmentsComparisonResponse {
  identifier: string
  attributes: ApartmentAttribute[]
  meta: ComparisonMeta
}

/**
 * Вспомогательные функции для работы с данными сравнения
 */
export const isApartmentsComparison = (
  data: ComparisonResponse
): data is ApartmentsComparisonResponse => {
  return data.attributes.length > 0 && "offer_id" in data.attributes[0]
}

export const isComplexesComparison = (
  data: ComparisonResponse
): data is ComplexesComparisonResponse => {
  return data.attributes.length > 0 && "code" in data.attributes[0]
}

/**
 * Получение типизированных данных сравнения
 */
export const getTypedComparisonData = (data: ComparisonResponse) => {
  // Если массив пустой, определяем тип по URL или другим параметрам
  if (data.attributes.length === 0) {
    // Проверяем meta.request для определения типа
    const requestType = data.meta?.request?.attributes?.type_comparison

    if (requestType === "Apartments") {
      return {
        type: "apartments" as const,
        data: data as ApartmentsComparisonResponse,
      }
    }

    if (requestType === "ResidentialComplexes") {
      return {
        type: "complexes" as const,
        data: data as ComplexesComparisonResponse,
      }
    }

    return {
      type: "unknown" as const,
      data,
    }
  }

  if (isApartmentsComparison(data)) {
    return {
      type: "apartments" as const,
      data: data as ApartmentsComparisonResponse,
    }
  }

  if (isComplexesComparison(data)) {
    return {
      type: "complexes" as const,
      data: data as ComplexesComparisonResponse,
    }
  }

  return {
    type: "unknown" as const,
    data,
  }
}
