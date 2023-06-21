import { Donacion } from "./Donacion";

export interface Campania {
    id: number,
    titulo: string,
    descripcion: string,
    seleccionada: boolean,
    donaciones: Donacion[]
}