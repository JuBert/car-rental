export type stationType = {
    id: string
    name: string
    bookings: bookingType[]
}

export type bookingType = {
    id: string
    pickupReturnStationId: string
    customerName: string
    startDate: string
    endDate: string
}