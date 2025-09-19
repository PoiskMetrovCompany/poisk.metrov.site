import { ISpecification } from "@/types/PropertyCard"

export interface IResidentialComplexResponse {
  residential_complexes: IResidentialComplex[]
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
  metro_type: "on_foot" | "by_transport"
  infrastructure: string
  parking: string
  panorama: string
  corpuses: string
  meta: string
  elevator: string | null
  primary_material: string | null
  floors: number | null
  primary_ceiling_height: number | null
  on_main_page: number
  head_title: string
  h1: string
  apartments_count: number
  apartments: ISpecification[]
}

export interface IBestOffersResponse {
  data: IResidentialComplex[]
  success: boolean
  message?: string
}
