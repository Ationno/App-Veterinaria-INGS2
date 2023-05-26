import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interfaces/Usuario';

@Pipe({
	name: 'filterUsuario'
})
export class FilterUsuarioPipe implements PipeTransform {
	transform(listaUser: Usuario[], nombre: string = "", DNI: string = "", email: string = ""):  Usuario[] {
		if (listaUser) 
			if (nombre || DNI || email)
				return listaUser.filter((ele) => ele.nombre.toLowerCase().includes(nombre.toLowerCase()) && ele.DNI.toLowerCase().includes(DNI.toLowerCase()) 
				&& ele.email.toLowerCase().includes(email.toLowerCase()))
		return listaUser;
	}
}
