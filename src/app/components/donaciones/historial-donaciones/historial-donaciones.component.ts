import { Component } from '@angular/core';
import { Campania } from 'src/app/interfaces/Campania';
import { Donacion } from 'src/app/interfaces/Donacion';
import { CampaniasService } from 'src/app/servicios/campanias.service';
import { DonacionesService } from 'src/app/servicios/donaciones.service';

@Component({
  selector: 'app-historial-donaciones',
  templateUrl: './historial-donaciones.component.html',
  styleUrls: ['./historial-donaciones.component.css']
})
export class HistorialDonacionesComponent {

	sub: any;
	edit: boolean = false;
	usuarioId!: number;
	donacionesAnonimas!: Donacion[];
	campanias!: Campania[];

	constructor(
		private donacionService: DonacionesService,
		private campaniaService: CampaniasService
	) {
		this.donacionService.get().subscribe((donaciones) => {
			this.donacionesAnonimas = donaciones.filter(donacion => donacion.campania_id === 0);
		});
		this.campaniaService.get().subscribe((campanias) => {
			this.campanias = campanias;
		});
	}

	public montoRecaudado(donaciones: Donacion[]) {
		if (donaciones)
			return donaciones.reduce((partialSum, a) => partialSum + a.monto, 0)
		return 0;
	}
}
