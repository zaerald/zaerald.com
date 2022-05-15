const pad = (n: number) => `${n}`.padStart(2, '0')

export const formatDate = (date: Date): string => `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`

