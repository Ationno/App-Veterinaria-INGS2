import { Mascota } from "./Mascota";

export interface Usuario {
    id?: number,
    nombre: string,
    apellido: string,
    DNI: string,
    email: string,
    telefono: string,
    password: string,
    admin: boolean,
    mascotas: Mascota[]
}