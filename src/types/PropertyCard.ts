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
