export interface MilList {
  [key: string]: MilModel
}

export interface MilModel {
  category: {
    id: string,
    name: string,
  },
  values: any[],
}

