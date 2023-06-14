import { Adopcion } from "./Adopcion";
import { Turno } from "./Turno";

export interface Mascota {
    id?: number,
    nombre: string,
    fechaN: Date,
    raza: string,
    color: string,
    tamano: string,
    sexo: string,
    usuario_id: number,
    anonima: boolean,
    adopcion: Adopcion,
    turnos: Turno[]
}