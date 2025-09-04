import { IMeta } from "./meta"

export interface FListResponse {
  identifier: string
  attributes: IFList
  meta: IMeta
}

export interface IFavoriteResComplexes {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  offer_id: string
  key: string
  location_key: string
  code: string
  old_code: string | null
  name: string
  builder: string
  description: string
  latitude: number
  longitude: number
  address: string
  metro_station: string
  metro_time: number
  metro_type: string
  infrastricture: string
  parking: string
  panirama: string
  courpuses: string
  meta: string
  elevator: string | null
  primary_material: string | null
  floors: number | null
  primary_ceiling_height: number | null
  on_main_page: number
  head_title: string
  h1: string
}

export interface IFavouriteApartments{
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
  room_count: number | null
  price: number
  area: number
  living_space: number
  litchen_space: number
  floor_plan_url: string | null
  windows_directions: string | null
  meta: string
  feed_source: string
  head_title: string
  h1: string
  complex_key: string
  building_key: string | null
}

export interface IFList {
  residential_complexes: IFavoriteResComplexes[]
  apartments: IFavouriteApartments[]
}
