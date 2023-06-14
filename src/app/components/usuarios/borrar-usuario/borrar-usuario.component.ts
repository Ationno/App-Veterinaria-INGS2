import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
	selector: 'app-borrar-usuario',
	templateUrl: './borrar-usuario.component.html',
	styleUrls: ['./borrar-usuario.component.css']
})
export class BorrarUsuarioComponent {
	sub: any;
	edit: boolean = false;
	usuarioId!: number;
	usuario!: Usuario;

	constructor(
		private usuarioService: UsuariosService,
		private route: ActivatedRoute,
		public router: Router
	) {
		this.sub = this.route.params.subscribe(params => {
			this.usuarioId = params['usuarioId'];
			this.usuarioService.getById(this.usuarioId).subscribe((usuario) => {
				this.usuario = usuario;
				this.usuario.mascotas.forEach(mascota => { mascota.turnos.forEach(turno => { turno.fecha = new Date(turno.fecha) }) })
			})
		});
	}

	public onDelete(usuario: Usuario) {
		this.usuarioService.delete(usuario).subscribe(() => {
			alert("Usuario eliminada exitosamente")
			this.router.navigate(['/usuarios']);
		})
	}
}
