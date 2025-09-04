export interface IMeta {
  copyright: string
  request: {
    identifier: string
    method: string
    path: string
    attributes: string[]
    timestamp: string
  }
}
