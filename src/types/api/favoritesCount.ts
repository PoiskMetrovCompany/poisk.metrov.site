import { IMeta } from "./meta"

export interface IFavoritesCountResponse {
  identifier: string
  attributes: IFCount
  meta: IMeta
}

export interface IFCount {
  residential_complexes: unknown[]
  apartments: unknown[]
}
