import {
  IFlatLayoutCardFullWithDifferences,
  IPropertyCardFullWithDifferences,
} from "@/types/PropertyCard"
import {
  ApartmentAttribute,
  ComparisonAttribute,
  ComparisonPriceByType,
} from "@/types/api/comparison"

// Вспомогательные функции форматирования
const formatPrice = (price: number | undefined): string => {
  if (!price) return "Не указано"
  return new Intl.NumberFormat("ru-RU").format(price)
}

const formatArea = (min: number | null, max: number | null): string => {
  if (min === null && max === null) return "Не указано"
  if (min === null) return `${max} м²`
  if (max === null) return `${min} м²`
  if (min === max) return `${min} м²`
  return `${min}-${max} м²`
}

const formatDate = (date: string | null): string => {
  if (!date) return "Не указано"
  try {
    return new Date(date).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
    })
  } catch {
    return date
  }
}

// Функция для получения цены по типу квартиры
const getPriceByType = (
  attribute: ComparisonAttribute,
  type: keyof ComparisonPriceByType
): string => {
  if (Array.isArray(attribute.price_by_type.value)) return "Не указано"
  const price =
    attribute.price_by_type.value[type as keyof ComparisonPriceByType]
  return formatPrice(price)
}

// Функция для получения минимальной цены для планировок
const getMinPrice = (attribute: ComparisonAttribute): string => {
  if (Array.isArray(attribute.price_by_type.value)) return "Не указано"
  const prices = attribute.price_by_type.value
  const minPrice = Math.min(
    prices.studio || Infinity,
    prices["1_rooms_min"] || Infinity,
    prices["2_rooms_min"] || Infinity,
    prices["3_rooms_min"] || Infinity,
    prices["4_rooms_min"] || Infinity
  )
  return minPrice === Infinity ? "Не указано" : formatPrice(minPrice)
}

// Функция для определения различий в ценах по типам комнат
// Возвращает объект с флагами различий для каждого типа комнат
// Если у любого объекта в сравнении есть различия в ценах для конкретного типа,
// то флаг будет true для всех карточек сравнения
const getPriceDifferencesByType = (
  attributes: ComparisonAttribute[]
): Record<keyof ComparisonPriceByType, boolean> => {
  // Проверяем, есть ли хотя бы один объект с валидными ценами
  const validAttributes = attributes.filter(
    (attr) => !Array.isArray(attr.price_by_type.value)
  )

  if (validAttributes.length === 0) {
    return {
      studio: false,
      "1_rooms_min": false,
      "2_rooms_min": false,
      "3_rooms_min": false,
      "4_rooms_min": false,
      "5_rooms_min": false,
      "6_rooms_min": false,
    }
  }

  const differences: Record<keyof ComparisonPriceByType, boolean> = {
    studio: false,
    "1_rooms_min": false,
    "2_rooms_min": false,
    "3_rooms_min": false,
    "4_rooms_min": false,
    "5_rooms_min": false,
    "6_rooms_min": false,
  }

  // Проверяем различия для каждого типа комнат
  Object.keys(differences).forEach((roomType) => {
    const key = roomType as keyof ComparisonPriceByType

    // Собираем все цены для данного типа комнат
    const prices = validAttributes
      .map((attr) => (attr.price_by_type.value as ComparisonPriceByType)[key])
      .filter((price) => price !== undefined && price !== null)

    // Если есть хотя бы 2 разные цены, то есть различия
    const uniquePrices = new Set(prices)
    differences[key] = uniquePrices.size > 1
  })

  return differences
}

/**
 * Преобразует данные из API в формат PropertyCard для сравнения
 */
