import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Mascota } from 'src/app/interfaces/Mascota';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { MascotasService } from 'src/app/servicios/mascotas.service';

@Component({
	selector: 'app-informacion',
	templateUrl: './informacion.component.html',
	styleUrls: ['./informacion.component.css']
})
export class InformacionComponent {
	public usuario!: Usuario;
	mascotas : Mascota[] = [];
	busquedaNombre!: string; 
	busquedaRaza!: string;
	busquedaTamano!: string;
	busquedaSexo!: string;

	constructor(public authService: AuthService, public mascotasService: MascotasService) {
	}

	ngOnInit() {
		this.authService.getMainUsuario().subscribe(usuario => {
			this.usuario = usuario[0];
			this.mascotas = usuario[0].mascotas;
		})
	}

	public deleteMascota(mascota: Mascota) {
		this.mascotasService.delete(mascota).subscribe(() => {
			this.mascotas = this.mascotas.filter( ele => ele.id !== mascota.id )
		})
	}
}
