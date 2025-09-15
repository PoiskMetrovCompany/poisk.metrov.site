import { IProperty } from "@/types/PropertyCard"
import { ApartmentItem } from "@/types/api/filters"

/**
 * Создает объект IProperty из данных квартиры
 * @param itemData - данные квартиры
 * @param index - индекс элемента
 * @returns объект IProperty для отображения карточки квартиры
 */
export const createApartmentProperty = (
  itemData: ApartmentItem,
  index: number
): IProperty => ({
  id: Number(itemData.id) || index,
  title: `Квартира ${itemData.apartment_number || index}`,
  subtitle: "Адрес не указан", // У квартир нет поля address
  // subtitle: itemData.complex_key || "Адрес не указан", // У квартир нет поля address
  price:
    typeof itemData.price === "number"
      ? `${itemData.price.toLocaleString()} ₽`
      : "Цена не указана",
  image: "/images/temporary/flat.png",
  badge: {
    developer: "Жилой комплекс",
    period: "2024",
  },
  metro: "",
  driveTime: "",
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
      type: "Этаж",
      status: itemData.floor ? `${itemData.floor}` : "Не указано",
    },
    {
      type: "Площадь",
      status: itemData.area ? `${itemData.area} м²` : "Не указано",
    },
    {
      type: "Комнат",
      status: itemData.room_count ? `${itemData.room_count}` : "Не указано",
    },
    {
      type: "Отделка",
      status: itemData.renovation || "Не указано",
    },
  ],
  linkKey: itemData.key,
  isApartment: true,
})
