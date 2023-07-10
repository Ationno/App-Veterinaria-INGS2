import { Mascota } from "./Mascota"

export interface Cruza {
    id: number,
    fechaCelo: Date,
    mascota_id: number,
    usuario_id: number,
    mascota: Mascota,
}