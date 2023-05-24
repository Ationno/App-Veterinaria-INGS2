import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/Mascota';
import { MascotasService } from 'src/app/servicios/mascotas.service';

@Component({
	selector: 'app-mascotas',
	templateUrl: './mascotas.component.html',
	styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent {
	mascotas : Mascota[] = [];
	subscription?: Subscription;
	mascota!: Mascota;
	sub: any;
	usuarioId!: number;

	constructor(
		private mascotasService: MascotasService,
		private route: ActivatedRoute,
		public router: Router
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.usuarioId = params['id'];
			this.mascotasService.getByUsuarioId(this.usuarioId).subscribe((mascotas) => {	
				this.mascotas = mascotas
			})
		});
	}

	public deleteMascota(mascota: Mascota) {
		this.mascotasService.delete(mascota).subscribe(() => {
			this.mascotas = this.mascotas.filter( ele => ele.id !== mascota.id )
		})
	}
}
