import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Campania } from 'src/app/interfaces/Campania';
import { CampaniasService } from 'src/app/servicios/campanias.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
	selector: 'app-donaciones',
	templateUrl: './donaciones.component.html',
	styleUrls: ['./donaciones.component.css']
})
export class DonacionesComponent {
	isLogged: boolean = false;
	isAdmin: boolean = false;
	campania!: Campania;
	
	constructor( public tokenService: TokenService, private router: Router, private campaniasService: CampaniasService
	){
		this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
	}

	ngOnInit() {
		this.campaniasService.getCampaniaSeleccionada().subscribe((campanias) => {
			this.campania = campanias[0]
		})
	}
}
