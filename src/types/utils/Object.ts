export interface GenericJsonObject {
    [key: string]: object | null
}

export interface GenericObjectWithStrings {
    [key: string]: string
}

export interface GenericObjectWithStringsAndNumber {
    [key: string]: string | number
}