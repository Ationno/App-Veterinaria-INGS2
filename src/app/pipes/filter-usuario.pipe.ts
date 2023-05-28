import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interfaces/Usuario';

@Pipe({
	name: 'filterUsuario'
})
export class FilterUsuarioPipe implements PipeTransform {
	transform(listaUser: Usuario[], nombre: string = "", DNI: string = "", email: string = ""):  Usuario[] {
		let nuevaLista = listaUser.filter((ele) => !ele.admin)
		if (nuevaLista) 
			if (nombre || DNI || email)
				return nuevaLista.filter((ele) => ele.nombre.toLowerCase().includes(nombre.toLowerCase()) && ele.DNI.toLowerCase().includes(DNI.toLowerCase()) 
				&& ele.email.toLowerCase().includes(email.toLowerCase()) && !ele.admin)
		return nuevaLista;
	}
}
