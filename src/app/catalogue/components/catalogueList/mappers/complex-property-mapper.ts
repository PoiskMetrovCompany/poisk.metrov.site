import { IProperty } from "@/types/PropertyCard"
import { ComplexItem } from "@/types/api/filters"

/**
 * Создает объект IProperty из данных жилого комплекса
 * @param itemData - данные жилого комплекса
 * @param index - индекс элемента
 * @returns объект IProperty для отображения карточки комплекса
 */
export const createComplexProperty = (
  itemData: ComplexItem,
  index: number
): IProperty => ({
  id: Number(itemData.id) || index,
  title: itemData.name || "Жилой комплекс",
  subtitle: itemData.code || "",
  price: "Цена не указана", // У комплексов нет поля price
  image: "/images/temporary/house.png",
  badge: {
    developer: "Застройщик",
    period: "2024",
  },
  metro: itemData.metro_station || "",
  driveTime: itemData.metro_time ? `${itemData.metro_time} мин` : "",
  metroType: "on_foot",
  specifications: [
    { type: "Студии", price: "от 5,6 млн ₽" },
    { type: "1-комн. кв", price: "от 7,1 млн ₽" },
    { type: "2-комн. кв", price: "от 8,5 млн ₽" },
    { type: "3-комн. кв", price: "от 10,8 млн ₽" },
    { type: "4+ комн. кв", price: "от 14,9 млн ₽" },
  ],
  description: [
    {
      type: "Высота потолков",
      status: itemData.primary_ceiling_height
        ? `${itemData.primary_ceiling_height} м`
        : "Не указано",
    },
  ],
  linkKey: itemData.key,
})
