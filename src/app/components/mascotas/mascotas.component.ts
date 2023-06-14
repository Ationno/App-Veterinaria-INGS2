import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/Mascota';
import { Usuario } from 'src/app/interfaces/Usuario';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
	selector: 'app-mascotas',
	templateUrl: './mascotas.component.html',
	styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent {
	mascotas : Mascota[] = [];
	usuario!: Usuario;
	subscription?: Subscription;
	mascota!: Mascota;
	sub: any;
	usuarioId!: number;
	busquedaNombre!: string; 
	busquedaRaza!: string;
	busquedaTamano!: string;
	busquedaSexo!: string;

	constructor(
		private mascotasService: MascotasService,
		private usuarioService: UsuariosService,
		private route: ActivatedRoute,
		public router: Router
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.usuarioId = params['id'];
			this.usuarioService.getById(this.usuarioId).subscribe((usuario) => {
				this.usuario = usuario;
			})
			this.mascotasService.getByUsuarioId(this.usuarioId).subscribe((mascotas) => {	
				this.mascotas = mascotas
			})
		});
	}
}
