export interface MilList {
  [key: string]: MilModel
}

export interface MilModel {
  category: {
    id: string
    name: string
  }
  values: any[]
}

export interface SmallWinDatapoint {
  date: string
  count: number
}

export interface DateProperty {
  Date: DateResponseProperty
}

export interface DateResponseProperty {
  date: {
    start: string
  }
}


