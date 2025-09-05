export type Place = {
  id: string
  label: string
  longitude: number
  latitude: number
}

export type InfrastructureItem = {
  id: string
  type: string
  name: string
  longitude: number
  latitude: number
  icon: string
}

export enum PointType {
  IN_SALE = "В продаже",
  ANNOUNCEMENTS = "Анонсы",
  FAVOURITES = "Избранное",
}

export type IPoint = {
  id: number
  type: PointType
  coords: [number, number]
  price?: string
  priority?: 1 | 0 | null
}
