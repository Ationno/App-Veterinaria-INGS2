import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adopcion } from 'src/app/interfaces/Adopcion';
import { Mascota } from 'src/app/interfaces/Mascota';
import { AdopcionesService } from 'src/app/servicios/adopciones.service';
import { MascotasService } from 'src/app/servicios/mascotas.service';

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

	constructor(
		private adopcionService: AdopcionesService,
		private mascotaService: MascotasService
	) {}

	ngOnInit() {
		this.adopcionService.get().subscribe((adopciones) => {	
			adopciones.forEach((adopcion) => { 
				this.mascotaService.getById(adopcion.mascota_id).subscribe((mascota) => {
					adopcion.mascota = mascota;
				});
			})
			this.adopciones = adopciones
		})
	}

	public deleteAdopcion(adopcion: Adopcion) {
		this.adopcionService.delete(adopcion).subscribe(() => {
			this.adopciones = this.adopciones.filter( ele => ele.id !== adopcion.id )
		})
	}
}
