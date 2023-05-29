import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Adopcion } from 'src/app/interfaces/Adopcion';
import { Mascota } from 'src/app/interfaces/Mascota';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { MascotasService } from 'src/app/servicios/mascotas.service';

@Component({
	selector: 'app-adopcion',
	templateUrl: './adopcion.component.html',
	styleUrls: ['./adopcion.component.css']
})
export class AdopcionComponent {
	@Input() adopcion!: Adopcion;
	@Output() onDeleteAdopcion: EventEmitter<Adopcion> = new EventEmitter();
	mascota!: Mascota;
	mainUser!: Usuario;

	constructor(private mascotaService: MascotasService, private authService: AuthService) {}

	ngOnInit() : void {
		this.authService.getMainUsuario().subscribe((usuario) => {
			this.mainUser = usuario;
		});
	}

	public onDelete(adopcion: Adopcion) {
		this.onDeleteAdopcion.emit(adopcion);
	}

	public isCreator(): boolean {
		if (!this.mainUser) return false
		return this.mainUser.id === this.adopcion.usuario_id;
	}
}
