export interface ISpecification {
  type: string
  price: string
}

export interface IBadge {
  developer: string
  period: string
}

export interface IDescription {
  type: string
  status: string
}

export interface IProperty {
  id: number
  title: string
  price: string
  subtitle: string
  badge: IBadge
  metro: string
  driveTime: string
  metroType: "on_foot" | "by_transport"
  specifications: ISpecification[]
  description: IDescription[]
  image: string
  linkKey?: string
}

export interface IPropertyCardGeneral {
  builder: {
    name: string
    image: string
  }
  constructionCompletionDate: string
  typeOfProperty: string
  houseType: string
  housingClass: string
  sections: number
  floors: string
}

export interface IPropertyCardLocation {
  district: string
  metro: {
    name: string
    image: string
    time: string
  }
}

export interface IPropertyCardConveniences {
  elevators: string
  parking: string
  storerooms: string
  wheelchair: string
  territory: string
}

export interface IPropertyCardApartments {
  total: number
  forSale: number
  footage: string
  finishing: string
  ceilings: number
}

export interface IPropertyCardCost {
  oneRoom: string
  twoRooms: string
  threeRooms: string
  fourRooms: string
  fiveRooms: string
  penthouses: string
}

export interface IPropertyCardFull {
  id: number
  image: string
  title: string
  address: string
  general: IPropertyCardGeneral
  location: IPropertyCardLocation
  conveniences: IPropertyCardConveniences
  apartments: IPropertyCardApartments
  cost: IPropertyCardCost
}

export interface IFlatLayoutCardFull {
  id: number
  image: string
  title: string
  address: string
  general: IPropertyCardGeneral
  location: IPropertyCardLocation
  conveniences: IPropertyCardConveniences
  price: string
  pricePerMonth: string
}
