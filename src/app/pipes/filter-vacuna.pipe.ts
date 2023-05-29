import { Pipe, PipeTransform } from '@angular/core';
import { Vacuna } from '../interfaces/Anuncio copy';

@Pipe({
	name: 'filterVacuna'
})
export class FilterVacunaPipe implements PipeTransform {

	transform(listaVacuna: Vacuna[], nombre: string = "", fecha: any):  Vacuna[] {
		let nuevaLista = listaVacuna.sort((a,b) => { return new Date(a.fecha).getTime() - new Date(b.fecha).getTime()})
		if (!fecha)
			return nuevaLista.filter((ele) => ele.nombre.toLowerCase().includes(nombre.toLowerCase()))
		if (nuevaLista) 
			if (nombre || fecha)
				return nuevaLista.filter((ele) => ele.nombre.toLowerCase().includes(nombre.toLowerCase()) && new Date(ele.fecha).getTime() - new Date(fecha).getTime() == 0)
		return nuevaLista;
	}

}
