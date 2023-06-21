import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../interfaces/Turno';

@Pipe({
	name: 'filterTurnoEstado'
})
export class FilterTurnoEstadoPipe implements PipeTransform {

	transform(turnos: Turno[], ...estados: string[]): Turno[] {
		return turnos.filter((turno) => {
			for (let estado of estados)
				if (turno.estado == estado)
					return true;
			return false;
		});
	}

}
