
import { IMeta } from "./meta"

export interface IApartment {

  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null

  offer_id: number

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

  includes: IInclude[]
}

export interface IResidentialComplex {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  key: string
  location_key: string
  code: string
  old_code: string
  name: string
  builder: string
  description: string
  latitude: number
  longitude: number
  address: string
  metro_station: string
  metro_time: number
  metro_type: string
  infrastructure: string
  parking: string
  panorama: string
  corpuses: string
  meta: string
  elevator: string | null
  primary_material: string | null
  floors: string | null
  primary_ceiling_height: string | null
  on_main_page: number
  head_title: string
  h1: string
}

export interface IDoc {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  complex_id: number
  doc_url: string
  doc_name: string
  complex_key: string
}

export interface IBuilding {
}

export interface IInclude {
  type: "residentialcomplex" | "doc" | "building"
  attributes: IResidentialComplex[] | IDoc[] | IBuilding[]
}

export interface IResidentialComplexInclude {
  type: "residentialcomplex"
  attributes: IResidentialComplex[]
}

export interface IDocInclude {
  type: "doc"
  attributes: IDoc[]
}

export interface IBuildingInclude {
  type: "building"
  attributes: IBuilding[]
}

export type TIncludeTypes = IResidentialComplexInclude | IDocInclude | IBuildingInclude

export interface ApartmentResponse {
  identifier: string
  attributes: IApartment
  meta: IMeta
}