export const adaptComparisonToPropertyCard = (
  attribute: ComparisonAttribute,
  allAttributes: ComparisonAttribute[]
): IPropertyCardFullWithDifferences => {
  const priceDifferences = getPriceDifferencesByType(allAttributes)

  return {
    id: parseInt(attribute.key.split("-")[0]),
    image: attribute.extra.images[0] || "/images/temporary/house.png",
    title: attribute.name.value,
    address: attribute.address.value,
    general: {
      builder: {
        name: attribute.builder.value,
        image: "/images/partners/colored/placeholder.webp",
      },
      constructionCompletionDate: formatDate(attribute.due_date.value),
      housingClass: attribute.housing_class.value,
      sections: attribute.sections.value,
      floors: attribute.floors_total.value?.toString() || "Не указано",
    },
    location: {
      district: attribute.district.value,
      metro: {
        name: attribute.metro_station.value,
        image: "/images/icons/car-dark.svg",
        time: `${attribute.metro_time.value} мин`,
      },
    },
    conveniences: {
      elevators: attribute.elevators.value,
      parking: attribute.parking.value,
      storerooms: attribute.storerooms.value,
      wheelchair: attribute.pram_room.value,
    },
    apartments: {
      total: attribute.total_apartments.value,
      forSale: attribute.on_sale_apartments.value,
      footage: formatArea(
        attribute.apartment_area_min.value,
        attribute.apartment_area_max.value
      ),
      ceilings: attribute.primary_ceiling_height.value || 0,
    },
    cost: {
      oneRoom: getPriceByType(attribute, "1_rooms_min"),
      twoRooms: getPriceByType(attribute, "2_rooms_min"),
      threeRooms: getPriceByType(attribute, "3_rooms_min"),
      fourRooms: getPriceByType(attribute, "4_rooms_min"),
      fiveRooms: getPriceByType(attribute, "5_rooms_min"),
      penthouses: getPriceByType(attribute, "6_rooms_min"),
    },
    differences: {
      general: {
        builder: attribute.builder.difference,
        constructionCompletionDate: attribute.due_date.difference,
        housingClass: attribute.housing_class.difference,
        sections: attribute.sections.difference,
        floors: attribute.floors_total.difference,
      },
      location: {
        district: attribute.district.difference,
        metro: attribute.metro_station.difference,
      },
      conveniences: {
        elevators: attribute.elevators.difference,
        parking: attribute.parking.difference,
        storerooms: attribute.storerooms.difference,
        wheelchair: attribute.pram_room.difference,
      },
      apartments: {
        total: attribute.total_apartments.difference,
        forSale: attribute.on_sale_apartments.difference,
        footage:
          attribute.apartment_area_min.difference ||
          attribute.apartment_area_max.difference,
        ceilings: attribute.primary_ceiling_height.difference,
      },
      cost: {
        oneRoom: priceDifferences["1_rooms_min"],
        twoRooms: priceDifferences["2_rooms_min"],
        threeRooms: priceDifferences["3_rooms_min"],
        fourRooms: priceDifferences["4_rooms_min"],
        fiveRooms: priceDifferences["5_rooms_min"],
        penthouses: priceDifferences["6_rooms_min"],
      },
    },
  }
}

/**
 * Преобразует данные из API в формат FlatLayoutCard для сравнения
 * @deprecated Используйте adaptApartmentComparisonToFlatLayoutCard для квартир
 */
