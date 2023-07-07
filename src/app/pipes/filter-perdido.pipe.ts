import { Pipe, PipeTransform } from '@angular/core';
import { Perdido } from '../interfaces/Perdido';

@Pipe({
	name: 'filterPerdido'
})
export class FilterPerdidoPipe implements PipeTransform {
	transform(listaPerdido: Perdido[], nombre: string = "", encontrado: boolean = false): Perdido[] {
		if (nombre || encontrado) {
			if (!encontrado) 
				return listaPerdido.filter((ele) => ele.nombre.toLowerCase().includes(nombre.toLowerCase()) && ele.encontrado == false)
			return listaPerdido.filter((ele) => ele.nombre.toLowerCase().includes(nombre.toLowerCase()));
		}
		return listaPerdido.filter((ele) => ele.encontrado == false);
	}
}