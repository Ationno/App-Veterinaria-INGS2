import { Mascota } from "./Mascota";
import { Usuario } from "./Usuario";

export interface Turno {
    id?: number,
    horario: string,
    motivo: string,
    estado: string,
    fecha: Date,
    usuario_id: number,
    mascota_id: number,
    mascota: Mascota,
    usuario: Usuario,
    nomUsuario: string,
    nomMascota: string,
    dniUser: string
}