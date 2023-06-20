import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../interfaces/Turno';

@Pipe({
    name: 'filterTurno'
})
export class FilterTurnoPipe implements PipeTransform {
    transform(turnos: Turno[], horario: string = "", motivo: string = ""): Turno[] {
        if (turnos)
            if (horario || motivo)
                return turnos.filter((ele) =>
                    ele.horario.toLowerCase().includes(horario.toLowerCase())
                    && ele.motivo.toLowerCase().includes(motivo.toLowerCase()))
        return turnos;
    }

}