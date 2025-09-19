import { IProperty } from "@/types/PropertyCard"
import { IApartment } from "@/types/api/complex"
import {
  IFavoriteResComplexes,
  IFavouriteApartments,
} from "@/types/api/favouritesList"

export const mapFavoriteComplexToProperty = (
  complex: IFavoriteResComplexes
): IProperty => {
  return {
    id: complex.id,
    title: complex.name,
    price: "от 6.100 млн ₽",
    subtitle: complex.address,
    badge: {
      developer: complex.builder,
      period: "2024-2025",
    },
    metro: complex.metro_station,
    driveTime: `${complex.metro_time} мин`,
    metroType: complex.metro_type as "on_foot" | "by_transport",
    specifications: [
      {
        type: "Парковка",
        price: complex.parking,
      },
      {
        type: "Этажность",
        price: complex.floors ? `${complex.floors} этажей` : "Не указано",
      },
    ],
    description: [
      {
        type: "Тип",
        status: "Жилой комплекс",
      },
      {
        type: "Материал",
        status: complex.primary_material || "Не указано",
      },
    ],
    image: "/images/temporary/house.png",
    linkKey: complex.key,
    isApartment: false, // Это жилой комплекс, не квартира
  }
}

export const mapFavoriteApartmentToFlatLayout = (
  apartment: IFavouriteApartments
) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽"
  }

  const getRoomType = (roomCount: number | null) => {
    if (!roomCount) return "Студия"
    if (roomCount === 1) return "1 комната"
    if (roomCount === 2) return "2 комнаты"
    if (roomCount === 3) return "3 комнаты"
    return `${roomCount} комнат`
  }

  return {
    id: apartment.id,
    title: `${getRoomType(apartment.room_count)}, ${apartment.area} м²`,
    price: formatPrice(apartment.price),
    complex: apartment.apartment_type,
    description: [
      `Этаж ${apartment.floor}`,
      apartment.renovation || "Отделка не указана",
      apartment.balcony || "Балкон не указан",
      apartment.bathroom_unit || "Санузел не указан",
    ].filter(Boolean),
    imageUrl:
      apartment.plan_URL ||
      apartment.floor_plan_url ||
      "/images/temporary/room.png",
    linkUrl: `/detailsFlat/${apartment.key}`,
    apartment: apartment as IApartment,
  }
}
