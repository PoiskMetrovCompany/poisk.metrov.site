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
  isApartment?: boolean
}

export interface IPropertyCardGeneral {
  builder: {
    name: string | null
    image: string | null
  }
  constructionCompletionDate: string | null
  housingClass: string | null
  sections: number | null
  floors: string | null
}

export interface IPropertyCardLocation {
  district: string | null
  metro: {
    name: string | null
    image: string | null
    time: string | null
  }
}

export interface IPropertyCardConveniences {
  elevators: string | null
  parking: string | null
  storerooms: string | null
  wheelchair: string | null
}

export interface IPropertyCardApartments {
  total: number | null
  forSale: number | null
  footage: string | null
  ceilings: number | null
}

export interface IPropertyCardCost {
  oneRoom: string | null
  twoRooms: string | null
  threeRooms: string | null
  fourRooms: string | null
  fiveRooms: string | null
  penthouses: string | null
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

export interface IPropertyCardFullWithDifferences {
  id: number
  image: string
  title: string
  address: string
  general: IPropertyCardGeneral
  location: IPropertyCardLocation
  conveniences: IPropertyCardConveniences
  apartments: IPropertyCardApartments
  cost: IPropertyCardCost
  differences: {
    general: Record<string, boolean>
    location: Record<string, boolean>
    conveniences: Record<string, boolean>
    apartments: Record<string, boolean>
    cost: Record<string, boolean>
  }
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

/**
 * Тип для карточки планировки квартиры с различиями
 * Основан на структуре данных с сервера для сравнения квартир
 */
export interface IFlatLayoutCardFullWithDifferences {
  id: number
  image: string
  title: string
  address: string
  // Основные характеристики квартиры
  apartmentInfo: {
    price: string
    area: string
    livingSpace: string
    kitchenSpace: string
    roomCount: string
    floor: string
    floorsTotal: string
    ceilingHeight: string
    apartmentType: string
    bathroomUnit: string
    buildingSection: string
    builtYear: string
    readyQuarter: string
  }
  // Информация о комплексе
  complex: {
    name: string
    // code: string
    address: string
  }
  // Дополнительная информация
  extra: {
    apartmentNumber: string
    images: {
      plan: string
      floorPlan: string
    }
    geo: {
      latitude: number | null
      longitude: number | null
    }
  }
  // Флаги различий для каждого поля
  differences: {
    apartmentInfo: {
      price: boolean
      area: boolean
      livingSpace: boolean
      kitchenSpace: boolean
      roomCount: boolean
      floor: boolean
      floorsTotal: boolean
      ceilingHeight: boolean
      apartmentType: boolean
      bathroomUnit: boolean
      buildingSection: boolean
      builtYear: boolean
      readyQuarter: boolean
    }
    complex: {
      name: boolean
      code: boolean
      address: boolean
    }
  }
}
