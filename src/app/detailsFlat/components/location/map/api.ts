import { InfrastructureItem } from "./variables"

export const getInfrastructureByType = async (
  type: string,
  center: [number, number],
  radius: number = 2000
): Promise<InfrastructureItem[]> => {
  try {
    const searchQuery = getSearchQueryByType(type)
    const spn1 = radius / 111000
    const spn2 = radius / 111000

    // API поиска организаций Яндекс Карт
    const url = `https://search-maps.yandex.ru/v1/?text=${encodeURIComponent(
      searchQuery
    )}&type=biz&lang=ru_RU&apikey=${
      process.env.NEXT_PUBLIC_YANDEX_SEARCH_KEY
    }&ll=${center[0]},${center[1]}&spn=${spn1},${spn2}&results=25`

    const response = await fetch(url)
    const data = await response.json()

    if (!data.features || data.features.length === 0) {
      console.warn(`Нет данных для типа ${type}`)
      return getFallbackData(type, center)
    }

    const results = data.features.map(
      (
        feature: {
          properties: {
            name?: string
            description?: string
            CompanyMetaData?: { name?: string }
          }
          geometry: { coordinates: [number, number] }
        },
        index: number
      ) => ({
        id: `${type}_${index}`,
        type,
        name:
          feature.properties.CompanyMetaData?.name ||
          feature.properties.name ||
          feature.properties.description ||
          `Объект ${index + 1}`,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        icon: getIconByType(type),
      })
    )

    return results.length > 0 ? results : getFallbackData(type, center)
  } catch (error) {
    console.error(`Ошибка при получении инфраструктуры типа ${type}:`, error)
    return getFallbackData(type, center)
  }
}

const getFallbackData = (
  type: string,
  center: [number, number]
): InfrastructureItem[] => {
  const fallbackData: Record<string, InfrastructureItem[]> = {
    metro: [
      {
        id: "metro_1",
        type: "metro",
        name: "Студенческая",
        longitude: center[0] - 0.002,
        latitude: center[1] - 0.001,
        icon: getIconByType("metro"),
      },
      {
        id: "metro_2",
        type: "metro",
        name: "Площадь Ленина",
        longitude: center[0] + 0.003,
        latitude: center[1] + 0.002,
        icon: getIconByType("metro"),
      },
    ],
    schools: [
      {
        id: "schools_1",
        type: "schools",
        name: "Школа №1",
        longitude: center[0] + 0.001,
        latitude: center[1] + 0.001,
        icon: getIconByType("schools"),
      },
      {
        id: "schools_2",
        type: "schools",
        name: "Гимназия №2",
        longitude: center[0] - 0.001,
        latitude: center[1] + 0.002,
        icon: getIconByType("schools"),
      },
    ],
    parks: [
      {
        id: "parks_1",
        type: "parks",
        name: "Парк культуры",
        longitude: center[0] - 0.002,
        latitude: center[1] - 0.002,
        icon: getIconByType("parks"),
      },
    ],
    kindergartens: [
      {
        id: "kindergartens_1",
        type: "kindergartens",
        name: "Детский сад №5",
        longitude: center[0] + 0.002,
        latitude: center[1] - 0.001,
        icon: getIconByType("kindergartens"),
      },
    ],
    shops: [
      {
        id: "shops_1",
        type: "shops",
        name: "ТЦ Аура",
        longitude: center[0] + 0.001,
        latitude: center[1] - 0.002,
        icon: getIconByType("shops"),
      },
      {
        id: "shops_2",
        type: "shops",
        name: "ТЦ Галерея",
        longitude: center[0] - 0.002,
        latitude: center[1] + 0.001,
        icon: getIconByType("shops"),
      },
    ],
    sport: [
      {
        id: "sport_1",
        type: "sport",
        name: "Спорткомплекс",
        longitude: center[0] - 0.001,
        latitude: center[1] - 0.003,
        icon: getIconByType("sport"),
      },
    ],
    pharmacies: [
      {
        id: "pharmacies_1",
        type: "pharmacies",
        name: "Аптека №3",
        longitude: center[0] + 0.002,
        latitude: center[1] + 0.002,
        icon: getIconByType("pharmacies"),
      },
    ],
  }

  return fallbackData[type] || []
}

const getSearchQueryByType = (type: string): string => {
  const queries: Record<string, string> = {
    metro: "метро",
    schools: "школа",
    parks: "парк",
    kindergartens: "детский сад",
    shops: "торговый центр",
    sport: "спортзал",
    pharmacies: "аптека",
  }
  return queries[type] || type
}

const getIconByType = (type: string): string => {
  const icons: Record<string, string> = {
    metro: "/images/icons/gray-rounded/metro.svg",
    schools: "/images/icons/gray-rounded/book.svg",
    parks: "/images/icons/gray-rounded/tree.svg",
    kindergartens: "/images/icons/gray-rounded/kindergarten.svg",
    shops: "/images/icons/gray-rounded/shop.svg",
    sport: "/images/icons/gray-rounded/sport.svg",
    pharmacies: "/images/icons/gray-rounded/medicine.svg",
  }
  return icons[type] || "/images/icons/gray-rounded/shop.svg"
}

// Кэш для хранения полученных данных
const infrastructureCache: Record<string, InfrastructureItem[]> = {}

export const getCachedInfrastructure = async (
  type: string,
  center: [number, number]
): Promise<InfrastructureItem[]> => {
  const cacheKey = `${type}_${center[0]}_${center[1]}`

  if (infrastructureCache[cacheKey]) {
    return infrastructureCache[cacheKey]
  }

  const data = await getInfrastructureByType(type, center)
  infrastructureCache[cacheKey] = data
  return data
}
