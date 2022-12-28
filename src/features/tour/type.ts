export interface AutoCompleteType {
    value: string
    label: string
}

export interface ListIdType {
    id: string
    thumbnail?: string
}

export interface TourDetailType {
    day: string,
    listId: ListIdType[]
}