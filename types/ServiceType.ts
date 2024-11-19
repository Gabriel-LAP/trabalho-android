import { hour } from "./HourType"

export type Service = {
    _id?: string
    typeOfService: {
        _id?: string
        name?: string
        price?: number
    }
    customer: {
        _id?: string
        name?: string
    }
    professional: {
        _id?: string
        name?: string
    }
    hour: { 
        _id?: string;
        day?: number[]
        begin?: string
        end?: string
        professional?: {
            _id?: string
            name?: string
        }
        createAt?: Date 
    }
    paymentMethod?: string
    price?: Number
    status?: string
    creationDate?: Date
    completionDate?: Date
}

