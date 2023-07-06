import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { CampaniasService } from 'src/app/servicios/campanias.service';
import { Veterinaria } from 'src/app/interfaces/Veterinaria';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-veterinaria',
	templateUrl: './veterinaria.component.html',
	styleUrls: ['./veterinaria.component.css']
})

export class VeterinariaComponent {
	isLogged: boolean = false;
	isAdmin: boolean = false;
	@Input() veterinaria!: Veterinaria;
	@Output() onDeleteVeterinaria: EventEmitter<Veterinaria> = new EventEmitter();
	mainUser!: Usuario;
	direccion: string = "";

	constructor(public tokenService: TokenService, private router: Router, private authService: AuthService, private httpClient: HttpClient) {
		this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
	}

	ngOnInit(): void {
		this.authService.getMainUsuario().subscribe((usuario) => {
			this.mainUser = usuario;
		});
		this.httpClient.get<any>(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.veterinaria.coordenadaX}&lon=${this.veterinaria.coordenadaY}`).subscribe((data) => {
			this.direccion = `${data.address.road} n°: ${data.address.house_number} ${data.address.city}, ${data.address.state}, ${data.address.country}`;
		})
	}

	public onDelete(veterinaria: Veterinaria) {
		this.onDeleteVeterinaria.emit(veterinaria);
	}

}