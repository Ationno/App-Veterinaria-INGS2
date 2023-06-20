import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Campania } from 'src/app/interfaces/Campania';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/interfaces/Usuario';
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
	@Output() onSelectCampania: EventEmitter<Campania> = new EventEmitter();
	mainUser!: Usuario;

	constructor(public tokenService: TokenService, private router: Router, private authService: AuthService, private campaniaService: CampaniasService) {
		this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
	}

	ngOnInit(): void {
		this.authService.getMainUsuario().subscribe((usuario) => {
			this.mainUser = usuario;
		});
	}

	public onDelete(campania: Campania) {
		this.onDeleteCampania.emit(campania);
	}

	public onSelect(campania: Campania) {
		this.onSelectCampania.emit(campania);
	}
}