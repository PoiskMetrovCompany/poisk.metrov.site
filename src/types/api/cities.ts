import { IMeta } from "./meta"

export interface ICity {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  key: string
  title: string
  slug: string
}

export interface CityResponse {
  identifier: string
  attributes: ICity[]
  meta: IMeta
}