export const adaptComparisonToFlatLayoutCard = (
  attribute: ComparisonAttribute,
  allAttributes: ComparisonAttribute[]
): IFlatLayoutCardFullWithDifferences => {
  const priceDifferences = getPriceDifferencesByType(allAttributes)

  // Временная заглушка для совместимости со старым типом
  return {
    id: parseInt(attribute.key.split("-")[0]),
    image: attribute.extra.images[0] || "/images/temporary/flat.png",
    title: attribute.name.value,
    address: attribute.address.value,
    apartmentInfo: {
      price: getMinPrice(attribute),
      area: "Не указано",
      livingSpace: "Не указано",
      kitchenSpace: "Не указано",
      roomCount: "Не указано",
      floor: "Не указано",
      floorsTotal: attribute.floors_total.value?.toString() || "Не указано",
      ceilingHeight: "Не указано",
      apartmentType: "Не указано",
      bathroomUnit: "Не указано",
      buildingSection: "Не указано",
      builtYear: "Не указано",
      readyQuarter: "Не указано",
    },
    complex: {
      name: attribute.name.value,
      // code: attribute.code,
      address: attribute.address.value,
    },
    extra: {
      apartmentNumber: "Не указано",
      images: {
        plan: attribute.extra.images[0] || "",
        floorPlan: "",
      },
      geo: {
        latitude: attribute.latitude.value,
        longitude: attribute.longitude.value,
      },
    },
    differences: {
      apartmentInfo: {
        price: false,
        area: false,
        livingSpace: false,
        kitchenSpace: false,
        roomCount: false,
        floor: false,
        floorsTotal: attribute.floors_total.difference,
        ceilingHeight: false,
        apartmentType: false,
        bathroomUnit: false,
        buildingSection: false,
        builtYear: false,
        readyQuarter: false,
      },
      complex: {
        name: attribute.name.difference,
        code: false,
        address: attribute.address.difference,
      },
    },
  }
}

/**
 * Преобразует данные квартир из API в формат FlatLayoutCard для сравнения
 */
export const adaptApartmentComparisonToFlatLayoutCard = (
  attribute: ApartmentAttribute,
  allAttributes: ApartmentAttribute[]
): IFlatLayoutCardFullWithDifferences => {
  return {
    id: parseInt(attribute.offer_id),
    image: attribute.extra.images.plan || "/images/temporary/flat.png",
    title: `${attribute.extra.complex.name} - ${attribute.extra.apartment_number}`,
    address: attribute.extra.complex.address,
    apartmentInfo: {
      price: formatPrice(attribute.price.value),
      area: `${attribute.area.value} м²`,
      livingSpace: `${attribute.living_space.value} м²`,
      kitchenSpace: `${attribute.kitchen_space.value} м²`,
      roomCount: `${attribute.room_count.value}`,
      floor: `${attribute.floor.value}`,
      floorsTotal: attribute.floors_total.value?.toString() || "Не указано",
      ceilingHeight: `${attribute.ceiling_height.value} м`,
      apartmentType: attribute.apartment_type.value,
      bathroomUnit: attribute.bathroom_unit.value,
      buildingSection: attribute.building_section.value || "Не указано",
      builtYear: attribute.built_year.value?.toString() || "Не указано",
      readyQuarter: attribute.ready_quarter.value || "Не указано",
    },
    complex: {
      name: attribute.extra.complex.name,
      // code: attribute.extra.complex.code,
      address: attribute.extra.complex.address,
    },
    extra: {
      apartmentNumber: attribute.extra.apartment_number,
      images: {
        plan: attribute.extra.images.plan,
        floorPlan: attribute.extra.images.floor_plan,
      },
      geo: {
        latitude: attribute.extra.geo.latitude,
        longitude: attribute.extra.geo.longitude,
      },
    },
    differences: {
      apartmentInfo: {
        price: attribute.price.difference,
        area: attribute.area.difference,
        livingSpace: attribute.living_space.difference,
        kitchenSpace: attribute.kitchen_space.difference,
        roomCount: attribute.room_count.difference,
        floor: attribute.floor.difference,
        floorsTotal: attribute.floors_total.difference,
        ceilingHeight: attribute.ceiling_height.difference,
        apartmentType: attribute.apartment_type.difference,
        bathroomUnit: attribute.bathroom_unit.difference,
        buildingSection: attribute.building_section.difference,
        builtYear: attribute.built_year.difference,
        readyQuarter: attribute.ready_quarter.difference,
      },
      complex: {
        name: false, // Нет различий, так как это статичная информация
        code: false,
        address: false,
      },
    },
  }
}
