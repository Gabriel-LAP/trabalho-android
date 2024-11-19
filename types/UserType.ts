export type User = {
    _id?: string
    name: string
    email: string
    cpf: string
    password?: string
    confirmPassword?: string
    phone: number
    address: string
    number: number
    zipCode: number
    city: string
    state: string
    type?: string
}