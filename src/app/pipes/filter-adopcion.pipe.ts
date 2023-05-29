import { Pipe, PipeTransform } from '@angular/core';
import { Adopcion } from '../interfaces/Adopcion';
import { MascotasService } from '../servicios/mascotas.service';

@Pipe({
	name: 'filterAdopcion'
})
export class FilterAdopcionPipe implements PipeTransform {

	constructor(private mascotaService: MascotasService) {}

	transform(listaUser: Adopcion[], nombre: string = "", raza: string = "", tamano: string = "", sexo: string = ""):  Adopcion[] {
		if (listaUser) 
			if (nombre || raza || tamano || sexo)
				return listaUser.filter((ele) => {
					if (!ele.mascota) return false
					return ele.mascota.nombre.toLowerCase().includes(nombre.toLowerCase())
						&& ele.mascota.raza.toLowerCase().includes(raza.toLowerCase())
						&& ele.mascota.tamano.toLowerCase().includes(tamano.toLowerCase())
						&& ele.mascota.sexo.toLowerCase().includes(sexo.toLowerCase())
				})
		return listaUser;
	}

}
