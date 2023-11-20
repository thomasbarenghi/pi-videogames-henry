export interface FilterItem {
  id: string
  name: string
}

export interface FilterSelect {
  title: string
  values: FilterItem[]
  active: string
}
