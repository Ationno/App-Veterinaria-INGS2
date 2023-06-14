import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/Mascota';
import { MascotasService } from 'src/app/servicios/mascotas.service';

@Component({
	selector: 'app-borrar-mascota',
	templateUrl: './borrar-mascota.component.html',
	styleUrls: ['./borrar-mascota.component.css']
})
export class BorrarMascotaComponent {
	sub: any;
	edit: boolean = false;
	mascotaId!: number;
	mascota!: Mascota;

	constructor(
		private mascotasService: MascotasService,
		private route: ActivatedRoute,
		public router: Router
	) {
		this.sub = this.route.params.subscribe(params => {
			this.mascotaId = params['mascotaId'];
			this.mascotasService.getById(this.mascotaId).subscribe((mascota) => {
				this.mascota = mascota;
				this.mascota.turnos.forEach(turno => { turno.fecha = new Date(turno.fecha) })
			})
		});
	}

	public onDelete(mascota: Mascota) {
		this.mascotasService.delete(mascota).subscribe(() => {
			alert("Mascota eliminada exitosamente")
			this.router.navigate(['/mascotas', this.mascota.usuario_id]);
		})
	}
}

