import { Component } from '@angular/core';
import { Adopcion } from 'src/app/interfaces/Adopcion';
import { AdopcionesService } from 'src/app/servicios/adopciones.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
	selector: 'app-adopciones',
	templateUrl: './adopciones.component.html',
	styleUrls: ['./adopciones.component.css']
})
export class AdopcionesComponent {
	adopciones : Adopcion[] = [];
	usuarioId!: number;
	busquedaNombre!: string; 
	busquedaRaza!: string;
	busquedaTamano!: string;
	busquedaSexo!: string;
	isLogged!: boolean;

	constructor(
		private adopcionService: AdopcionesService,
		private tokenService: TokenService,
		private authService: AuthService,
	) {}

	ngOnInit() {
		this.isLogged = this.tokenService.isLogged()
		this.authService.getMainUsuario().subscribe((usuario) => {
			this.usuarioId = usuario.id
		})
		this.adopcionService.get().subscribe((adopciones) => {	
			this.adopciones = adopciones
		})
	}

	public deleteAdopcion(adopcion: Adopcion) {
		this.adopcionService.delete(adopcion).subscribe(() => {
			this.adopciones = this.adopciones.filter( ele => ele.id !== adopcion.id )
		})
	}
}
