import { UtilTag } from "./global.types"

export interface IContactStore {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string
    tag: UtilTag
}

export interface InitialStore {
    loading: boolean,
    error: string
    contacts: IContactStore[]
}