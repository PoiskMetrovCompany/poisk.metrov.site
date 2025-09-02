import { IMeta } from "./meta"

export interface ICbr {
  date: string
}

export interface CbrResponse {
  identifier: string
  attributes: ICbr
  meta: IMeta
}
