import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent {
  usuarios : Usuario[] = [];
	subscription?: Subscription;
	usuario: Usuario = {nombre: "", apellido: "", DNI: "", email: "", telefono: ""};

  constructor(
		private usuariosService: UsuariosService,
	) {}

	ngOnInit() {
		this.usuariosService.get().subscribe((usuarios) => {	
			this.usuarios = usuarios
		})
	}
	
	public toggleFormUsuario() {
		this.usuario = {nombre: "", apellido: "", DNI: "", email: "", telefono: ""};
	}

	public deleteUsuario(usuario: Usuario) {
		this.usuariosService.delete(usuario).subscribe(() => {
			this.usuarios = this.usuarios.filter( ele => ele.id !== usuario.id )
		})
	}

	public editUsuario(usuario: Usuario) {
		this.usuariosService.edit(usuario).subscribe(() => {
			let i: number = this.usuarios.findIndex(ele => ele.id == usuario.id);
			this.usuarios[i] = usuario;
		})
	}

	public addUsuario(usuario: Usuario) {
		this.usuariosService.add(usuario).subscribe((usuario: Usuario) => {
			this.usuarios.push(usuario)
		});
	}

	public editFormUsuario(usuario: Usuario) {
		this.usuario = usuario;
	}
}
