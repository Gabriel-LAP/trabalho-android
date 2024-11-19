export type hour = {
    _id?: string;
    day: number[]
    begin: string
    end: string
    professional: {
        _id?: string
        name?: string
    }
    createAt?: Date
}

export type hourCreate = {
    _id?: string;
    day: number[]
    begin: string
    end: string
    professional: string
    createAt?: Date
}