import {type IconType} from "../../icons.tsx";
export interface Contact {
    id: number,
    name: string,
    url: string
    logo: IconType | string
}