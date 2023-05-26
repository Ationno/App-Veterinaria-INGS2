import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
    @Input() usuario!: Usuario;
	@Output() onDeleteUsuario: EventEmitter<Usuario> = new EventEmitter();

	ngOnInit() : void {}

	public onDelete(usuario: Usuario) {
		this.onDeleteUsuario.emit(usuario);
	}
}
