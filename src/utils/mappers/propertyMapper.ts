import { IProperty } from "@/types/PropertyCard"
import { IResidentialComplex } from "@/types/api/complex"

import { extractImageFromMeta } from "../../utils/lib/metaUtils"

/**
 * Форматирует цену в читаемый вид
 * @param price - цена в рублях
 * @returns отформатированная строка цены
 */
function formatPrice(price: number): string {
  if (price >= 1000000) {
    const millions = (price / 1000000).toFixed(1)
    return `от ${millions} млн ₽`
  } else if (price >= 1000) {
    const thousands = (price / 1000).toFixed(0)
    return `от ${thousands} тыс ₽`
  }
  return `от ${price} ₽`
}

/**
 * Создает спецификации для комплекса на основе данных о ценах по типам квартир
 * @param minPricesByRoomType - объект с ценами по типам квартир
 * @returns массив спецификаций
 */
function createSpecifications(minPricesByRoomType?: {
  studio: number | null
  "1_rooms": number | null
  "2_rooms": number | null
  "3_rooms": number | null
  "4_plus_rooms": number | null
}) {
  const specifications = []

  if (minPricesByRoomType?.studio) {
    specifications.push({
      type: "Студии",
      price: formatPrice(minPricesByRoomType.studio),
    })
  }

  if (minPricesByRoomType?.["1_rooms"]) {
    specifications.push({
      type: "1-комн. кв",
      price: formatPrice(minPricesByRoomType["1_rooms"]),
    })
  }

  if (minPricesByRoomType?.["2_rooms"]) {
    specifications.push({
      type: "2-комн. кв",
      price: formatPrice(minPricesByRoomType["2_rooms"]),
    })
  }

  if (minPricesByRoomType?.["3_rooms"]) {
    specifications.push({
      type: "3-комн. кв",
      price: formatPrice(minPricesByRoomType["3_rooms"]),
    })
  }

  if (minPricesByRoomType?.["4_plus_rooms"]) {
    specifications.push({
      type: "4+ комн. кв",
      price: formatPrice(minPricesByRoomType["4_plus_rooms"]),
    })
  }

  if (specifications.length === 0) {
    return [
      { type: "Студии", price: "По запросу" },
      { type: "1-комн. кв", price: "По запросу" },
      { type: "2-комн. кв", price: "По запросу" },
      { type: "3-комн. кв", price: "По запросу" },
      { type: "4+ комн. кв", price: "По запросу" },
    ]
  }

  return specifications
}

export function mapResidentialComplexToProperty(
  complex: IResidentialComplex
): IProperty {
  const subtitle =
    complex.address ||
    (complex.description
      ? complex.description.substring(0, 100) +
        (complex.description.length > 100 ? "..." : "")
      : "Жилой комплекс")

  const driveTime =
    complex.metro_type === "on_foot"
      ? `${complex.metro_time} мин пешком`
      : `${complex.metro_time} мин на транспорте`

  const minPrice = complex.residential_min_price || 4202000
  const specifications = createSpecifications(complex.min_prices_by_room_type)

  const description = [
    { type: "Застройщик", status: complex.builder },
    { type: "Недвижимость", status: "Жилая" },
    { type: "Класс жилья", status: "Комфорт +" },
    { type: "Адрес", status: complex.address },
  ]

  return {
    id: complex.id,
    title: complex.name,
    price: formatPrice(minPrice),
    subtitle: subtitle,
    badge: {
      developer: complex.builder,
      period: complex.built_year ? `${complex.built_year}` : "2024-2026",
    },
    metro: complex.metro_station,
    driveTime: driveTime,
    metroType: complex.metro_type as "on_foot" | "by_transport",
    specifications: specifications,
    description: description,
    image: extractImageFromMeta(
      complex.meta,
      "/images/buildingCarousel/buidingExpandImg.webp"
    ),
    linkKey: complex.key,
  }
}

export function mapResidentialComplexesToProperties(
  complexes: IResidentialComplex[]
): IProperty[] {
  return complexes.map(mapResidentialComplexToProperty)
}
