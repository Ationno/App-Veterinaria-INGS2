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
	usuario!: Usuario;
	busquedaApellido!: string; 
	busquedaDNI!: string;
	busquedaEmail!: string;

  constructor(
		private usuariosService: UsuariosService,
	) {}

	ngOnInit() {
		this.usuariosService.get().subscribe((usuarios) => {	
			this.usuarios = usuarios
		})
	}

	public deleteUsuario(usuario: Usuario) {
		this.usuariosService.delete(usuario).subscribe(() => {
			this.usuarios = this.usuarios.filter( ele => ele.id !== usuario.id )
			alert("Usuario eliminado")
		})
	}
}
