import { IProperty } from "@/types/PropertyCard"
import { ComplexItem } from "@/types/api/filters"
import { extractImageFromMeta } from "@/utils/lib/metaUtils"

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

  // Студии
  if (minPricesByRoomType?.studio) {
    specifications.push({
      type: "Студии",
      price: formatPrice(minPricesByRoomType.studio),
    })
  }

  // 1-комнатные
  if (minPricesByRoomType?.["1_rooms"]) {
    specifications.push({
      type: "1-комн. кв",
      price: formatPrice(minPricesByRoomType["1_rooms"]),
    })
  }

  // 2-комнатные
  if (minPricesByRoomType?.["2_rooms"]) {
    specifications.push({
      type: "2-комн. кв",
      price: formatPrice(minPricesByRoomType["2_rooms"]),
    })
  }

  // 3-комнатные
  if (minPricesByRoomType?.["3_rooms"]) {
    specifications.push({
      type: "3-комн. кв",
      price: formatPrice(minPricesByRoomType["3_rooms"]),
    })
  }

  // 4+ комнатные
  if (minPricesByRoomType?.["4_plus_rooms"]) {
    specifications.push({
      type: "4+ комн. кв",
      price: formatPrice(minPricesByRoomType["4_plus_rooms"]),
    })
  }

  // Если нет данных о ценах, возвращаем значения по умолчанию
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

/**
 * Создает объект IProperty из данных жилого комплекса
 * @param itemData - данные жилого комплекса
 * @param index - индекс элемента
 * @returns объект IProperty для отображения карточки комплекса
 */
export const createComplexProperty = (
  itemData: ComplexItem,
  index: number
): IProperty => {
  // Используем реальную минимальную цену из API или значение по умолчанию
  const minPrice = itemData.residential_min_price || 5600000
  const specifications = createSpecifications(itemData.min_prices_by_room_type)

  return {
    id: Number(itemData.id) || index,
    title: itemData.name || "Жилой комплекс",
    subtitle: itemData.code || "",
    price: formatPrice(minPrice),
    image: extractImageFromMeta(itemData.meta, "/images/temporary/house.png"),
    badge: {
      developer: "Застройщик",
      period: itemData.built_year ? `${itemData.built_year}` : "2024",
    },
    metro: itemData.metro_station || "",
    driveTime: itemData.metro_time ? `${itemData.metro_time} мин` : "",
    metroType: "on_foot",
    specifications: specifications,
    description: [
      {
        type: "Высота потолков",
        status: itemData.primary_ceiling_height
          ? `${itemData.primary_ceiling_height} м`
          : "Не указано",
      },
    ],
    linkKey: itemData.key,
  }
}
