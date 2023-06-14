import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Campania } from 'src/app/interfaces/Campania';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { CampaniasService } from 'src/app/servicios/campanias.service';

@Component({
  selector: 'app-perfil-campania',
  templateUrl: './perfil-campania.component.html',
  styleUrls: ['./perfil-campania.component.css']
})
export class PerfilCampaniaComponent {
	isLogged: boolean = false;
	isAdmin: boolean = false;
    @Input() campania!: Campania;
	@Output() onDeleteCampania: EventEmitter<Campania> = new EventEmitter();

	constructor(public tokenService: TokenService, private router: Router, private authService: AuthService, private campaniaService: CampaniasService) {
		this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
	}

	public onDelete(campania: Campania) {
		this.onDeleteCampania.emit(campania);
	}
}