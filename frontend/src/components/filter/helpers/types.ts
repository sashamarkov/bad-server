export interface FieldOption {
    title: string
    value: string | number
}

export type FilterValue = string | number | FieldOption

export type FilterResult = Record<string, FilterValue>