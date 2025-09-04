import { IMeta } from "./meta"

export interface IApartment {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  offer_id: string
  key: string
  complex_id: number
  apartment_type: string
  renovation: string
  balcony: string
  bathroom_unit: string
  floor: number
  apartment_number: string
  plan_URL: string
  ceiling_height: number | null
  room_count: number
  price: number
  area: number
  living_space: number
  kitchen_space: number
  floor_plan_url: string | null
  windows_directions: string | null
  meta: string
  feed_source: string
  head_title: string
  h1: string
  complex_key: string
  building_key: string | null
}

export interface IInclude {
  type: string
  attributes: IApartment[] | Record<string, IApartment[]>
}

export interface IResidentialComplex {
  id: number
  location_key: string
  key: string
  code: string
  old_code: string | null
  name: string
  builder: string
  description: string
  address: string
  latitude: number
  longitude: number
  metro_station: string
  metro_time: number
  metro_type: string
  meta: string
  head_title: string
  h1: string
  includes: IInclude[]
}

export interface ResidentialComplexDataResponse {
  identifier: string
  attributes: IResidentialComplex
  meta: IMeta
}
