export interface AutoCompleteType {
    value: string
    label: string
}

export interface ListIdType {
    id: string
    thumbnail?: string
}

export interface TourTimeLineScheduleType {
    _id: string,
    location: string,
    door_price: number,
    description: string,
    time_start: string,
    time_end: string,
    thumbnail: string
}

export interface TourTimeLineType {
    _id?: string
    day:string
    schedule: TourTimeLineScheduleType[]
    tour_id?: string
    __v?: string
}

export interface TourDetailType {
    day: string,
    listId: ListIdType[]
}