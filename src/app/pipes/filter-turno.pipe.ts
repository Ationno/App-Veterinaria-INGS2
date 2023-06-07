import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../interfaces/Turno';

@Pipe({
    name: 'filterTurno'
})
export class FilterTurnoPipe implements PipeTransform {

    constructor() { }

    transform(listaUser: Turno[], horario: string = "", motivo: string = ""): Turno[] {
        if (listaUser)
            if (horario || motivo)
                return listaUser.filter((ele) =>
                    ele.horario.toLowerCase().includes(horario.toLowerCase())
                    && ele.motivo.toLowerCase().includes(motivo.toLowerCase()))
        return listaUser;
    }

}