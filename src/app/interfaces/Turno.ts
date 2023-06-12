export interface Turno {
    id?: number,
    horario: string,
    motivo: string,
    estado: string,
    fecha: Date,
    usuario_id: number,
    mascota_id: number
}