import { Component } from '@angular/core';
import { Perdido } from 'src/app/interfaces/Perdido';
import { PerdidosService } from 'src/app/servicios/perdidos.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-perros-encontrados',
	templateUrl: './perros-encontrados.component.html',
	styleUrls: ['./perros-encontrados.component.css']
})
export class PerrosEncontradosComponent {
	perdidos: Perdido[] = [];
	subscription?: Subscription;
	perdido!: Perdido;
	busquedaNombre!: string;
	busquedaEncontrado!: boolean;
	isLogged: boolean = false;
	isAdmin: boolean = false;

	constructor(
		private perdidosService: PerdidosService
	) {
	}

	ngOnInit() {
		this.perdidosService.get().subscribe((perdidos) => {
			this.perdidos = perdidos.filter((ele) => ele.encontrado == true)
		})
	}

}