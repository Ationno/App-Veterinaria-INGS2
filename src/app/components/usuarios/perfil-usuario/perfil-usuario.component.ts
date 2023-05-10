import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
    @Input() usuario: Usuario = {id: 0, nombre: "", apellido: "", DNI: "", email: "", telefono: ""};
	@Output() onDeleteUsuario: EventEmitter<Usuario> = new EventEmitter();
	@Output() onEditFormUsuario: EventEmitter<Usuario> = new EventEmitter();

	ngOnInit() : void {}

	public onDelete(usuario: Usuario) {
		console.log("hola")
		this.onDeleteUsuario.emit(usuario);
	}

	public onEdit(usuario: Usuario) {
		this.onEditFormUsuario.emit(usuario);
	}
}
