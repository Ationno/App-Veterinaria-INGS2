import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interfaces/Usuario';

@Pipe({
	name: 'filterUsuario'
})
export class FilterUsuarioPipe implements PipeTransform {
	transform(listaUser: Usuario[], apellido: string = "", DNI: string = "", email: string = ""):  Usuario[] {
		let nuevaLista = listaUser.filter((ele) => !ele.admin)
		if (nuevaLista) 
			if (apellido || DNI || email)
				return nuevaLista.filter((ele) => ele.apellido.toLowerCase().includes(apellido.toLowerCase()) && ele.DNI.toLowerCase().includes(DNI.toLowerCase()) 
				&& ele.email.toLowerCase().includes(email.toLowerCase()) && !ele.admin)
		return nuevaLista;
	}
}
