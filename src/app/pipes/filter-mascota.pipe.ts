import { Pipe, PipeTransform } from '@angular/core';
import { Mascota } from '../interfaces/Mascota';

@Pipe({
  name: 'filterMascota'
})
export class FilterMascotaPipe implements PipeTransform {

  transform(listaUser: Mascota[], nombre: string = "", raza: string = "", tamano: string = "", sexo: string = ""):  Mascota[] {
		if (listaUser) 
			if (nombre || raza || tamano || sexo)
				return listaUser.filter((ele) => ele.nombre.toLowerCase().includes(nombre.toLowerCase()) && ele.raza.toLowerCase().includes(raza.toLowerCase()) 
        && ele.tamano.toLowerCase().includes(tamano.toLowerCase()) && ele.sexo.toLowerCase().includes(sexo.toLowerCase()))
		return listaUser;
	}

}
