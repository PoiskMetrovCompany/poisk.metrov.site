import { IProperty } from "@/types/PropertyCard"
import { IResidentialComplex } from "@/types/api/ResidentialComplex"

import { extractImageFromMeta } from "../../utils/lib/metaUtils"
import { pluralizeMinutes } from "../../utils/lib/pluralize"

export const mapResidentialComplexToProperty = (
  complex: IResidentialComplex
): IProperty => {
  // Получаем цену из первого элемента apartments или используем fallback
  const firstApartment = complex.apartments?.[0]
  const price = firstApartment?.price || "от 4.340 млн ₽"

  return {
    id: complex.id,
    title: complex.name,

    price,
    subtitle: complex.address,
    badge: {
      developer: complex.builder,
      period: "I – IV 2026", // Можно получать из других полей если есть
    },
    metro: complex.metro_station,
    driveTime: pluralizeMinutes(complex.metro_time),
    metroType: complex.metro_type,
    specifications:
      complex.apartments && complex.apartments.length > 0
        ? complex.apartments
        : [
            { type: "Студии", price: "от 4,3 млн ₽" },
            { type: "1-комн. кв", price: "от 5,8 млн ₽" },
            { type: "2-комн. кв", price: "от 7,2 млн ₽" },
            { type: "3-комн. кв", price: "от 9,1 млн ₽" },
            { type: "4+ комн. кв", price: "от 12,5 млн ₽" },
          ],
    description: [
      { type: "Срок сдачи", status: "Сдан — IV 2028" },
      { type: "Недвижимость", status: "Жилая" },
      { type: "Класс жилья", status: "Комфорт +" },
      {
        type: "Квартир",
        status: complex.apartments_count?.toString() || "Не указано",
      },
    ],
    image: extractImageFromMeta(
      complex.meta,
      "/images/buildingCarousel/buidingExpandImg.webp"
    ),
    linkKey: complex.key,
  }
}
