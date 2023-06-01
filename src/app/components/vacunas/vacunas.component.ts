import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vacuna } from 'src/app/interfaces/Vacuna';
import { Mascota } from 'src/app/interfaces/Mascota';
import { VacunasService } from 'src/app/servicios/vacunas.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
	selector: 'app-vacunas',
	templateUrl: './vacunas.component.html',
	styleUrls: ['./vacunas.component.css']
})
export class VacunasComponent {
	vacunas : Vacuna[] = [];
	sub: any;
	mascotaId!: number;
	busquedaNombre!: string; 
	busquedaFecha!: Date;

	constructor(
		private vacunaService: VacunasService,
		private route: ActivatedRoute,
		public router: Router,
		public tokenService: TokenService
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.mascotaId = params['id'];
			this.vacunaService.getByMascotaId(this.mascotaId).subscribe((vacunas) => {	
				this.vacunas = vacunas
			})
		});
	}

	public deleteVacuna(vacuna: Vacuna) {
		this.vacunaService.delete(vacuna).subscribe(() => {
			alert("Vacuna eliminada exitosamente")
			this.vacunas = this.vacunas.filter( ele => ele.id !== vacuna.id )
		})
	}
}
