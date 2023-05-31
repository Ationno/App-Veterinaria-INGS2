import { Mascota } from "./Mascota"

export interface Adopcion {
    id: number,
    titulo: string,
    descripcion: string,
    mascota_id: number,
    usuario_id: number,
    mascota: Mascota,
    finalizada: boolean
}