import { Component } from '@angular/core';
import { Campania } from 'src/app/interfaces/Campania';
import { CampaniasService } from 'src/app/servicios/campanias.service';

@Component({
	selector: 'app-campania-actual',
	templateUrl: './campania-actual.component.html',
	styleUrls: ['./campania-actual.component.css']
})
export class CampaniaActualComponent {
	campania!: Campania;
	
	constructor(private campaniaService: CampaniasService) { 
		this.campaniaService.getCampaniaSeleccionada().subscribe((campania) => {
			this.campania = campania;
		});
	}
}
