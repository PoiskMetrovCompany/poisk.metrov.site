import { IProperty } from "@/types/PropertyCard"
import { IResidentialComplex } from "@/types/api/complex"

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

  const specifications = [
    { type: "Студии", price: "от 4,5 млн ₽" },
    { type: "1-комн. кв", price: "от 6,2 млн ₽" },
    { type: "2-комн. кв", price: "от 8,1 млн ₽" },
    { type: "3-комн. кв", price: "от 10,5 млн ₽" },
  ]

  const description = [
    { type: "Застройщик", status: complex.builder },
    { type: "Недвижимость", status: "Жилая" },
    { type: "Класс жилья", status: "Комфорт +" },
    { type: "Адрес", status: complex.address },
  ]

  return {
    id: complex.id,
    title: complex.name,
    price: "от 4,5 млн ₽",
    subtitle: subtitle,
    badge: {
      developer: complex.builder,
      period: "2024-2026",
    },
    metro: complex.metro_station,
    driveTime: driveTime,
    metroType: complex.metro_type as "on_foot" | "by_transport",
    specifications: specifications,
    description: description,
    image: "/images/buildingCarousel/buidingExpandImg.webp",
  }
}

export function mapResidentialComplexesToProperties(
  complexes: IResidentialComplex[]
): IProperty[] {
  return complexes.map(mapResidentialComplexToProperty)
}
