interface ISpecification {
  type: string
  price: string
}

interface IBadge {
  developer: string
  period: string
}

interface IDescription {
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
  specifications: ISpecification[]
  description: IDescription[]
  image: string
}

interface IPropertyCardGeneral {
  builder: string
  image: string
  constructionCompletionDate: string
  typeOfProperty: string
  houseType: string
  housingClass: string
  sections: number
  floors: string
}

interface IPropertyCardLocation {
  district: string
  metro: string
}

interface IPropertyCardConveniences {
  elevators: string
  parking: string
  storerooms: string
  wheelchair: string
  territory: string
}

interface IPropertyCardApartments {
  total: number
  forSale: number
  footage: string
  finishing: string
  ceilings: number
}

interface IPropertyCardCost {
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
