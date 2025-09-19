import { FiltersFormData } from "@/app/catalogue/components/filters/types"
import { FiltersRequest } from "@/types/api/filters"

/**
 * Преобразует данные формы фильтров в параметры API запроса
 */
export const mapFiltersFormToApi = (
  formData: FiltersFormData,
  selectedPropertyType?: string
): FiltersRequest => {
  const apiParams: FiltersRequest = {
    entity_type: selectedPropertyType === "Квартира" ? "Квартиры" : "ЖК",
  }

  // Количество комнат
  if (formData.rooms && formData.rooms.length > 0) {
    // Берем первое значение, так как API принимает одно число
    const roomValue = parseInt(formData.rooms[0])
    if (!isNaN(roomValue)) {
      apiParams.count_rooms = roomValue
    }
  }

  // Цена
  if (formData.priceMin || formData.priceMax) {
    if (formData.priceMin && formData.priceMax) {
      apiParams.pricing = `${formData.priceMin}-${formData.priceMax}`
    } else if (formData.priceMin) {
      // Если указана только минимальная цена
      apiParams.pricing = formData.priceMin?.toString() || "0"
    } else if (formData.priceMax) {
      // Если указана только максимальная цена, отправляем диапазон от 0
      apiParams.pricing = `0-${formData.priceMax}`
    }
  }

  // Этаж
  if (formData.floorMin || formData.floorMax) {
    if (formData.floorMin && formData.floorMax) {
      // API принимает диапазон в формате 'мин-макс'
      apiParams.floors = `${formData.floorMin}-${formData.floorMax}`
    } else if (formData.floorMin) {
      // Если указан только минимальный этаж
      apiParams.floors = formData.floorMin?.toString() || "0"
    } else if (formData.floorMax) {
      // Если указан только максимальный этаж, отправляем диапазон от 0
      apiParams.floors = `0-${formData.floorMax}`
    }
  }

  // Общая площадь
  if (formData.flatAreaMin || formData.flatAreaMax) {
    if (formData.flatAreaMin && formData.flatAreaMax) {
      apiParams.area_total = `${formData.flatAreaMin}-${formData.flatAreaMax}`
    } else if (formData.flatAreaMin) {
      // Если указана только минимальная площадь
      apiParams.area_total = formData.flatAreaMin?.toString() || "0"
    } else if (formData.flatAreaMax) {
      // Если указана только максимальная площадь, отправляем диапазон от 0
      apiParams.area_total = `0-${formData.flatAreaMax}`
    }
  }

  // Жилая площадь
  if (formData.livingAreaMin || formData.livingAreaMax) {
    if (formData.livingAreaMin && formData.livingAreaMax) {
      apiParams.living_area = `${formData.livingAreaMin}-${formData.livingAreaMax}`
    } else if (formData.livingAreaMin) {
      // Если указана только минимальная жилая площадь
      apiParams.living_area = formData.livingAreaMin?.toString() || "0"
    } else if (formData.livingAreaMax) {
      // Если указана только максимальная жилая площадь, отправляем диапазон от 0
      apiParams.living_area = `0-${formData.livingAreaMax}`
    }
  }

  // Высота потолков
  if (formData.ceilingHeight && formData.ceilingHeight.length > 0) {
    // Извлекаем числовое значение из строки (например, "От 2,7 м" -> "2.7")
    const heightValue = formData.ceilingHeight[0]
    const numericValue = heightValue.replace(/[^\d,.]/g, "").replace(",", ".")
    apiParams.ceiling_height = numericValue
  }

  // Тип отделки
  if (formData.finish && formData.finish.length > 0) {
    apiParams.finishing = formData.finish[0]
  }

  // Парковка
  if (formData.parking && formData.parking.length > 0) {
    apiParams.parking = formData.parking[0]
  }

  // Лифт
  if (formData.elevator && formData.elevator.length > 0) {
    apiParams.elevator = formData.elevator[0]
  }

  // Расстояние до метро
  if (formData.metroDistance && formData.metroDistance.length > 0) {
    const metroValue = parseInt(formData.metroDistance[0])
    if (!isNaN(metroValue)) {
      apiParams.to_metro = metroValue
    }
  }

  // Планировка
  if (formData.layout && formData.layout.length > 0) {
    apiParams.layout = formData.layout[0]
  }

  // Санузел
  if (formData.bathroom && formData.bathroom.length > 0) {
    apiParams.bathroom = formData.bathroom[0]
  }

  // Тип квартиры
  if (formData.apartments) {
    apiParams.apartments = formData.apartments
  }

  // Особенности
  if (formData.features && formData.features.length > 0) {
    apiParams.peculiarities = formData.features.join(", ")
  }

  // Застройщик
  if (formData.builder && formData.builder.length > 0) {
    apiParams.developer = formData.builder[0]
  }

  // Срок сдачи
  if (formData.completionDate && formData.completionDate.length > 0) {
    apiParams.due_date = formData.completionDate[0]
  }

  // Количество этажей в здании
  if (formData.floorsInBuildingMin || formData.floorsInBuildingMax) {
    if (formData.floorsInBuildingMin && formData.floorsInBuildingMax) {
      apiParams.floor_counts = `${formData.floorsInBuildingMin}-${formData.floorsInBuildingMax}`
    } else if (formData.floorsInBuildingMin) {
      // Если указано только минимальное количество этажей
      apiParams.floor_counts = formData.floorsInBuildingMin?.toString() || "0"
    } else if (formData.floorsInBuildingMax) {
      // Если указано только максимальное количество этажей, отправляем диапазон от 0
      apiParams.floor_counts = `0-${formData.floorsInBuildingMax}`
    }
  }

  // Поиск по тексту (район, метро, улица и т.д.)
  if (formData.district) {
    apiParams.search = formData.district
  }

  return apiParams
}

/**
 * Создает URL с параметрами фильтров для API запроса
 */
export const createFiltersUrl = (
  baseUrl: string,
  filters: FiltersRequest
): string => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + baseUrl)

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value.toString())
    }
  })

  return url.toString()
}
