export interface Perdido {
    id: number,
    encontrado: boolean,
    usuario_id: number,
    nombre: string,
    titulo: string,
    descripcion: string,
    email: string,
    imagen: {
        nombre: string,
        tipo: string,
        base64?: Uint8Array
    }
}